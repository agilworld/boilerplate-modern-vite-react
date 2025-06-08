type ButtonPrimaryProps = {
  type: 'submit' | 'button';
  disabled: boolean;
  labelText: string;
  labelLoadingText: string;
  isLoading: boolean;
  onClick?: () => void;
};

export const ButtonPrimary = ({
  type,
  disabled,
  labelText,
  labelLoadingText,
  isLoading,
  onClick,
}: ButtonPrimaryProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {labelLoadingText}
        </div>
      ) : (
        labelText
      )}
    </button>
  );
};
