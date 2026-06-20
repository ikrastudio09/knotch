import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

export default function sendWelcomeEmail({ name }) {
  return (
    <Html>
      <Head />

      <Body
        style={{
          backgroundColor: "#f4f4f4",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            margin: "20px auto",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          <Heading>
            Welcome to Knotch, {name} 👋
          </Heading>

          <Text>
            Thank you for creating your account.
          </Text>

          <Text>
            Discover premium fashion, exclusive collections,
            and special member-only offers.
          </Text>

          <Button
            href="https://knotch.in"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Start Shopping
          </Button>

          <Hr />

          <Text
            style={{
              fontSize: "12px",
              color: "#888",
            }}
          >
            © 2026 Knotch. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}