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
import { login as apiLogin, register } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import RegistrationDialogModal from "@/components/modal/RegistrationDialogModal";

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [registrationEmail, setRegistrationEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { login } = useAuth(); // Add this

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
        await register(username, email, password);
        setRegistrationEmail(email);
        setIsModalOpen(true);
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        // LOGIN LOGIC
        await apiLogin(email, password);

        // Get token and update context
        const token = localStorage.getItem("token");
        if (token) {
          login(token); // Update AuthContext state
        }

        router.push("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        const formErrors: {
          email?: string;
          password?: string;
          username?: string;
          general?: string;
        } = {};

        if (data.messages?.fieldErrors) {
          const fieldErrors = data.messages.fieldErrors;
          Object.entries(fieldErrors).forEach(([key, message]) => {
            const fieldName = key.toLowerCase();
            if (fieldName === "email") {
              formErrors.email = message as string;
            } else if (fieldName === "password") {
              formErrors.password = message as string;
            } else if (fieldName === "username") {
              formErrors.username = message as string;
            }
          });
        }

        if (data.messages?.validationErrors) {
          const validationErrors = data.messages.validationErrors;
          Object.entries(validationErrors).forEach(([key, messages]) => {
            const fieldName = key.toLowerCase();
            const errorArray = messages as string[];
            if (fieldName === "email" && !formErrors.email) {
              formErrors.email = errorArray[0];
            } else if (fieldName === "password" && !formErrors.password) {
              formErrors.password = errorArray[0];
            } else if (fieldName === "username" && !formErrors.username) {
              formErrors.username = errorArray[0];
            }
          });
        }

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        } else {
          const message = data.messages?.response || "An error occurred";
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
    setState("Login");
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col justify-center py-20 items-center"
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

      <RegistrationDialogModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        email={registrationEmail}
      />
    </>
  );
};

export default Auth;
