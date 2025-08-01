
  import { cn } from "@/lib/utils";
  import { Loader, Plus, SaveAll } from "lucide-react";
  import React from "react";
  type SubmitButtonProps = {
    title: string;
    loadingTitle?: string;
    className?: string;
    loaderIcon?: any;
    buttonIcon?: any;
    loading: boolean;
    showIcon?: boolean;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  };
  export default function SubmitButton({
    title,
    loadingTitle = "Saving Please wait...",
    loading,
    className,
    loaderIcon = Loader,
    buttonIcon = SaveAll,
    showIcon = true,
  }: SubmitButtonProps) {
    const LoaderIcon = loaderIcon;
    const ButtonIcon = buttonIcon;
    return (
      <>
        {loading ? (
          <button
            type="button"
            disabled
            className={cn(
              "items-center flex justify-center rounded-md bg-green-600/55 px-3 py-2 text-sm font-semibold leading-6 text-yellow-100 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed",
              className
            )}
          >
            <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
            {loadingTitle}
          </button>
        ) : (
          <button
            type="submit"
            className={cn(
              "flex items-center justify-center rounded-md border border-green-300 px-3 py-2 text-sm font-semibold leading-6 text-green-800 hover:text-yellow-100 hover:transition-all hover:duration-400 hover:border-none shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
              className
            )}
          >
            {showIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
            {title}
          </button>
        )}
      </>
    );
  }