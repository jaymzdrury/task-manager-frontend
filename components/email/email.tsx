import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <Html>
      <Head />
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white my-12 mx-auto font-sans">
            <Container>
              <Section>
                <Text className="text-xl font-bold pt-2 px-4 text-lime-600">
                  ✅ Task Pro
                </Text>
              </Section>
              {children}
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
