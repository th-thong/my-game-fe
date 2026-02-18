import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineEditableFieldProps {
  label: string;
  initialValue: string;
  onSave: (newValue: string) => Promise<void> | void;
  className?: string;
  valueClassName?: string;
  placeholder?: string;
}

export function InlineEditableField({
  label,
  initialValue,
  onSave,
  className,
  valueClassName,
  placeholder,
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = async (newValue: string) => {
    if (newValue.trim() === value) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      await onSave(newValue);
      setValue(newValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>

      <div className="flex items-start gap-3">
        {isEditing ? (
          <EditMode
            initialValue={value}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
            className={valueClassName}
            placeholder={placeholder}
          />
        ) : (
          <ViewMode
            value={value}
            onEdit={() => setIsEditing(true)}
            className={valueClassName}
          />
        )}
      </div>
    </div>
  );
}

interface ViewModeProps {
  value: string;
  onEdit: () => void;
  className?: string;
  editText?:string;
}

function ViewMode({ value, onEdit, className, editText="Edit" }: ViewModeProps) {
  return (
    <>
      <div
        className={cn(
          "flex-1 flex h-10 w-full items-center rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-foreground truncate",
          className,
        )}
        title={value}
      >
        {value || <span className="text-muted-foreground italic">Empty</span>}
      </div>
      <Button
        onClick={onEdit}
        variant="outline"
        className="h-10 px-4 rounded-full border-muted-foreground/20 shrink-0"
      >
        {editText}
      </Button>
    </>
  );
}

interface EditModeProps {
  initialValue: string;
  onSave: (val: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  className?: string;
  placeholder?: string;
}

function EditMode({
  initialValue,
  onSave,
  onCancel,
  isLoading,
  className,
  placeholder,
}: EditModeProps) {
  const [tempValue, setTempValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSave(tempValue);
    if (e.key === "Escape") onCancel();
  };

  return (
    <>
      <Input
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className={cn("flex-1 h-10 bg-background", className)}
        placeholder={placeholder}
      />
      <div className="flex items-center gap-2 shrink-0">
        <Button
          onClick={() => onSave(tempValue)}
          disabled={isLoading}
          size="sm"
          className="h-10 px-3"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={onCancel}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="h-10 px-3 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
