import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { LabeledInput } from "@/components/LabelInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { LoadingButton } from "@/components/LoadingButton";
import { Link } from "react-router-dom";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signup, isSuccess, isPending, isError } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user_name = formData.get("user_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signup({ user_name, email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <LabeledInput
                label="User Name"
                id="user-name"
                type="text"
                name="user_name"
                placeholder="Your username"
                required
              />
              <LabeledInput
                label="Email"
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <PasswordInput
                label="Password"
                id="password"
                type="password"
                name="password"
                required
              />
              <LabeledInput
                label="Re-enter Password"
                id="reenter-password"
                type="password"
                name="reenter-password"
                required
              />

              {isError && (
                <p className="text-sm font-medium text-destructive">
                  Please check your information.
                </p>
              )}
              {isSuccess && (
                <p className="text-sm font-medium text-destructive">
                  Account created. You can now use your credentials to log in.
                </p>
              )}

              <LoadingButton isLoading={isPending} loadingText="Signing up...">
                Sign up
              </LoadingButton>

              <div className="text-center text-sm">
                Have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
