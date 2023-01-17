import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthContextProviderProps){
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

    async function userAndTokenUpdate(userData: UserDTO, token: string){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userData)
    }

    async function storageAndUserTokenSave(userData: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true)
            await storageUserSave(user)
            await storageAuthTokenSave(token)
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function signIn(email: string, password: string) {
        try{
            setIsLoadingUserStorageData(true)

            const { data } = await api.post("/sessions", {email, password})
            if (data.user && data.token) {
                storageAndUserTokenSave(data.user, data.token)

                userAndTokenUpdate(data.user, data.token)
    
            }
        }catch(error){
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function loadStorageUserData() {
        try{
            setIsLoadingUserStorageData(true)
            const userLogged = await storageUserGet()
            const token = await storageAuthTokenGet()
            if(token && userLogged){
                userAndTokenUpdate(userLogged, token)
                setIsLoadingUserStorageData(false)
            }
        }catch(error){
            throw error
        }finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true)
            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    useEffect(() => {
        loadStorageUserData()
    },[])

    return (
        <AuthContext.Provider value={{ user, signIn,signOut, isLoadingUserStorageData}}>
            {children}
      </AuthContext.Provider>
    )
}