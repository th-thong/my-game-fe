import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (variables: {
      user_name: string;
      email: string;
      password: string;
    }) => authApi.signUp(variables),

    onSuccess: (data) => {
      console.log("Successfully signed up", data);
      toast.success("Account created!", {
        description: "You can now use your credentials to log in.",
        position: "bottom-right",
      });
      navigate("/login");
    },

    onError: (error: Error) => {
      console.error("Signup error", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user_name = formData.get("user_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ user_name, email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="user-name">User Name</FieldLabel>
                <Input
                  id="user-name"
                  type="text"
                  name="user_name"
                  placeholder="Your username"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" name="password" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="reenter-password">
                  Re-enter Password
                </FieldLabel>
                <Input
                  id="reenter-password"
                  type="password"
                  name="reenter-password"
                  required
                />
              </Field>

              {mutation.isError && (
                <p className="text-sm font-medium text-destructive">
                  Please check your information.
                </p>
              )}
              {mutation.isSuccess && (
                <p className="text-sm font-medium text-destructive">
                  Account created. You can now use your credentials to log in.
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mutation.isPending ? "Signing up..." : "Sign up"}
                </Button>
                <FieldDescription className="text-center">
                  Have an account? <a href="login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
