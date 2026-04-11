'use client';

import type { ReactNode } from 'react';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  evaluateScientificExpression,
  formatScientificNumber,
  type AngleMode,
} from '@/lib/scientificEvaluate';

const DEBOUNCE_MS = 220;
const HISTORY_PANEL_MQ = '(max-width: 1023px)';
const CALC_HISTORY_STORAGE_KEY = 'calc-history';

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false;
  const o = value as Record<string, unknown>;
  return typeof o.expression === 'string' && typeof o.result === 'string';
}

function parseHistoryFromStorage(raw: string): HistoryEntry[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isHistoryEntry).slice(0, 10);
}

function escapeCsvField(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function subscribeMobileMq(onChange: () => void) {
  const mq = window.matchMedia(HISTORY_PANEL_MQ);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getMobileMqSnapshot() {
  return window.matchMedia(HISTORY_PANEL_MQ).matches;
}

function getMobileMqServerSnapshot() {
  return false;
}

export type HistoryEntry = {
  expression: string;
  result: string;
};

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const PadButton = memo(function PadButton({
  label,
  onPress,
  className,
  ariaLabel,
}: {
  label: ReactNode;
  onPress: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      onClick={onPress}
      className={cn(
        'flex h-11 sm:h-12 items-center justify-center rounded-2xl text-sm font-semibold shadow-md transition active:scale-[0.97]',
        'bg-slate-700/90 text-slate-100 hover:bg-slate-600/95',
        'dark:bg-slate-800/95 dark:text-slate-50 dark:hover:bg-slate-700',
        'border border-slate-600/40 dark:border-slate-600/50',
        className
      )}
    >
      {label}
    </button>
  );
});

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [inv, setInv] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [ans, setAns] = useState<number | null>(null);
  const [overrideResult, setOverrideResult] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const showHistoryRef = useRef(showHistory);
  showHistoryRef.current = showHistory;
  const isMobileHistory = useSyncExternalStore(
    subscribeMobileMq,
    getMobileMqSnapshot,
    getMobileMqServerSnapshot
  );

  const debouncedExpression = useDebouncedValue(expression, DEBOUNCE_MS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CALC_HISTORY_STORAGE_KEY);
      if (saved) setHistory(parseHistoryFromStorage(saved));
    } catch {
      /* ignore corrupt storage */
    }
    setHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (!historyLoaded) return;
    try {
      localStorage.setItem(CALC_HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      /* quota / private mode */
    }
  }, [history, historyLoaded]);

  const append = useCallback((token: string) => {
    setExpression((prev) => prev + token);
    setOverrideResult(null);
  }, []);

  const backspace = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
    setOverrideResult(null);
  }, []);

  const clearAll = useCallback(() => {
    setExpression('');
    setOverrideResult(null);
  }, []);

  const previewText = useMemo(() => {
    if (expression.trim() === '' && overrideResult !== null) {
      return formatScientificNumber(overrideResult);
    }
    if (debouncedExpression.trim() === '') return '';
    const v = evaluateScientificExpression(debouncedExpression, angleMode, ans);
    if (v === 'INVALID') return 'Invalid expression';
    return formatScientificNumber(v);
  }, [debouncedExpression, angleMode, ans, expression, overrideResult]);

  const canCopyResult = Boolean(
    previewText && previewText !== 'Invalid expression'
  );

  const copyResult = useCallback(async () => {
    if (!canCopyResult) return;
    try {
      await navigator.clipboard.writeText(previewText);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Could not copy');
    }
  }, [canCopyResult, previewText]);

  const exportJSON = useCallback(() => {
    if (history.length === 0) return;
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: 'application/json',
    });
    downloadBlob(blob, 'calculator-history.json');
  }, [history]);

  const exportCSV = useCallback(() => {
    if (history.length === 0) return;
    const rows = history.map(
      (item) => `${escapeCsvField(item.expression)},${escapeCsvField(item.result)}`
    );
    const csv = `Expression,Result\n${rows.join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    downloadBlob(blob, 'calculator-history.csv');
  }, [history]);

  const runEquals = useCallback(() => {
    const v = evaluateScientificExpression(expression, angleMode, ans);
    if (v === 'INVALID') {
      setOverrideResult(null);
      return;
    }
    const resultStr = formatScientificNumber(v);
    setHistory((prev) => [{ expression, result: resultStr }, ...prev.slice(0, 9)]);
    setAns(v);
    setOverrideResult(v);
    setExpression('');
  }, [expression, angleMode, ans]);

  const onTrig = useCallback(
    (fn: 'sin' | 'cos' | 'tan') => {
      const name = inv ? `a${fn}` : fn;
      append(`${name}(`);
    },
    [append, inv]
  );

  const memoryRecall = useCallback(() => {
    append(formatScientificNumber(memory));
  }, [append, memory]);

  const memoryClear = useCallback(() => setMemory(0), []);

  const memoryAdd = useCallback(() => {
    let n: number | 'INVALID';
    if (expression.trim() !== '') {
      n = evaluateScientificExpression(expression, angleMode, ans);
    } else if (overrideResult !== null) {
      n = overrideResult;
    } else if (ans !== null) {
      n = ans;
    } else {
      return;
    }
    if (n === 'INVALID') return;
    setMemory((m) => m + n);
  }, [expression, angleMode, ans, overrideResult]);

  const memorySubtract = useCallback(() => {
    let n: number | 'INVALID';
    if (expression.trim() !== '') {
      n = evaluateScientificExpression(expression, angleMode, ans);
    } else if (overrideResult !== null) {
      n = overrideResult;
    } else if (ans !== null) {
      n = ans;
    } else {
      return;
    }
    if (n === 'INVALID') return;
    setMemory((m) => m - n);
  }, [expression, angleMode, ans, overrideResult]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!rootRef.current) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }

      const k = e.key;
      if (k >= '0' && k <= '9') {
        e.preventDefault();
        append(k);
        return;
      }
      if (k === '.' || k === ',') {
        e.preventDefault();
        append('.');
        return;
      }
      if (k === '+' || k === '-' || k === '*' || k === '/') {
        e.preventDefault();
        append(k);
        return;
      }
      if (k === '(' || k === ')') {
        e.preventDefault();
        append(k);
        return;
      }
      if (k === 'Enter' || k === '=') {
        e.preventDefault();
        runEquals();
        return;
      }
      if (k === 'Backspace') {
        e.preventDefault();
        backspace();
        return;
      }
      if (k === 'Escape') {
        e.preventDefault();
        if (showHistoryRef.current) {
          setShowHistory(false);
        } else {
          clearAll();
        }
        return;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [append, backspace, clearAll, runEquals]);

  const loadHistoryItem = useCallback((item: HistoryEntry) => {
    setExpression(item.expression);
    setOverrideResult(null);
    if (isMobileHistory) setShowHistory(false);
  }, [isMobileHistory]);

  const clearHistory = useCallback(() => setHistory([]), []);

  const modeBtn = (active: boolean) =>
    cn(
      active &&
        'ring-2 ring-indigo-400 bg-indigo-600/90 hover:bg-indigo-500 text-white border-indigo-400/50'
    );

  const historyPanelTransition = { type: 'spring' as const, damping: 28, stiffness: 320 };

  return (
    <div className="relative w-full lg:flex lg:items-stretch lg:gap-4">
      <div
        ref={rootRef}
        className="min-w-0 flex-1 rounded-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)]"
        tabIndex={-1}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Memory</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={memoryClear}
              className="rounded-full border border-slate-600/50 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              MC
            </button>
            <button
              type="button"
              onClick={memoryRecall}
              className="rounded-full border border-slate-600/50 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              MR
            </button>
            <button
              type="button"
              onClick={memoryAdd}
              className="rounded-full border border-slate-600/50 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              M+
            </button>
            <button
              type="button"
              onClick={memorySubtract}
              className="rounded-full border border-slate-600/50 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              M−
            </button>
            <button
              type="button"
              onClick={() => setShowHistory((s) => !s)}
              aria-expanded={showHistory}
              aria-label="Toggle calculation history"
              className={cn(
                'ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-slate-200 transition',
                showHistory
                  ? 'border-indigo-400/60 bg-indigo-600/40'
                  : 'border-slate-600/50 bg-slate-800/80 hover:bg-slate-700'
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4 min-h-[5.5rem] rounded-2xl border border-slate-700/40 bg-slate-950/60 px-4 py-3 shadow-inner">
          <p className="min-h-[1.5rem] break-all text-right font-mono text-sm text-slate-400">
            {expression || '\u00a0'}
          </p>
          <div className="mt-1 flex items-end justify-end gap-2">
            <p
              className={cn(
                'min-w-0 flex-1 break-all text-right font-mono text-3xl font-semibold tracking-tight sm:text-4xl',
                previewText === 'Invalid expression' ? 'text-rose-400' : 'text-white'
              )}
            >
              {previewText || '\u00a0'}
            </p>
            <button
              type="button"
              onClick={() => void copyResult()}
              disabled={!canCopyResult}
              className={cn(
                'shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition',
                canCopyResult
                  ? 'border-indigo-400/50 bg-indigo-600/30 text-indigo-100 hover:bg-indigo-600/45'
                  : 'cursor-not-allowed border-slate-600/40 text-slate-500'
              )}
            >
              Copy
            </button>
          </div>
        </div>

      <div className="grid grid-cols-7 gap-2">
        <PadButton
          label="DEG"
          ariaLabel="Degree mode"
          onPress={() => setAngleMode('DEG')}
          className={modeBtn(angleMode === 'DEG')}
        />
        <PadButton
          label="RAD"
          ariaLabel="Radian mode"
          onPress={() => setAngleMode('RAD')}
          className={modeBtn(angleMode === 'RAD')}
        />
        <PadButton label="x!" onPress={() => append('factorial(')} />
        <PadButton label="(" onPress={() => append('(')} />
        <PadButton label=")" onPress={() => append(')')} />
        <PadButton label="%" onPress={() => append('%')} />
        <PadButton
          label="AC"
          onPress={clearAll}
          className="bg-rose-700/90 hover:bg-rose-600 dark:bg-rose-900/80 dark:hover:bg-rose-800"
        />

        <PadButton
          label="Inv"
          ariaLabel="Inverse trigonometric functions"
          onPress={() => setInv((v) => !v)}
          className={cn(inv && 'ring-2 ring-amber-400/80')}
        />
        <PadButton label="sin" onPress={() => onTrig('sin')} />
        <PadButton label="ln" onPress={() => append('ln(')} />
        <PadButton label="7" onPress={() => append('7')} className="text-lg" />
        <PadButton label="8" onPress={() => append('8')} className="text-lg" />
        <PadButton label="9" onPress={() => append('9')} className="text-lg" />
        <PadButton label="÷" ariaLabel="Divide" onPress={() => append('/')} className="text-lg text-amber-200" />

        <PadButton label="π" onPress={() => append('pi')} />
        <PadButton label="cos" onPress={() => onTrig('cos')} />
        <PadButton label="log" onPress={() => append('log10(')} />
        <PadButton label="4" onPress={() => append('4')} className="text-lg" />
        <PadButton label="5" onPress={() => append('5')} className="text-lg" />
        <PadButton label="6" onPress={() => append('6')} className="text-lg" />
        <PadButton label="×" ariaLabel="Multiply" onPress={() => append('*')} className="text-lg text-amber-200" />

        <PadButton label="e" onPress={() => append('e')} />
        <PadButton label="tan" onPress={() => onTrig('tan')} />
        <PadButton label="√" ariaLabel="Square root" onPress={() => append('sqrt(')} />
        <PadButton label="1" onPress={() => append('1')} className="text-lg" />
        <PadButton label="2" onPress={() => append('2')} className="text-lg" />
        <PadButton label="3" onPress={() => append('3')} className="text-lg" />
        <PadButton label="−" ariaLabel="Subtract" onPress={() => append('-')} className="text-lg text-amber-200" />

        <PadButton label="Ans" onPress={() => append('Ans')} />
        <PadButton
          label="EXP"
          onPress={() => append(expression.trim() === '' ? '10^(' : '*10^(')}
        />
        <PadButton label="xʸ" ariaLabel="Power" onPress={() => append('^(')} />
        <PadButton label="0" onPress={() => append('0')} className="text-lg" />
        <PadButton label="." onPress={() => append('.')} className="text-lg" />
        <PadButton
          label="="
          onPress={runEquals}
          className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-lg text-white"
        />
        <PadButton label="+" onPress={() => append('+')} className="text-lg text-amber-200" />
        </div>
      </div>

      <AnimatePresence>
        {showHistory ? (
          <>
            <motion.button
              key="history-backdrop"
              type="button"
              aria-label="Close history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
              onClick={() => setShowHistory(false)}
            />
            <motion.aside
              key="history-panel"
              role="dialog"
              aria-modal={isMobileHistory}
              aria-label="Calculation history"
              initial={
                isMobileHistory
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, x: 24 }
              }
              animate={
                isMobileHistory
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, x: 0 }
              }
              exit={
                isMobileHistory
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, x: 24 }
              }
              transition={historyPanelTransition}
              className={cn(
                'z-50 flex max-h-[min(28rem,70vh)] w-full flex-col overflow-hidden border shadow-2xl',
                'bg-white/75 backdrop-blur-xl dark:bg-slate-900/75',
                'border-slate-200/80 dark:border-white/10',
                'max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:max-h-[50vh] max-lg:rounded-t-3xl',
                'lg:sticky lg:top-0 lg:mt-0 lg:w-80 lg:shrink-0 lg:rounded-2xl lg:self-start'
              )}
            >
              <div className="shrink-0 space-y-2 border-b border-slate-200/60 px-4 py-3 dark:border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white/90">History</h3>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={clearHistory}
                      disabled={history.length === 0}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium transition',
                        history.length === 0
                          ? 'cursor-not-allowed text-slate-400 dark:text-slate-500'
                          : 'text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15'
                      )}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      aria-label="Close history"
                      onClick={() => setShowHistory(false)}
                      className="rounded-full p-1.5 text-slate-500 hover:bg-slate-200/80 dark:text-slate-400 dark:hover:bg-white/10 lg:hidden"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={exportJSON}
                    disabled={history.length === 0}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition',
                      history.length === 0
                        ? 'cursor-not-allowed text-slate-400 dark:text-slate-500'
                        : 'bg-slate-200/90 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15'
                    )}
                  >
                    Export JSON
                  </button>
                  <button
                    type="button"
                    onClick={exportCSV}
                    disabled={history.length === 0}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition',
                      history.length === 0
                        ? 'cursor-not-allowed text-slate-400 dark:text-slate-500'
                        : 'bg-slate-200/90 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15'
                    )}
                  >
                    Export CSV
                  </button>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
                {history.length === 0 ? (
                  <p className="px-2 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No history yet
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {history.map((item, i) => (
                      <li key={`${item.expression}-${item.result}-${i}`}>
                        <button
                          type="button"
                          onClick={() => loadHistoryItem(item)}
                          className="w-full rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-slate-200/70 dark:hover:bg-white/10"
                        >
                          <span className="block font-mono text-slate-600 dark:text-slate-300">
                            <span className="break-all">{item.expression}</span>
                            <span className="text-slate-800 dark:text-white"> = {item.result}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
