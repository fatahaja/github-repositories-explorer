import React, { useEffect } from "react";
import LoadingSpinner from "../assets/icons/loading-spinner";

interface PrimaryButtonProps {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading,
  onClick,
  children,
  disabled = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !disabled && !isLoading) {
        onClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, disabled, isLoading]);

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full text-white bg-sky-500 p-3 cursor-pointer h-12 flex items-center justify-center 
        disabled:opacity-50 disabled:cursor-not-allowed 
        md:flex-1/6
        `}
    >
      {isLoading ? (
        <div className="h-[24px] animate-spin">
          <LoadingSpinner variant="light" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
