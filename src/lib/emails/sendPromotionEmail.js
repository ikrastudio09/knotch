import { render } from "@react-email/render";
import { resend } from "./resend";
import PromotionalEmail from "../../../emails/PromotionalEmail";

export async function sendProfessionalEmail(name, email, Text, code) {
  try {
    const html = await render(
      <PromotionalEmail name={name} offerText={Text} couponCode={code} />
    );

    await resend.emails.send({
      from: "Knotch <hello@knotch.in>",
      to: email,
      subject: "Freetings from Knotch",
      html,
    });
  } catch (error) {
    console.error(error);
  }
}