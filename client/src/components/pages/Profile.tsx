import { useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { StyledSection } from '../styles/GeneralStyles';
import Heading from "../UI/atoms/Heading";
import EditForm from '../UI/organisms/EditForm';
import UsersContext,{ UsersContextTypes } from '../../contexts/UsersContext';


const Profile = () => {
    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes; 
    const navigate = useNavigate(); 
    
    useEffect(() => {
      if (!loggedInUser) {
        navigate("/login");
      }
    }, [loggedInUser, navigate]); // Dependency ensures navigation triggers only when loggedInUser changes

    if (!loggedInUser) {
        return null; // Prevent rendering until navigation completes
      }

    return ( 
        <StyledSection>
           <Heading 
              size={2}
              text="Welcome to the Chat!"
            />
            <h2>{loggedInUser.username}</h2>
            <img 
               src={loggedInUser.profileImage || "/default_profile_image.svg"} 
               alt={`${loggedInUser.username}'s profile`} />

           <EditForm />
        </StyledSection>
     );
}
 
export default Profile;