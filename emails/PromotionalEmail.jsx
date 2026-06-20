import {
  Text,
  Button,
} from "@react-email/components";

import EmailLayout from "./EmailLayout";

export default function PromotionalEmail({
  title,
  offerText,
  couponCode,
}) {
  return (
    <EmailLayout title={title}>

      <Text>
        Exclusive offer just for you.
      </Text>

      <Text
        style={{
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {offerText}
      </Text>

      <Text>
        Coupon Code:
      </Text>

      <Text
        style={{
          background: "#f3f3f3",
          padding: "15px",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {couponCode}
      </Text>

      <Button
        href="https://knotch.in/shop"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 20px",
        }}
      >
        Shop Now
      </Button>

    </EmailLayout>
  );
}