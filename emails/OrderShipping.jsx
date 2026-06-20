import {
  Text,
  Button,
} from "@react-email/components";

import EmailLayout from "./EmailLayout";

export default function OrderShipped({
  customerName,
  trackingURL,
}) {
  return (
    <EmailLayout title="Your Order Has Shipped 🚚">

      <Text>
        Hi {customerName},
      </Text>

      <Text>
        Your order is on the way.
      </Text>

      <Button
        href={trackingURL}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 20px",
        }}
      >
        Track Package
      </Button>

    </EmailLayout>
  );
}