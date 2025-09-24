import ResultsPage from "@/components/pages/ResultsPage";
import SearchFormPage from "@/components/pages/SearchFormPage";
import { useICBoxPFStore } from "@/lib/store";
import ProtectedRoute from "./ProtectedRoute";

const useHandleProtection = () => {
  const result = useICBoxPFStore((state) => state.result);

  return (
    <ProtectedRoute>
      {Object.keys(result).length > 0 ? <ResultsPage /> : <SearchFormPage />}
    </ProtectedRoute>
  );
};

export default useHandleProtection;
