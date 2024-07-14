import Checkbox from "../common/checkbox";
import { Complete, Task } from "@/types/types";

const completionValues = ["ToDo", "In Progress", "Done"] as const;

export default function EditCompleteMenu({
  task,
  children,
}: {
  task: Task;
  children: (complete: Complete) => React.ReactNode;
}): JSX.Element {
  return (
    <>
      {completionValues.map((complete: Complete) => (
        <Checkbox key={complete} condition={complete === task.complete}>
          {children(complete)}
        </Checkbox>
      ))}
    </>
  );
}
