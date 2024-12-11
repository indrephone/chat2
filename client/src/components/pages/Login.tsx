import Heading from "../UI/atoms/Heading";
import LoginForm from "../UI/organisms/LoginForm";
import { StyledSection } from '../styles/GeneralStyles';


const Login = () => {
    return ( 
        <StyledSection>
            <Heading 
              size={2}
              text="Login"
            />
            <LoginForm />
        </StyledSection>
     );
}
 
export default Login;