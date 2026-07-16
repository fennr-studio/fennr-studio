"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  placeholder?: string;
  cta?: string;
  variant?: "flat" | "inline";
};

export default function EmailSignupForm({
  placeholder = "Enter your e-mail",
  cta = "Sign Up",
  variant = "flat",
}: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-4 border-b-2 border-ink/80 pb-2 max-w-md"
      >
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-slatey text-base py-1"
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          aria-label={cta}
          className="flex-none w-10 h-10 rounded-full bg-ink text-accent hover:bg-accent hover:text-ink transition-smooth inline-flex items-center justify-center"
        >
          {sent ? (
            <Check className="w-4 h-4" strokeWidth={1.6} />
          ) : (
            <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
          )}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-lg"
    >
      <input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-flat flex-1 min-w-0"
        required
        aria-label="Email address"
      />
      <button type="submit" className="btn-accent flex-none h-[56px] px-7 text-base">
        <span className="font-medium italic">{sent ? "Sent ✓" : cta}</span>
      </button>
    </form>
  );
}
