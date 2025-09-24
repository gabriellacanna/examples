import { useICBoxPFStore } from "@/lib/store";
import ActionButtons from "../ActionButtons";

const AppHeader = () => {
  const isResultPage =
    Object.keys(useICBoxPFStore((state) => state.result)).length > 0;

  return (
    <div className="flex flex-row justify-end items-center py-4">
      {isResultPage && <ActionButtons />}
    </div>
  );
};

export default AppHeader;
