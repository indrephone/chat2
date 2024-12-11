import { createContext, useReducer, useEffect, useState, ReactNode } from "react";

type ChildrenType = { children: ReactNode}; // Changed ReactElement to ReactNode for broader compatibility
export type UserType = {
    _id: string,
    username: string,
    profileImage: string,
    password: string
}
type ReducerActionTypes =
{ type: "getAll", allUsers: UserType[]} |
{ type: "addNewUser", newUser: UserType} 


export type ContextTypes = {
    users: UserType[]; // List of all users
    addNewUser: (newUser: UserType) => void; // Function to add a new user
    loggedInUser: UserType | null; // The currently logged-in user
    logInUser: (user: UserType) => void; // Function to log in a user
    getSpecificUser: (userId: string) => UserType | null; // Function to retrieve a specific user
  };

const UsersContext = createContext<ContextTypes | undefined>(undefined);

const reducer = (state: UserType[], action: ReducerActionTypes): UserType[] => {
    switch(action.type){
        case 'getAll':
            return action.allUsers;
        case 'addNewUser':
            return [...state, action.newUser]; // Removed fetch as reducers should be pure
        default:
            return state;        
    }
} 

const UsersProvider = ({ children }: ChildrenType) => {

    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);

    const [users, dispatch] = useReducer(reducer, []);

    const addNewUser = async (newUser: UserType) => {
        try {
          await fetch("http://localhost:5173/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          dispatch({ type: "addNewUser", newUser });
        } catch (error) {
          console.error("Failed to add new user:", error);
        }
      };




     const getSpecificUser = (_id: string): UserType | null => users.find((user) => user._id === _id) || null;
    

     useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:5173/users");
            const data = await response.json();
            dispatch({ type: "getAll", allUsers: data });
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };
        fetchUsers();
      }, []);
  
    return (
        <UsersContext.Provider
          value={{
            users,
            addNewUser,
            loggedInUser,
            logInUser: setLoggedInUser,
            getSpecificUser,
          }}
        >
        {children}</UsersContext.Provider>
    )
}
export { UsersProvider}
export default UsersContext;
  
