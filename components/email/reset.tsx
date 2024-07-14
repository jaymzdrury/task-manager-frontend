import EmailTemplate from "./email";
import { Button, Row, Section, Text } from "@react-email/components";
import { Id } from "@/types/types";
import { env } from "@/types/env";

export default function Reset({ id }: { id: Id }): JSX.Element {
  return (
    <EmailTemplate>
      <Section>
        <Row>
          <Text className="text-lg font-medium text-gray-600 bg-gray-100 m-4 p-6">
            Reset Password
          </Text>
        </Row>
      </Section>
      <Section align="center">
        <Button
          className="bg-lime-600 text-lg text-white mx-4 mt-8 py-5 px-52 rounded"
          href={`${env.CLIENT}/en/${id}`}
        >
          Reset
        </Button>
      </Section>
    </EmailTemplate>
  );
}
