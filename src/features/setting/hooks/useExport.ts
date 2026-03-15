import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async (uid: string) => {
    setIsExporting(true);
    try {
      const res = await api.get(`/convene/export/${uid}/?format=mywuwa`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;

      let finalFileName = `gacha-export-${uid}.json`;

      const contentDisposition = res.headers["content-disposition"];
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch && fileNameMatch.length === 2) {
          finalFileName = fileNameMatch[1];
        }
      }

      link.setAttribute("download", finalFileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export successful!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Export failed!");
      } else {
        toast.error("Export failed!");
      }
    } finally {
      setIsExporting(false);
    }
  };

  return { exportData, isExporting };
}
