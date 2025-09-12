import { useEffect } from "react";

export const useOutsideClick = ({ ref, cb }) => {
  useEffect(() => {
    const closeModal = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };
    document.addEventListener("mousedown", closeModal);
    document.addEventListener("touchstart", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
      document.addEventListener("touchstart", closeModal);
    };
  }, [ref, cb]);
};
