import { StyledSection } from '../styles/GeneralStyles';
import Heading from "../UI/atoms/Heading";

const Profile = () => {
    return ( 
        <StyledSection>
           <Heading 
              size={2}
              text="Welcome to the Chat!"
            />
        </StyledSection>
     );
}
 
export default Profile;