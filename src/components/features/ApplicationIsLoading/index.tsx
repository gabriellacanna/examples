import Spinner from "@/components/ui/spinner";

const ApplicationIsLoading = () => {
  return (
    <h1 className="flex flex-row p-4">
      <Spinner />
      Aguarde...
    </h1>
  );
};

export default ApplicationIsLoading;
