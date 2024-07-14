import FormContainer from "@/components/login/form-container";
import NavBar from "@/components/navbar/navbar";

import styles from "../styles.module.css";

export default function RegisterSkeleton(): JSX.Element {
  return (
    <>
      <NavBar loadingClass={styles.loadingClass} />
      <FormContainer className="animate-pulse h-[450px]" />
    </>
  );
}
