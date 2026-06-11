import { useState } from "react";
import { ChevronDown, MapPin, ListChecks, HelpCircle } from "lucide-react";
import {
  extractDepartment,
  getDepartmentInfo,
  getDepartmentLabel,
  type Lang,
} from "@/lib/department-info";

type Props = {
  text: string;
  lang: Lang;
};

const COPY = {
  en: {
    department: "Department",
    nextSteps: "Recommended next steps",
    faq: "Department FAQ",
  },
  ta: {
    department: "துறை",
    nextSteps: "பரிந்துரைக்கப்பட்ட அடுத்த படிகள்",
    faq: "துறை அடிக்கடி கேட்கப்படும் கேள்விகள்",
  },
} as const;

export function DepartmentCard({ text, lang }: Props) {
  const key = extractDepartment(text);
  if (!key) return null;
  const info = getDepartmentInfo(key, lang);
  if (!info) return null;
  const t = COPY[lang];
  const label = getDepartmentLabel(key);

  return (
    <div className="mt-3 rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 bg-accent/60 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {t.department}
        </span>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>

      <div className="p-4 space-y-4">
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ListChecks className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{t.nextSteps}</h3>
          </div>
          <ul className="space-y-1.5 pl-1">
            {info.nextSteps.map((step, i) => (
              <li key={i} className="text-sm text-foreground/90 flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{t.faq}</h3>
          </div>
          <div className="space-y-1">
            {info.faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 py-2.5 text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-3 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}
