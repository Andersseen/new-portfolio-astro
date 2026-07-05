import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const JSON_HEADERS = { "Content-Type": "application/json" };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  // Simple but practical email format check.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

/**
 * Send a contact email from the portfolio contact form.
 *
 * Security notes:
 * - All user input is HTML-escaped before being interpolated into the email HTML.
 * - Basic field length and email format validation is applied.
 * - The endpoint only accepts POST requests.
 * - For production use with a public form, consider adding rate limiting,
 *   a honeypot field and/or a CAPTCHA to reduce spam.
 */
export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return jsonResponse(
      { error: "RESEND_API_KEY is not configured" },
      500,
    );
  }

  const resend = new Resend(apiKey);

  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return jsonResponse({ error: "Invalid field types" }, 400);
    }

    if (name.length < 1 || name.length > 100) {
      return jsonResponse({ error: "Name must be between 1 and 100 characters" }, 400);
    }

    if (email.length > 254 || !isValidEmail(email)) {
      return jsonResponse({ error: "Invalid email address" }, 400);
    }

    if (message.length < 1 || message.length > 5000) {
      return jsonResponse(
        { error: "Message must be between 1 and 5000 characters" },
        400,
      );
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["andriipap01@gmail.com"],
      subject: `New Contact from ${escapeHtml(name)}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return jsonResponse({ error: error.message }, 500);
    }

    return jsonResponse(
      { message: "Email sent successfully", id: emailData?.id },
      200,
    );
  } catch (error) {
    console.error("Server Error:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
