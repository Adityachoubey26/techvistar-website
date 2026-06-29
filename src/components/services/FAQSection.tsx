import { useState } from 'react';
import { Service } from '@/data/services';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const FAQSection = ({ service }: SectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {service.faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-slate-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
