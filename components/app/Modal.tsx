"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { A } from "@/lib/ui";

export default function Modal({
  open, onClose, title, children, footer, size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 z-[71] flex items-start sm:items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal aria-label={title}>
        <div className={`relative w-full ${width} my-8`} onClick={(e) => e.stopPropagation()}>
          <div className="surface border-grad rounded-3xl overflow-hidden" style={{ backgroundColor: A.bg2 }}>
            <header className="flex items-center justify-between gap-3 px-6 py-4 border-b" style={{ borderColor: A.border, backgroundColor: A.surface }}>
              <h2 className="font-display font-semibold text-base" style={{ color: A.text }}>{title}</h2>
              <button onClick={onClose} aria-label="Cerrar" className="p-1.5 rounded focus-ring" style={{ color: A.text2 }}>
                <X className="w-4 h-4" />
              </button>
            </header>
            <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
            {footer && (
              <footer className="flex items-center justify-end gap-2 px-6 py-4 border-t" style={{ borderColor: A.border, backgroundColor: A.surface }}>
                {footer}
              </footer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function FormField({
  label, children, required, hint,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display font-medium text-xs uppercase tracking-[0.12em] mb-1.5" style={{ color: A.text2 }}>
        {label}{required && <span style={{ color: A.gold }}> *</span>}
      </span>
      {children}
      {hint && <span className="block text-[10px] mt-1" style={{ color: A.textDim }}>{hint}</span>}
    </label>
  );
}

export const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgba(214,180,106,0.55)]";
export const inputStyle = { backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text } as React.CSSProperties;
