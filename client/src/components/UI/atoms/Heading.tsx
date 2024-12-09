import { StyledHeading } from '../../styles/GeneralStyles';

type HeadingProps = {
    text: string;
    size: number;
};

const Heading: React.FC<HeadingProps> = ({text, size}) => {
  const tag = `h${size}` as keyof JSX.IntrinsicElements; 
    return ( 
        <StyledHeading as={tag} >{text}</StyledHeading>
     );
}
 
export default Heading;