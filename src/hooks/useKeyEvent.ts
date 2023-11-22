import { useCallback, useEffect } from "react";

export const useKeyEvent = (
  k: string,
  handler: () => void | Promise<never>
) => {
  const eventFn = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey && k === "metaKey") {
        handler();
      }

      if (e.code === k) {
        handler();
      }

      if (e.shiftKey && k === "shiftKey") {
        handler();
      }
    },
    [handler, k]
  );

  useEffect(() => {
    window.addEventListener("keydown", eventFn);

    return () => window.removeEventListener("keydown", eventFn);
  }, [eventFn, handler, k]);
};
