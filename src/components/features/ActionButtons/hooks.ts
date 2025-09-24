import { useICBoxPFStore } from "@/lib/store";
import exportPdf from "@/utils/exportPdf";

export const useActionButtons = () => {
  const document = useICBoxPFStore((state) => state.result.summary.document);
  const clearResult = useICBoxPFStore((state) => state.clearResult);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    return exportPdf(document);
  };

  const handleNewQuery = () => {
    clearResult();
  };

  return { handlePrint, handleExportPdf, handleNewQuery } as const;
};
