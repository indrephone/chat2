type InputProps = {
  type: string; // e.g., "text", "password", etc.
  name?: string; // Name attribute for the input
  id?: string; // ID for the input element
  placeholderText?: string; // Placeholder text
  value: string; // Current value of the input
  onChangeF?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for change events
  onBlurF?: (event: React.FocusEvent<HTMLInputElement>) => void; // Event handler for blur events
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  placeholderText,
  value,
  onChangeF,
  onBlurF,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholderText || ""}
      value={value}
      onChange={onChangeF}
      onBlur={onBlurF} // Add Formik's onBlur here
    />
  );
};

export default Input;
