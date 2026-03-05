import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export function PasswordInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  className,
}: PasswordInputProps) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Link
        to="/forgot-password"
        className="ml-auto text-sm underline-offset-4 hover:underline"
      >
        Forgot your password?
      </Link>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
