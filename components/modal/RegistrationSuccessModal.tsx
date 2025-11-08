import {
  Dialog,
  Button,
  Heading,
  Paragraph,
  Textfield,
  Alert,
} from "@digdir/designsystemet-react";
import { useRef, useEffect } from "react";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  message?: string;
}

const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({
  isOpen,
  onClose,
  email,
  message = "Account registered successfully.",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <Dialog ref={dialogRef} onClose={onClose} closedby="any">
      <div className="flex flex-col  w-full gap-4">
        <Heading level={2} data-size="sm" className="text-center">
          Activate Code
        </Heading>

        <Paragraph>{message}</Paragraph>

        <Paragraph>
          A verification email has been sent to <strong>{email}</strong>.
        </Paragraph>
        <Alert data-color="info">
          Please check your inbox and input code below to activate your account.
        </Alert>
        <Textfield type="text" error="" label="Enter Activation Code" />

        <Button onClick={handleClose}>Got it</Button>
      </div>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
