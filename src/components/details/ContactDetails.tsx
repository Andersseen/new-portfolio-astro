import { useRef, useState } from "preact/hooks";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-preact";
import { getLanguageFromPath } from "@i18n/config";
import { t } from "@i18n/utils";
import Input from "../ui/Input";
import Button from "../ui/Button";

const lang =
  typeof window !== "undefined"
    ? getLanguageFromPath(window.location.pathname)
    : "en";
const tr = (key: string) => t(lang, key);

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const errorAlertRef = useRef<HTMLDivElement>(null);
  const successAlertRef = useRef<HTMLDivElement>(null);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = tr("portfolio.contact.validation.nameRequired");
    } else if (name.length > 100) {
      next.name = tr("portfolio.contact.validation.nameTooLong");
    }

    if (!email.trim()) {
      next.email = tr("portfolio.contact.validation.emailInvalid");
    } else if (email.length > 254) {
      next.email = tr("portfolio.contact.validation.emailTooLong");
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = tr("portfolio.contact.validation.emailInvalid");
    }

    if (!message.trim()) {
      next.message = tr("portfolio.contact.validation.messageRequired");
    } else if (message.length > 5000) {
      next.message = tr("portfolio.contact.validation.messageTooLong");
    }

    return next;
  };

  const focusFirstError = (next: FieldErrors) => {
    if (next.name) {
      document.getElementById("contact-name")?.focus();
    } else if (next.email) {
      document.getElementById("contact-email")?.focus();
    } else if (next.message) {
      document.getElementById("contact-message")?.focus();
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Honeypot: silently reject spam bots
    if (honeypot.trim()) {
      setStatus("idle");
      setErrors({});
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => successAlertRef.current?.focus(), 0);
      } else {
        setStatus("error");
        setTimeout(() => errorAlertRef.current?.focus(), 0);
      }
    } catch {
      setStatus("error");
      setTimeout(() => errorAlertRef.current?.focus(), 0);
    }
  };

  const inputClasses = (hasError: boolean) =>
    [
      "w-full px-4 py-2 rounded-lg bg-background-secondary border-2",
      hasError
        ? "border-danger focus:border-danger"
        : "border-border focus:border-primary-500",
      "text-foreground placeholder:text-foreground-tertiary",
      "transition-colors duration-200 focus:outline-none focus:ring-2",
      hasError ? "focus:ring-danger/20" : "focus:ring-primary-500/20",
    ].join(" ");

  if (status === "success") {
    return (
      <div
        ref={successAlertRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        data-testid="contact-success"
        and-layout="vertical align:center gap:md"
        className="py-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-success mx-auto" />
        <h3 className="text-xl font-bold text-foreground">
          {tr("portfolio.contact.successTitle")}
        </h3>
        <p className="text-foreground-secondary max-w-md">
          {tr("portfolio.contact.successMessage")}
        </p>
        <Button type="button" onClick={() => setStatus("idle")} variant="outline">
          {tr("portfolio.contact.actionLabel")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate data-testid="contact-form">
      {status === "error" && (
        <div
          ref={errorAlertRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          data-testid="contact-error"
          and-layout="horizontal align:start gap:sm"
          className="p-4 rounded-lg bg-danger/10 border border-danger text-foreground"
        >
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{tr("portfolio.contact.errorTitle")}</p>
            <p className="text-sm text-foreground-secondary">
              {tr("portfolio.contact.errorMessage")}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          {tr("portfolio.contact.nameLabel")}
        </label>
        <Input
          id="contact-name"
          type="text"
          name="name"
          value={name}
          onChange={setName}
          placeholder={tr("portfolio.contact.namePlaceholder")}
          fullWidth
          error={Boolean(errors.name)}
          disabled={status === "submitting"}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-sm text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          {tr("portfolio.contact.emailLabel")}
        </label>
        <Input
          id="contact-email"
          type="email"
          name="email"
          value={email}
          onChange={setEmail}
          placeholder={tr("portfolio.contact.emailPlaceholder")}
          fullWidth
          error={Boolean(errors.email)}
          disabled={status === "submitting"}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-sm text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {tr("portfolio.contact.messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onInput={(e: any) => setMessage(e.currentTarget.value)}
          placeholder={tr("portfolio.contact.messagePlaceholder")}
          rows={5}
          disabled={status === "submitting"}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClasses(Boolean(errors.message))}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field — hidden from users and screen readers */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          value={honeypot}
          onInput={(e: any) => setHoneypot(e.currentTarget.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        fullWidth
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {tr("portfolio.contact.sending")}
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {tr("portfolio.contact.submit")}
          </>
        )}
      </Button>
    </form>
  );
}
