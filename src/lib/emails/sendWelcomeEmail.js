import { render } from "@react-email/render";
import { resend } from "./resend";
import WelcomeEmail from "../../../emails/WelcomeEmail";

export async function sendWelcomeEmail(name, email) {
  try {
    const html = await render(
      <WelcomeEmail name={name} />
    );

    await resend.emails.send({
      from: "Knotch <welcome@knotch.in>",
      to: email,
      subject: "Welcome to Knotch",
      html,
    });
  } catch (error) {
    console.error(error);
  }
}