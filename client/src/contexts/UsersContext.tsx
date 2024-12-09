import { createContext, useReducer, useEffect, useState, ReactElement } from "react";

type ChildrenType = { children: ReactElement};
export type UserType = {
    _id: string,
    username: string,
    profileImage: string,
    password: string
}
type ReducerActionTypes =
{ type: "setData", data: UserType[]} |
{ type: "addNewUser", newUser: UserType} |
// { type: "editUser", data: Omit<UserType, '_id'>; id: string};
{ type: "editUser"; updatedUser: UserType };


export type ContextTypes = {
    users: UserType[]; // List of all users
    addNewUser: (newUser: UserType) => void; // Function to add a new user
    loggedInUser: UserType | null; // The currently logged-in user
    logInUser: (user: UserType) => void; // Function to log in a user
    logOutUser: () => void; // Function to log out the current user
    editSpecificUser: (userId: string, updatedUser: Partial<UserType>) => void; // Function to edit a user
    returnSpecificUser: (userId: string) => UserType | null; // Function to retrieve a specific user
  };

const reducer = (state: UserType[], action: ReducerActionTypes) => {
    switch(action.type){
        case 'setData':
            return action.data;
        case 'addNewUser':
            return [...state, action.newUser];
        default:
            return state;        
    }
} 

const UsersContext = createContext<ContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildrenType) => {

    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);
    const logInUser = (user:UserType) => {
        setLoggedInUser(user);
    }
    const logOutUser = () => {
        setLoggedInUser(null);
    }

    const [users, dispatch] = useReducer(reducer, []);
    const addNewUser = (newUser: UserType) => {
        fetch(`http://localhost:5173/users`, {
            method: "POST",
            headers: {
               "Content-Type":"application/json" 
            },
            body: JSON.stringify(newUser)
        })
        dispatch({
            type: "addNewUser",
            newUser: newUser
        })
    };

    const editSpecificUser = (userId: string, updatedUser: Partial<UserType>) => {
        const updatedUserData = { ...returnSpecificUser(userId), ...updatedUser };
        fetch(`http://localhost:5173/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
        }).then(() =>
            dispatch({
                type: "editUser",
                updatedUser: updatedUserData as UserType,
            })
        );
    };
    


    const returnSpecificUser = (userId: string): UserType | null => {
        const user = users.find((user) => user._id === userId);
        return user || null;
    };
    

    useEffect(()=>{
        fetch(`http://localhost:5173/users`)
         .then(res => res.json())
         .then(data => dispatch({
            type: 'setData',
            data: data
         }))
    }, []);
  
    return (
        <UsersContext.Provider
          value={{
            users,
            logInUser,
            logOutUser,
            loggedInUser,
            addNewUser,
            returnSpecificUser,
            editSpecificUser
          }}
        >
        {children}</UsersContext.Provider>
    )
}
export { UsersProvider}
export default UsersContext;
  
