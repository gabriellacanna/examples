import { useIcon } from "@/hooks/useIcon";
import { useICBoxPFStore } from "@/lib/store";

export const Icon = () => {
  const { code } = useICBoxPFStore((state) => state.result.decision);
  const version = useICBoxPFStore((state) => state.version);
  const { getIcon, getBackgroundClasses } = useIcon();

  const icon = getIcon(code, version);

  return (
    <div className={getBackgroundClasses(code, version)}>
      <img src={icon} alt={"ICONE-INDICATIVO-RECOMENDAÇÃO"} />
    </div>
  );
};
