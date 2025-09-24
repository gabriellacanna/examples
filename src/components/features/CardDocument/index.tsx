import Card from "@/components/ui/card";
import { useICBoxPFStore } from "@/lib/store";
import { cpf } from "cpf-cnpj-validator";

const CardDocument = () => {
  const { document, name } = useICBoxPFStore((state) => state.result.summary);

  return (
    <Card className="w-2/3 p-4 print:whitespace-normal border border-border">
      <div className="flex flex-row ">
        <div className="w-60 print:w-80">
          <p className="text-secondary-foreground text-sm">CPF</p>
          <h2 className="flex flex-nowrap text-lg text-foreground print:text-sm">
            {cpf.format(document)}
          </h2>
        </div>
        <div>
          <p className="text-secondary-foreground text-sm">
            {name ? "Nome" : ""}
          </p>
          <h2 className="text-lg text-foreground print:text-sm">
            {name ? name : ""}
          </h2>
        </div>
      </div>
    </Card>
  );
};

export default CardDocument;
