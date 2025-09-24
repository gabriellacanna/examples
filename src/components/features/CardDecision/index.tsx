import Card from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import recommendations from "@/constants/recommendations";
import { useICBoxPFStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import ToggleButton from "../Help/ToggleButton";
import { useCardDecision } from "./useCardDecision";

const CardDecision = () => {
  const { code } = useICBoxPFStore((state) => state.result.decision);
  const version = useICBoxPFStore((state) => state.version);
  const { getTextClasses } = useCardDecision();

  return (
    <Card className="w-2/4 flex justify-between items-center px-6 py-8 border border-border">
      <div className="flex flex-row">
        <div className="text-2xl text-foreground flex items-center gap-6">
          <Icon />
          <div className="flex flex-col align-center justify-between">
            <p
              data-testid="indicator-text"
              className={cn("text-xl", {
                hidden: code === "0",
              })}
            >
              Nossa recomendação é:
            </p>
            <h2 className={getTextClasses(code, version)}>
              {
                // @ts-expect-error As opções para o pre-qual só vão até 3, conforme retorno do BFF
                recommendations[version][code]
              }
            </h2>
          </div>
        </div>
      </div>
      <ToggleButton contentId="recommendation" />
    </Card>
  );
};

export default CardDecision;
