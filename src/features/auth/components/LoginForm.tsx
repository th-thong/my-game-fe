import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { LabeledInput } from "@/components/LabelInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, isPending, isError } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <LabeledInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
              <PasswordInput
                label="Password"
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />

              {isError && (
                <p className="text-sm font-medium text-destructive">
                  Invalid email or password. Please try again.
                </p>
              )}

              <LoadingButton isLoading={isPending} loadingText="Logging in...">
                Login
              </LoadingButton>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
