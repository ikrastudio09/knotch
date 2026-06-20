import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

export default function EmailLayout({
  title,
  children,
}) {
  return (
    <Html>
      <Head />

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Header */}

          <Section
            style={{
              backgroundColor: "#000",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#fff",
                margin: 0,
              }}
            >
              KNOTCH
            </Heading>
          </Section>

          {/* Body */}

          <Section
            style={{
              padding: "40px",
            }}
          >
            <Heading>{title}</Heading>

            {children}
          </Section>

          <Hr />

          {/* Footer */}

          <Section
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: "#888",
              }}
            >
              © 2026 Knotch Fashion
            </Text>

            <Text
              style={{
                fontSize: "12px",
                color: "#888",
              }}
            >
              Mumbai, India
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}