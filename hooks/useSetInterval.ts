import React from "react";

export default function useSetInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = React.useRef<typeof callback>(callback);

  React.useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(id);
    }
  }, [delay]);
}
