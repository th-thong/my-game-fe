import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  type?: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
}

export function LoadingButton({
  isLoading,
  children,
  loadingText,
  type = "submit",
  className,
  disabled,
}: LoadingButtonProps) {
  return (
    <Button 
      type={type} 
      className={cn("w-full", className)} 
      disabled={isLoading || disabled}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? (loadingText || children) : children}
    </Button>
  );
}