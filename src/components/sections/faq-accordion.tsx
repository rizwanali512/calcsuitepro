"use client";

import { MinusIcon, PlusIcon } from "@/icons/icons";
import Link from "next/link";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Are CalcSuite Pro calculators free to use?",
      answer:
        "Yes. The core calculator library is free to use in your browser. You can open finance, math, physics, and health tools, run formulas, and compare scenarios without paying for basic access.",
    },
    {
      id: 2,
      question: "Do calculators run locally in my browser?",
      answer:
        "Most calculators evaluate inputs directly in your browser for speed and privacy. Your numbers typically stay on your device unless a specific tool clearly states otherwise (for example, a feature that sends data to a server).",
    },
    {
      id: 3,
      question: "How accurate are the results?",
      answer:
        "Each page documents the formula it implements. Accuracy depends on correct inputs, consistent units, and the limits of standard numeric math in the browser. For financial or health decisions, use results as a planning aid alongside professional advice when appropriate.",
    },
    {
      id: 4,
      question: "Which calculator categories do you cover?",
      answer:
        "We organize tools into finance (loans, tax, investment, retirement), math, physics, health, and more. Use category hubs such as Finance Calculators, Math Calculators, and Physics Calculators—or search with the command palette (Cmd+K / Ctrl+K) on supported pages.",
    },
    {
      id: 5,
      question: "Do I need an account to use the calculators?",
      answer:
        "No account is required for standard calculator pages. Open any tool, enter values, and get results immediately. Optional features like accounts or billing, if enabled on your deployment, are separate from everyday calculator use.",
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Common questions about our free online calculators and how CalcSuite Pro fits homework, budgeting, and
            technical checks. Still need help?{" "}
            <Link href="/contact" className="font-medium text-primary-500 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
        <div className="max-w-[600px] mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  isActive,
  onToggle,
}: {
  item: FAQItem;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}
        aria-expanded={isActive}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {item.question}
        </span>
        <span className="flex-shrink-0 ml-6">
          {isActive ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}
