import { createContext, useReducer, useEffect, useState, ReactNode } from "react";

type ChildrenType = { children: ReactNode}; // Changed ReactElement to ReactNode for broader compatibility

export type UserType = {
    _id: string,
    username: string,
    profileImage: string | null,
    password: string
}

type ReducerActionTypes =
{ type: "getAll", allUsers: UserType[]} |
{ type: "addNewUser", newUser: UserType} 

export type ErrorOrSuccessReturn = { error: string } | { success: string };
export type UsersContextTypes = {
    users: UserType[]; // List of all users
    addNewUser: (user: Omit<UserType, "_id">) => Promise<ErrorOrSuccessReturn>; // Function to add a new user
    loggedInUser: UserType | null; // The currently logged-in user
    logUserIn: (userLoginInfo: Pick<UserType, "username" | "password">) => Promise<ErrorOrSuccessReturn>,
    logout: () => void
  }

const reducer = (state: UserType[], action: ReducerActionTypes): UserType[] => {
    switch(action.type){
        case 'getAll':
            return action.allUsers;
        case 'addNewUser':
            return [...state, action.newUser]; 
        default:
            return state;        
    }
} 
const UsersContext = createContext<UsersContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildrenType) => {

  const [users, setUsers] = useReducer(reducer, []);
  const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);

    const addNewUser = async (user: Omit<UserType, "_id">): Promise<ErrorOrSuccessReturn> => {
      try{
        const response = await fetch("http://localhost:5500/users", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user),
        });
         // console.log(res); // res su status ir kitais
      if(response.status === 409){ // vartotojas įvedė panaudotą username arba email
        const errMsg = await response.json();
        // console.log(errMsg, 'error');
        return errMsg;
      } else {
        const data = await response.json();
        // console.log(data, 'sekme');
        setUsers({
          type: 'addNewUser',
          newUser: data
        });
        setLoggedInUser(data);
        return { success: 'Sėkmingai prisiregistruota' };
      }
    } catch(err) {
      console.error(err);
      return { error: 'Bandant atsiūsti duomenis, įvyko serverio klaida. Prašome bandyti vėliau.' };
    } 
      };
      


      const logUserIn = async (userLoginInfo: Pick<UserType, 'username' | 'password'>): Promise<ErrorOrSuccessReturn> => {
        try {
          // console.log(userLoginInfo);
          const res = await fetch(`http://localhost:5500/login`, {
            method: "POST",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify(userLoginInfo)
          });
          console.log(res);
          if(res.status === 401){ // neteisingos prisijungimo įvestys
            const error = await res.json();
            // console.log(error);
            return error;
          } else { // teisingos prisijungimo įvestys
            const data = await res.json();
            console.log(data);
            setLoggedInUser(data);
            return { success: 'Prisijungimas sėkmingas. Tuoj būsite nukelti į Profile puslapį.' }
          }
        } catch(err) {
          console.error(err);
          return { error: 'Bandant prisijungti, įvyko serverio klaida. Prašome bandyti vėliau.' };
        }
      }
      
      const logout = () => {
        setLoggedInUser(null);
      }  
    //  const getSpecificUser = (_id: string): UserType | null => users.find((user) => user._id === _id) || null;
    

     useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:5500/users");
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
            addNewUser,
            loggedInUser,
            logUserIn,
            logout
             }}
        >
        {children}</UsersContext.Provider>
    )
}
export { UsersProvider}
export default UsersContext;
  
