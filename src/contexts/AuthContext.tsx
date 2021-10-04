import { createContext, ReactNode, useState } from "react";

import { getOngById, newOng } from "../hooks/useOngs";
// import { getOngById, newOng } from "../hooks/useOngs";

interface IUser {
    id: string;
    name: string;
}

interface OngContextType {
    user: IUser | undefined;
    signin: (id: string) => Promise<IUser>;
    signup: ({ name, email, whatsApp, city, uf }: newOngProps) => Promise<IUser>;
    signout: () => void;
}

interface OngContextProviderProps {
    children: ReactNode;
}

interface newOngProps {
    name: string;
    email: string;
    whatsApp: string;
    city: string;
    uf: string;
}

export const AuthContext = createContext({} as OngContextType);

export function AuthContextProvider(props: OngContextProviderProps) {
    const [user, setUser] = useState<IUser | undefined>();

    async function signin(id: string) {
        const existUser = await getOngById(id);
        if (!existUser) {
            throw new Error("Usuário não Encontrado");
        }
        setUser(existUser);
        return existUser;
    }

    async function signup({ name, email, whatsApp, city, uf }: newOngProps) {
        const existUser = await newOng({ name, email, whatsApp, city, uf });
        if (!existUser) {
            throw new Error("Usuário já cadastrado");
        }
        setUser(existUser);
        return existUser;
    }

    function signout() {
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signup, signout }} >
            {props.children}
        </AuthContext.Provider>
    );
}