import InvalidSession from "@/components/features/InvalidSession";
import { useICBoxPFStore } from "@/lib/store";
import { getProductVersion } from "@/utils/getProductVersion";
import { PropsWithChildren, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const authToken = useICBoxPFStore((state) => state.authToken);
  const setAuthToken = useICBoxPFStore((state) => state.setAuthToken);
  const setVersion = useICBoxPFStore((state) => state.setVersion);

  const [params] = useSearchParams();

  useEffect(() => {
    setAuthToken(params.get("auth_token") || "");
    setVersion(getProductVersion());
  }, [params, setAuthToken, setVersion]);

  return !authToken ? <InvalidSession /> : children;
};

export default ProtectedRoute;
