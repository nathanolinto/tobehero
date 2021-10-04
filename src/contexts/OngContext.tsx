import { createContext, ReactNode, useEffect, useState } from "react";
import { database, push, ref, set, get } from "../services/firebase";

interface IOng {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    whatsApp: string | undefined;
    city: string | undefined;
    uf: string | undefined;
}

interface OngContextType {
    ongs: IOng[] | undefined;
    getOngByName: (name: string) => Promise<IOng | undefined>;
    getOngById: (id: string) => Promise<IOng | undefined>;
    newOng: ({ name, email, whatsApp, city, uf }: newOngProps) => Promise<IOng | undefined>;
}

interface OngContextProviderProps {
    children: ReactNode;
}

type FirebaseOngs = Record<string, {
    name: string;
    email: string;
    whatsApp: string;
    city: string;
    uf: string;
}>

interface newOngProps {
    name: string;
    email: string;
    whatsApp: string;
    city: string;
    uf: string;
}


export const OngContext = createContext({} as OngContextType);

export function OngContextProvider(props: OngContextProviderProps) {
    const [ongs, setOngs] = useState<IOng[]>();

    useEffect(() => {
        async function fetchOngs() {
            await getOngs();
        }
        fetchOngs()
        
    }, [])

    async function getOngs() {
        const ongListRef = ref(database, "ongs");
        const value = await get(ongListRef);

        const databaseOngs = value.val();
        const firebaseOng: FirebaseOngs = databaseOngs ?? {};
        const parsedOngs = Object.entries(firebaseOng).map(([key, value]) => {
            return {
                id: key,
                name: value.name,
                email: value.email,
                whatsApp: value.whatsApp,
                city: value.city,
                uf: value.uf
            };
        });

        setOngs(parsedOngs);
        return parsedOngs;
    }

    async function getOngByName(name: string) {
        const tempOngs = await getOngs();
        const ongIndex = tempOngs.findIndex(ong => ong.name === name);
        if (ongIndex !== -1) {
            return tempOngs[ongIndex];
        }
        return undefined;
    }

    async function getOngById(id: string) {
        const tempOngs = await getOngs();
        const ongIndex = tempOngs.findIndex(ong => ong.id === id);
        if (ongIndex !== -1) {
            return tempOngs[ongIndex];
        }
        return undefined;
    }

    async function newOng({ name, email, whatsApp, city, uf }: newOngProps) {
        const ong = await getOngByName(name);
        if (ong) {
            throw new Error("Ong já Existe");
        }
        const ongListRef = ref(database, "ongs");
        const newOrgRef = push(ongListRef);
        await set(newOrgRef, {
            name,
            email,
            whatsApp,
            city,
            uf
        });

        const newOng = await getOngByName(name);
        return newOng;
    }


    return (
        <OngContext.Provider value={{ ongs, getOngByName, getOngById, newOng }} >
            {props.children}
        </OngContext.Provider>
    );
}