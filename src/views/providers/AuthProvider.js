import { createContext, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const defaultAuthProvider = {
    userData: null,
    token: null,
    handleGenerateToken: async() => {},
    handleRemoveUserFromFirebase: async() => {},
    setUserData: () => {}
};

export const AuthContext = createContext(defaultAuthProvider);

export function AuthProvider({children}) {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);

    const handleGenerateToken = async() => {
        const currentUser = auth.currentUser;

        if(currentUser){
            try{
                const jwtToken = await currentUser.getIdToken();
                setToken(jwtToken);
            }
            catch(e){
                console.log("erro: ", e)
            }
        }
    };

    const handleRemoveUserFromFirebase = async(id) => {
        // const currentUser = auth.currentUser;

        // if(currentUser){
        //     try{
        //         await currentUser.delete();
        //         await signOut(auth);
        //     }
        //     catch(e){
        //         console.log("erro: ", e)
        //     }
        // }
    };

    return (
        <AuthContext.Provider
        value={{
            userData,
            token,
            handleGenerateToken,
            handleRemoveUserFromFirebase,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    );
}