import { createContext, useReducer, useEffect, useState, ReactNode } from "react";

type ChildrenType = { children: ReactNode}; // Changed ReactElement to ReactNode for broader compatibility

export type UserType = {
    _id: string,
    username: string,
    profileImage: string | null,
    password: string
}
export type NewUserType = Omit<UserType, "_id">;

type ReducerActionTypes =
{ type: "getAll", allUsers: UserType[]} |
{ type: "addNewUser", newUser: UserType} 


export type ContextTypes = {
    users: UserType[]; // List of all users
    setUsers: (action: ReducerActionTypes) => void; // Function to update users
    loggedInUser: UserType | null; // The currently logged-in user
    setLoggedInUser: (user: UserType | null) => void; // Function to set logged-in user
    getSpecificUser: (userId: string) => UserType | null; // Function to retrieve a specific user
    addNewUser: (newUser: NewUserType) => Promise<UserType>; // Function to add a new user
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
    const [users, setUsers] = useReducer(reducer, []);

    const addNewUser = async (newUser: NewUserType): Promise<UserType> => {
        const response = await fetch("http://localhost:5173/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const createdUser: UserType = await response.json();
        setUsers({ type: "addNewUser", newUser: createdUser });
        return createdUser;
      };
      

     const getSpecificUser = (_id: string): UserType | null => users.find((user) => user._id === _id) || null;
    

     useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:5173/users");
            const data = await response.json();
            setUsers({ type: "getAll", allUsers: data });
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
            setUsers,
            loggedInUser,
            setLoggedInUser,
            addNewUser,
            getSpecificUser
          }}
        >
        {children}</UsersContext.Provider>
    )
}
export { UsersProvider}
export default UsersContext;
  
