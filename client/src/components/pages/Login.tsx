import Heading from "../UI/atoms/Heading";
import { StyledSection } from '../styles/GeneralStyles';


const Login = () => {
    return ( 
        <StyledSection>
            <Heading 
              size={2}
              text="Login"
            />
        </StyledSection>
     );
}
 
export default Login;