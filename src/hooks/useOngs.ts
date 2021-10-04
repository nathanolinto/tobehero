
import { database, push, ref, set, get } from "../services/firebase";
import { useQuery } from "react-query";

// interface IOng {
//     id: string;
//     name: string;
//     email: string;
//     whatsApp: string;
//     city: string;
//     uf: string;
// }

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

export async function getOngs() {
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
    return parsedOngs;
}

export async function getOngById(id: string) {
    const ongRef = ref(database, `ongs/${id}`);
    const value = await get(ongRef);
    const databaseOng = value.val();

    if (databaseOng) {
        return {
            id,
            name: String(databaseOng.name),
            email: String(databaseOng.email),
            whatsApp: String(databaseOng.whatsApp),
            city: String(databaseOng.city),
            uf: String(databaseOng.uf)
        }
    } 
}

async function getOngByName(name: string) {
    const tempOngs = await getOngs();
    const ongIndex = tempOngs.findIndex(ong => ong.name === name);
    if (ongIndex !== -1) {
        return tempOngs[ongIndex];
    }
    return undefined;
}

export async function newOng({ name, email, whatsApp, city, uf }: newOngProps) {
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

export function useOngById(id: string) {
    return useQuery(["ongById", id], () => getOngById(id));
}

export function useOngs() {
    return useQuery("ongs", getOngs);
}


// export async function getOngs() {
//     const ongListRef = ref(database, "ongs");
//     const value = await get(ongListRef);

//     const databaseOngs = value.val();
//     const firebaseOng: FirebaseOngs = databaseOngs ?? {};
//     const parsedOngs = Object.entries(firebaseOng).map(([key, value]) => {
//         return {
//             id: key,
//             name: value.name,
//             email: value.email,
//             whatsApp: value.whatsApp,
//             city: value.city,
//             uf: value.uf
//         };
//     });
//     return parsedOngs;
// }

// export async function getOngById(id: string) {
//     const Ongs = await getOngs();
//     const ongIndex = Ongs.findIndex(ong => ong.id === id);
//     if (ongIndex !== -1) {
//         return Ongs[ongIndex];
//     }
//     return undefined;
// }

// async function getOngByName(name: string) {
//     const tempOngs = await getOngs();
//     const ongIndex = tempOngs.findIndex(ong => ong.name === name);
//     if (ongIndex !== -1) {
//         return tempOngs[ongIndex];
//     }
//     return undefined;
// }

// export async function newOng({ name, email, whatsApp, city, uf }: newOngProps) {
//     const ong = await getOngByName(name);
//     if (ong) {
//         throw new Error("Ong já Existe");
//     }
//     const ongListRef = ref(database, "ongs");
//     const newOrgRef = push(ongListRef);
//     await set(newOrgRef, {
//         name,
//         email,
//         whatsApp,
//         city,
//         uf
//     });

//     const newOng = await getOngByName(name);
//     return newOng;
// }