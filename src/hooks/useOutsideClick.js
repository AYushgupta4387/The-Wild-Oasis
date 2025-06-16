import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapture = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler(); // Call the handler if clicked outside
        }
      }

      document.addEventListener("click", handleClick, listenCapture);

      return () => {
        document.removeEventListener("click", handleClick, listenCapture);
      };
    },
    [handler, listenCapture]
  );

  return ref;
}
