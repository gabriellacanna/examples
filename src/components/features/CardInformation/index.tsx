import Card from "@/components/ui/card";
import titles from "@/constants/titles";
import { useICBoxPFStore } from "@/lib/store";
import { useCardInformation } from "./useCardInformation";

const CardInformation = () => {
  const { message, code } = useICBoxPFStore((state) => state.result.decision);
  const version = useICBoxPFStore((state) => state.version);
  const { getAcertaPositivoSuggestion, getTextClasses } = useCardInformation();

  return (
    <Card className="w-2/4 px-6 py-8 flex flex-col items-start justify-start border border-border">
      <p className={getTextClasses(code, version)}>
        {
          // @ts-expect-error As opções para o pre-qual só vão até 3, conforme retorno do BFF
          titles[version][code]
        }
      </p>

      <p className="text-md print:text-sm text-foreground">{message.at(0)}</p>
      {getAcertaPositivoSuggestion(version)}
    </Card>
  );
};

export default CardInformation;
