import { Input } from "@/components/ui/input";

interface LabeledInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export function LabeledInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  className,
}: LabeledInputProps) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
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
