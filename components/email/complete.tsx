import EmailTemplate from "./email";
import { Button, Column, Row, Section, Text } from "@react-email/components";
import { Task } from "@/types/types";
import { env } from "@/types/env";
import { cn } from "@/lib/utils";

export default function Complete({ task }: { task: Task }): JSX.Element {
  return (
    <EmailTemplate>
      <Section>
        <Row>
          <Column align="center">
            <Text
              className={cn(
                task.users[0].role === "user"
                  ? "bg-blue-600"
                  : task.users[0].role === "admin"
                  ? "bg-amber-600"
                  : "bg-red-700",
                "text-white text-3xl text-center p-4 rounded-full w-10 h-10"
              )}
            >
              {task.users[0].name.charAt(0).toUpperCase()}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section>
        <Row>
          <Text className="text-3xl text-gray-600 font-bold px-4">
            Here is what {task.users[0].name.split(" ")[0]}{" "}
            {task.users.length > 1 ? "& more" : undefined} finished...
          </Text>
          <Text className="text-lg font-medium text-gray-600 bg-gray-100 m-4 p-6">
            {task.title} | {task.description}
          </Text>
        </Row>
      </Section>
      <Section align="center">
        <Button
          className="bg-lime-600 text-lg text-white mx-4 mt-8 py-5 px-52 rounded"
          href={`${env.CLIENT}/en/users`}
        >
          Track
        </Button>
      </Section>
    </EmailTemplate>
  );
}
