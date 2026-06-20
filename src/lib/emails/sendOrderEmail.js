import { render } from "@react-email/render";
import { resend } from "./resend";
import OrderConfirmation from "../../../emails/OrderConfirmation";

export async function sendOrderConfirmation({
  user,
  order,
}) {
  try {
    if (!user?.userEmail) return;

    const html = await render(
      <OrderConfirmation
        customerName={user.userName}
        order={order}
      />
    );

    await resend.emails.send({
      from: "Knotch Orders <orders@knotch.in>",
      replyTo: "support@knotch.in",
      to: user.userEmail,
      subject: `Order Confirmed • ${order.orderNumber}`,
      html,
    });
  } catch (error) {
    console.error(
      "Order confirmation email failed:",
      error
    );
  }
}