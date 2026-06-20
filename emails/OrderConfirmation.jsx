import {
  Text,
  Section,
  Heading,
  Row,
  Column,
  Img,
} from "@react-email/components";

import EmailLayout from "./EmailLayout";

export default function OrderConfirmation({
  customerName,
  order,
}) {
  return (
    <EmailLayout title="Order Confirmed 🎉">

      <Text>
        Hi {customerName},
      </Text>

      <Text>
        We've received your order and payment
        successfully.
      </Text>

      <Text>
        <strong>Order Number:</strong>{" "}
        {order.orderNumber}
      </Text>

      <Text>
        <strong>Payment Status:</strong>{" "}
        Paid
      </Text>

      <Text>
        <strong>Payment Method:</strong>{" "}
        Razorpay
      </Text>

      <Heading
        as="h2"
        style={{
          fontSize: "20px",
          marginTop: "30px",
        }}
      >
        Ordered Items
      </Heading>

      {order.items.map((item) => (
        <Section
          key={item.productID}
          style={{
            border: "1px solid #eee",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <Row>
            <Column width="100">
              <Img
                src={item.productImage}
                width="80"
                height="80"
              />
            </Column>

            <Column>
              <Text>
                <strong>
                  {item.productName}
                </strong>
              </Text>

              <Text>
                Size: {item.productSize}
              </Text>

              <Text>
                Qty: {item.quantity}
              </Text>

              <Text>
                ₹{item.sellingPrice}
              </Text>
            </Column>
          </Row>
        </Section>
      ))}

      <Heading
        as="h2"
        style={{
          fontSize: "20px",
          marginTop: "30px",
        }}
      >
        Shipping Address
      </Heading>

      <Text>
        {order.shippingAddress.AddressLine1}
      </Text>

      {order.shippingAddress.AddressLine2 && (
        <Text>
          {order.shippingAddress.AddressLine2}
        </Text>
      )}

      <Text>
        {order.shippingAddress.City},{" "}
        {order.shippingAddress.State}
      </Text>

      <Text>
        {order.shippingAddress.PinCode}
      </Text>

      <Heading
        as="h2"
        style={{
          fontSize: "20px",
          marginTop: "30px",
        }}
      >
        Order Summary
      </Heading>

      <Text>
        Items: {order.totalItems}
      </Text>

      <Text>
        Shipping:
        ₹{order.shipping?.cost || 0}
      </Text>

      {order.voucherDiscount > 0 && (
        <Text>
          Voucher Discount:
          -₹{order.voucherDiscount}
        </Text>
      )}

      {order.promotionDiscount > 0 && (
        <Text>
          Promotion Discount:
          -₹{order.promotionDiscount}
        </Text>
      )}

      <Text
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Total Paid: ₹{order.totalAmount}
      </Text>

      <Text
        style={{
          marginTop: "30px",
          color: "#666",
        }}
      >
        You will receive another email once
        your order is packed and shipped.
      </Text>

    </EmailLayout>
  );
}