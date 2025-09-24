import Card from "@/components/ui/card";
import { useICBoxPFStore } from "@/lib/store";

const CardDocumentStatus = () => {
  const { situation } = useICBoxPFStore((state) => state.result.summary);
  return (
    <Card className="w-1/3 p-4 text-secondary-foreground border border-border">
      <div>
        <p className="text-sm">Situação do CPF</p>
        <h2 className="text-lg text-foreground font-bold">
          {situation.toUpperCase() || "-"}
        </h2>
      </div>
    </Card>
  );
};

export default CardDocumentStatus;
