import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useICBoxPFStore } from "@/lib/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useDialog } from "./hooks";
import { cn } from "@/lib/utils";

const Dialog = () => {
  const error = useICBoxPFStore((state) => state.error);
  const { handleClose } = useDialog();
  return (
    <div
      className={cn(
        "absolute top-0 left-0 transition-all duration-700 w-full bg-black/60 grid h-screen place-items-center",
        {
          hidden: !!error?.message === false,
        }
      )}
    >
      <AlertDialog open={!!error?.message}>
        <AlertDialogContent className="bg-white w-1/3 text-secondary-foreground p-8 rounded-xs">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-foreground font-bold">
              ERRO AO REALIZAR A CONSULTA
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-foreground">
              A consulta retornou um erro:
              <span className="block font-bold m-2">CODE: {error?.status}</span>
              <span className="block mb-4">{error?.message}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex sm:justify-center">
            <AlertDialogAction asChild>
              <Button onClick={handleClose}>Fechar</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dialog;
