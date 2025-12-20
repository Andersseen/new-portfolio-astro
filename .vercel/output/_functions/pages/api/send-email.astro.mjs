import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({
  request
}) => {
  const apiKey = "re_YwHxDDAK_6jvqkmFYWc6ZwZFGfwnvQHWk";
  const resend = new Resend(apiKey);
  try {
    const data = await request.json();
    const {
      name,
      email,
      message
    } = data;
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: "Missing required fields"
      }), {
        status: 400
      });
    }
    const {
      data: emailData,
      error
    } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["andriipap01@gmail.com"],
      subject: `New Contact from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });
    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500
      });
    }
    return new Response(JSON.stringify({
      message: "Email sent successfully",
      id: emailData?.id
    }), {
      status: 200
    });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({
      error: "Internal Server Error"
    }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
