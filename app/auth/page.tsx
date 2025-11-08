"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Button,
  Heading,
  Link,
  Paragraph,
  Textfield,
  ErrorSummary,
} from "@digdir/designsystemet-react";
import { useState, FormEvent } from "react";
import { login, register } from "@/lib/auth";
import RegistrationSuccessModal from "@/components/modal/RegistrationSuccessModal"; // Adjust path as needed

const Auth: React.FC = () => {
  const [state, setState] = useState<"Login" | "Sign Up">("Login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    username?: string;
    general?: string;
  }>({});

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [registrationEmail, setRegistrationEmail] = useState<string>("");
  const [registrationMessage, setRegistrationMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors: {
      email?: string;
      password?: string;
      username?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (state === "Sign Up" && !username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      if (state === "Sign Up") {
        // REGISTRATION LOGIC
        const result = await register(username, email, password);

        // Show success modal
        setRegistrationEmail(email);
        setRegistrationMessage(result.message);
        setIsModalOpen(true);

        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        // LOGIN LOGIC
        const user = await login(email, password);
        console.log("Logged in as:", user);
        router.push("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.log("Full error response:", err.response.data);
        const { status, data } = err.response;

        if (data.messages?.fieldErrors) {
          const fieldErrors = data.messages.fieldErrors;
          const formattedErrors: Record<string, string> = {};

          Object.entries(fieldErrors).forEach(([key, message]) => {
            const fieldName = key.toLowerCase();
            formattedErrors[fieldName] = message as string;
          });

          setErrors(formattedErrors);
        } else {
          const message = data.messages?.response?.[0] || "An error occurred";

          if (state === "Login") {
            if (status === 404) {
              setErrors({ email: message });
            } else if (status === 400) {
              setErrors({ password: message });
            } else if (status === 401) {
              setErrors({ general: message });
            } else {
              setErrors({ general: message });
            }
          } else {
            setErrors({ general: message });
          }
        }
      } else if (err instanceof Error) {
        setErrors({ general: err.message });
      } else {
        setErrors({
          general:
            state === "Sign Up"
              ? "Registration failed. Please try again."
              : "Login failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally switch to login view after closing modal
    setState("Login");
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col justify-center py-10 items-center"
      >
        <Heading
          level={1}
          data-size="lg"
          style={{ marginBottom: "var(--ds-size-5)" }}
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </Heading>

        <div className="flex flex-col gap-3 p-8">
          {state === "Sign Up" && (
            <Textfield
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              type="text"
              id="username"
              error={errors.username}
            />
          )}

          <Textfield
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email"
            id="email"
            error={errors.email}
          />

          <Textfield
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            id="password"
            error={errors.password}
          />

          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading
              ? "Loading..."
              : state === "Sign Up"
                ? "Create Account"
                : "Login"}
          </Button>

          {(errors.email ||
            errors.password ||
            errors.username ||
            errors.general) && (
            <ErrorSummary>
              <ErrorSummary.Heading>
                To continue, you must correct the following errors:
              </ErrorSummary.Heading>
              <ErrorSummary.List>
                {errors.username && (
                  <ErrorSummary.Item>
                    <ErrorSummary.Link href="#username">
                      {errors.username}
                    </ErrorSummary.Link>
                  </ErrorSummary.Item>
                )}
                {errors.email && (
                  <ErrorSummary.Item>
                    <ErrorSummary.Link href="#email">
                      {errors.email}
                    </ErrorSummary.Link>
                  </ErrorSummary.Item>
                )}
                {errors.password && (
                  <ErrorSummary.Item>
                    <ErrorSummary.Link href="#password">
                      {errors.password}
                    </ErrorSummary.Link>
                  </ErrorSummary.Item>
                )}
                {errors.general && (
                  <ErrorSummary.Item>{errors.general}</ErrorSummary.Item>
                )}
              </ErrorSummary.List>
            </ErrorSummary>
          )}

          {state === "Login" && (
            <Link className="cursor-pointer">Forgot Password?</Link>
          )}

          <Paragraph>
            {state === "Sign Up"
              ? "Already have an Account? "
              : "Create a new account? "}
            <Link
              className="cursor-pointer"
              onClick={() => {
                setState(state === "Sign Up" ? "Login" : "Sign Up");
                setErrors({});
              }}
            >
              {state === "Sign Up" ? "Login Here" : "Click here"}
            </Link>
          </Paragraph>
        </div>
      </form>

      <RegistrationSuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        email={registrationEmail}
        message={registrationMessage}
      />
    </>
  );
};

export default Auth;
