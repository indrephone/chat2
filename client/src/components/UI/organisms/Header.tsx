import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext, { UsersContextTypes } from '../../../contexts/UsersContext';
import { TopMenu } from '../../styles/TopMenuStyle';
// import ConversationsContext, { ConversationsContextTypes } from '../../../contexts/ConversationsContext';




const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// const Badge = styled.span`
// position: absolute;
//   top: -5px;
//   right: -5px;
//   background-color: red;
//   color: white;
//   border-radius: 50%;
//   padding: 2px 6px;
//   font-size: 12px;
//   z-index: 1;
// `;

const Header = () => {
  const { loggedInUser, logout } = useContext(UsersContext) as UsersContextTypes;
  // const { getConversationCount } = useContext(ConversationsContext) as ConversationsContextTypes;
  const navigate = useNavigate();

  // const conversationCount = getConversationCount();

  return ( 
    <TopMenu>
      <nav>
        <ul>
          <li>
            <NavLink to="/conversations">
             <IconContainer>
                <img src="/chat_white.svg" alt="chat button" />
                  {/* {conversationCount > 0 && (
                  <Badge>{conversationCount}</Badge>  // Show badge if there are conversations
                )} */}
              </IconContainer>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <img src="/star_white.svg" alt="users button" />
            </NavLink>
          </li>
        </ul>
      </nav>

      {loggedInUser ? (
        <div className="user-info">
           <NavLink to="/profile" className="profile-link"> 
          <img 
            src={loggedInUser.profileImage || "/default_profile_image.svg"} 
            alt="user profile image" 
          />
          </NavLink> 
          
          <NavLink to={`/edit-user/${loggedInUser._id}`} className="username-link">
            {loggedInUser.username}
          </NavLink>

           
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
          > Sign Out
          </button>
        </div>
      ) : (
        <div>
          <NavLink to="/login">Log In</NavLink>
        </div>
      )}
    </TopMenu>
  );
};

export default Header;
