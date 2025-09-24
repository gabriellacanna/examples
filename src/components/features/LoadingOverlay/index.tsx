import Spinner from "@/components/ui/spinner";
import { useICBoxPFStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const LoadingOverlay = () => {
  const loading = useICBoxPFStore((state) => state.loading);

  return (
    <div
      data-testid="loading-overlay"
      role="alert"
      className={cn(
        "absolute top-0 left-0 transition-all duration-700 w-full bg-white/70 grid h-screen place-items-center",
        {
          hidden: !loading,
        }
      )}
    >
      <div className="flex">
        <Spinner />
        <h1>Por favor, aguarde...</h1>
      </div>
    </div>
  );
};

export default LoadingOverlay;
