import Link from 'next/link';
import type { ReactNode } from 'react';

function renderParagraphWithLinks(paragraph: string): ReactNode {
  const regex = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = regex.exec(paragraph);

  while (match) {
    const [fullMatch, text, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, start));
    }

    nodes.push(
      <Link
        key={`${href}-${start}`}
        href={href}
        className="font-medium text-primary-600 underline decoration-primary-300/70 underline-offset-2 transition hover:text-primary-700 hover:decoration-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
      >
        {text}
      </Link>
    );

    lastIndex = start + fullMatch.length;
    match = regex.exec(paragraph);
  }

  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex));
  }

  return nodes;
}

function renderRichBlock(text: string): ReactNode {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
  const allBullets = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l));
  if (allBullets) {
    return (
      <ul className="not-prose my-6 space-y-3 border-l-2 border-primary-200/80 py-1 pl-5 dark:border-primary-500/40">
        {lines.map((line, i) => (
          <li key={i} className="relative pl-2 text-[17px] leading-relaxed text-gray-700 dark:text-gray-200">
            <span className="absolute -left-1 top-[0.55em] h-2 w-2 -translate-x-1 rounded-full bg-gradient-to-br from-primary-500 to-purple-500" aria-hidden />
            <span>{renderParagraphWithLinks(line.replace(/^[-*]\s+/, ''))}</span>
          </li>
        ))}
      </ul>
    );
  }

  const allOrdered =
    lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l));
  if (allOrdered) {
    return (
      <ol className="not-prose my-6 list-none space-y-3 pl-0">
        {lines.map((line, i) => {
          const body = line.replace(/^\d+\.\s+/, '');
          return (
            <li
              key={i}
              className="relative flex gap-4 text-[17px] leading-relaxed text-gray-700 dark:text-gray-200"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{renderParagraphWithLinks(body)}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <p className="text-[17px] leading-[1.75] text-gray-700 dark:text-gray-200">
      {renderParagraphWithLinks(trimmed)}
    </p>
  );
}

const heading2Class =
  'not-prose scroll-mt-24 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl';
const heading3Class =
  'not-prose scroll-mt-24 text-xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-2xl';

function renderBlogBlocks(content: string, blogSlug: string) {
  const blocks = content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split('\n');
    const first = lines[0]?.trim() ?? '';

    if (first.startsWith('## ') && !first.startsWith('###')) {
      const title = first.replace(/^##\s+/, '').trim();
      const rest = lines.slice(1).join('\n').trim();
      const subParts = rest ? rest.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];
      return (
        <div key={`${blogSlug}-block-${index}`} className="space-y-5">
          <h2 className={heading2Class}>{title}</h2>
          <div className="space-y-4">{subParts.map((part, j) => <div key={j}>{renderRichBlock(part)}</div>)}</div>
        </div>
      );
    }

    if (first.startsWith('### ')) {
      const title = first.replace(/^###\s+/, '').trim();
      const rest = lines.slice(1).join('\n').trim();
      const subParts = rest ? rest.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];
      return (
        <div key={`${blogSlug}-block-${index}`} className="space-y-4">
          <h3 className={heading3Class}>{title}</h3>
          <div className="space-y-4">{subParts.map((part, j) => <div key={j}>{renderRichBlock(part)}</div>)}</div>
        </div>
      );
    }

    return <div key={`${blogSlug}-block-${index}`}>{renderRichBlock(block)}</div>;
  });
}

function firstBlockOpensWithPlainParagraph(content: string): boolean {
  const firstBlock = content.trim().split(/\n\n+/)[0]?.trim() ?? '';
  if (!firstBlock) return false;
  const firstLine = firstBlock.split('\n')[0]?.trim() ?? '';
  return !firstLine.startsWith('##');
}

type Props = {
  content: string;
  blogSlug: string;
  /** First paragraph block gets a highlighted lead card when it is not a heading. */
  emphasizeLead?: boolean;
};

const proseShell =
  'prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-gray-900 prose-h3:text-gray-900 dark:prose-h2:text-white dark:prose-h3:text-white prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-a:no-underline';

export function BlogArticleBody({ content, blogSlug, emphasizeLead = true }: Props) {
  const blocks = renderBlogBlocks(content, blogSlug);
  const showLeadCard =
    emphasizeLead && blocks.length > 0 && firstBlockOpensWithPlainParagraph(content);

  if (!showLeadCard) {
    return <div className={proseShell}>{blocks}</div>;
  }

  const [first, ...rest] = blocks;
  return (
    <div className={proseShell}>
      <div className="not-prose mb-10 rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 via-white to-white p-6 shadow-sm dark:border-indigo-500/25 dark:from-indigo-950/50 dark:via-slate-900/80 dark:to-slate-900 md:p-8">
        <div className="text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-100 md:text-xl md:leading-relaxed [&_p]:m-0">
          {first}
        </div>
      </div>
      {rest}
    </div>
  );
}
