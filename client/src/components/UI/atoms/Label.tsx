type LabelProps = {
    text: string; // The text content of the label
    idFor: string; // The id of the element this label is associated with
  };
  
  const Label: React.FC<LabelProps> = ({ text, idFor }) => {
    return <label htmlFor={idFor}>{text}</label>;
  };
  
  export default Label;
  