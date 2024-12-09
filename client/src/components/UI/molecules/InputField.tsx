import Label from "../atoms/Label";
import Input from "../atoms/Input";

type InputFieldProps = {
    text: string; // Label text
    type: string; // Input type, e.g., "text", "password"
    name: string; // Input name attribute
    id: string; // ID for both the label and input
    placeholderText: string; // Placeholder text for the input
    value: string; // Current value of the input
    onChangeF: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  };

const InputField: React.FC<InputFieldProps> = ({ text, type, name, id, placeholderText, value, onChangeF }) => {
    return (
     <div>
       <Label 
         text={text}
         idFor={id}
       />
       <Input
         type={type}
         name={name}
         id={id}
         placeholderText={placeholderText}
         value={value}
         onChangeF={onChangeF}
         />
    </div> 
  );
}
 
export default InputField;