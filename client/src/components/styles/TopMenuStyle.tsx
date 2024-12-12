import styled from "styled-components";

export const TopMenu = styled.header`
   height: 100px;
   padding: 0 20px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #505544;

   nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-right: 15px;
      position: relative; 

      &:first-child a {
        img {
          width: 40px;
          height: 40px;
        }

        &:hover img,
        &:focus img,
        &.active img {
          content: url('/chat_black.svg');
        }
      }

      &:nth-child(2) a {
        img {
          width: 40px;
          height: 40px;
        }

        &:hover img,
        &:focus img,
        &.active img {
          content: url('/star_black.svg');
        }
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    .profile-link img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
      cursor: pointer;
    }

    .username-link {
      font-size: 18px;
      margin-right: 10px;
      /* text-decoration: none; */
      color: #fff;
      cursor: pointer;
    }

    button {
      padding: 5px 10px;
      font-size: 16px;
      color: #fff;
      background-color: #666;
      cursor: pointer;
    }
  }
`;