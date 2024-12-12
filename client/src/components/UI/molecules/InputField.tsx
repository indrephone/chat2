import Label from "../atoms/Label";
import Input from "../atoms/Input";

type InputFieldProps = {
  labelText: string; // Label text
  type: string; // Input type, e.g., "text", "password"
  name: string; // Input name attribute
  id: string; // ID for both the label and input
  placeholderText: string; // Placeholder text for the input
  value: string; // Current value of the input
  onChangeF: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  onBlurF: (event: React.FocusEvent<HTMLInputElement>) => void; // Function to handle blur events
};

const InputField: React.FC<InputFieldProps> = ({
  labelText,
  type,
  name,
  id,
  placeholderText,
  value,
  onChangeF,
  onBlurF,
}) => {
  return (
    <div>
      <Label text={labelText} idFor={id} />
      <Input
        type={type}
        name={name}
        id={id}
        placeholderText={placeholderText}
        value={value}
        onChangeF={onChangeF}
        onBlurF={onBlurF} // Pass Formik's onBlur here
      />
    </div>
  );
};

export default InputField;
