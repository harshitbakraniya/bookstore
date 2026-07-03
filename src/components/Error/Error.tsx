import { Button } from "../ui/button";

const ErrorComponent = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => {
  return (
    <div className="text-center mt-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 lg:pt-[10rem] pb-10" role="alert">
      <p className="text-destructive">
        {error instanceof Error ? error.message : "Failed to load books."}
      </p>
      <Button onClick={() => refetch()} className="mt-4 cursor-pointer">
        Try again
      </Button>
    </div>
  );
};

export default ErrorComponent;