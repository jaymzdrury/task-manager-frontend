import Modal from "../common/modal";

type EditTaskModalProps = {
  title: string;
};

export default function EditTaskModal({
  title,
  children,
}: React.PropsWithChildren<EditTaskModalProps>): JSX.Element {
  return (
    <Modal title="Edit Task" description={`Edit ${title}`}>
      {children}
    </Modal>
  );
}
