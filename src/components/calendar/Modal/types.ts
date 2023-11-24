import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren & {
  button: JSX.Element;
};

export type ModalContextType = {
  closeModal: () => void;
};
