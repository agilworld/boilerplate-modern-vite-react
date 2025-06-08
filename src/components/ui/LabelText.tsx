type LabelTextProps = {
  to: string;
  text: string;
  classes?: string;
};
export const LabelText = ({ to, classes = '', text }: LabelTextProps) => {
  return (
    <label
      htmlFor={to}
      className={'block text-sm font-medium text-gray-700 mb-1'.concat(classes)}
    >
      {text}
    </label>
  );
};
