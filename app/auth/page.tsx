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
import { login } from "@/lib/auth";

const Auth: React.FC = () => {
  const [state, setState] = useState<"Login" | "Sign Up">("Login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Change from single error to field-specific errors
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear all previous errors upon submission
    setLoading(true);

    // Client-side validation
    const newErrors: {
      email?: string;
      password?: string;
      general?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      if (state === "Sign Up") {
        // TODO: implement sign up later
        console.log("Sign Up:", { name, email, password });
      } else {
        // LOGIN LOGIC
        const user = await login(email, password);
        console.log("Logged in as:", user);
        router.push("/"); // Redirect after successful login
      }
    } catch (err: unknown) {
      setLoading(false);

      // Check if it's an axios error with response
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        const message = data.responseMessages?.[0] || "An error occurred";

        // Map status codes to fields
        if (status === 404) {
          // User not found - email issue
          setErrors({ email: message });
        } else if (status === 400) {
          // Bad request - password issue
          setErrors({ password: message });
        } else if (status === 401) {
          // Unauthorized - could be either, show as general
          setErrors({ general: message });
        } else {
          // Other errors
          setErrors({ general: message });
        }
      } else if (err instanceof Error) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-center py-10 items-center h-svh"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            type="text"
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
        {(errors.email || errors.password || errors.general) && (
          <ErrorSummary>
            <ErrorSummary.Heading>
              To continue, you must correct the following errors:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
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
  );
};

export default Auth;
