import Heading from "../UI/atoms/Heading";
import RegisterForm from "../UI/organisms/RegisterForm";
import { StyledSection } from '../styles/GeneralStyles';


const Register = () => {
    return ( 
        <StyledSection>
            <Heading 
              size={2}
              text="Register"
            />
         <RegisterForm />
        </StyledSection>
     );
}
 
export default Register;