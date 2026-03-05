import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const getErrorMessage = (error: unknown, fallbackMsg: string) => {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error || fallbackMsg;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg;
};

export function useImport() {
  const [isLoading, setIsLoading] = useState(false);

  const importData = async (
    source: "kuro" | "wuwatracker",
    payload: string | File,
  ) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("source", source);

    if (payload instanceof File) {
      formData.append("file", payload);
    } else {
      formData.append("url", payload);
    }

    try {
      const res = await api.post("/convene/import/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`Import successfully ${res.data.count} records!`);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Import failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return { importData, isLoading };
}
