import styled from "styled-components";

// styled section to hold heading and form components, see 65pask.
export const StyledSection = styled.section`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px;;
   min-height: 100vh;
`;
// svytintis uzrasas
export const StyledHeading = styled.h1`
   font-family: 'Poppins', sans-serif;
   font-weight: 200; 
   font-size: 36px; 
   color: white;
   margin-bottom: 8px;
   text-shadow: 
    0 0 5px #ffd700,    /* Outer glow */
    0 0 10px #ffd700,   /* Medium glow */
    0 0 15px #ffd700,   /* Strong glow */
    0 0 20px #ffd700;   /* Extra glow for neon effect */
`;