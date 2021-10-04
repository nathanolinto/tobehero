import { createContext, ReactNode, useEffect, useState } from "react";
import { database, push, ref, set, get, remove } from "../services/firebase";

interface IIncident {
    id: string;
    title: string;
    description: string;
    value: string;
    ongId: string;
}

interface incidentContextType {
    incidents: IIncident[] | undefined;
    getIncidentById: (id: string) => Promise<IIncident | undefined>;
    newIncident: ({ title, description, value, ongId }: newIncidentProps) => Promise<void>;
    removeIncident: (id:string) => Promise<void>;
    getIncidentsByOngId: (ongId:string) => IIncident[] | undefined;
}

interface IncidentContextProviderProps {
    children: ReactNode;
}

type FirebaseIncidents = Record<string, {
    title: string;
    description: string;
    value: string;
    ongId: string;
}>

interface newIncidentProps {
    title: string;
    description: string;
    value: string;
    ongId: string | undefined;
}


export const IncidentContext = createContext({} as incidentContextType);

export function IncidentContextProvider(props: IncidentContextProviderProps) {
    const [incidents, setIncidents] = useState<IIncident[]>();

    useEffect(() => {
        async function fetchIncidents() {
            await getIncidents();
        }
        fetchIncidents()

    }, [])

    async function getIncidents() {

        const incidentListRef = ref(database, "incidents");
        const value = await get(incidentListRef);

        const databaseIncidents = value.val();
        const firebaseIncident: FirebaseIncidents = databaseIncidents ?? {};
        const parsedIncidents = Object.entries(firebaseIncident).map(([key, value]) => {
            return {
                id: key,
                title: value.title,
                description: value.description,
                value: value.value,
                ongId: value.ongId
            };
        });

        setIncidents(parsedIncidents);
        return parsedIncidents;
    }

    async function getIncidentById(id: string) {
        const tempIncidents = await getIncidents();
        const incidentIndex = tempIncidents.findIndex(incident => incident.id === id);
        if (incidentIndex !== -1) {
            return tempIncidents[incidentIndex];
        }
        return undefined;
    }

    function getIncidentsByOngId(ongId: string) {
        const filteredIncidents = incidents?.filter( incident => {
            return incident.ongId === ongId 
        });
        return filteredIncidents;
    }

    async function newIncident({ title, description, value, ongId }: newIncidentProps) {
        const incidentListRef = ref(database, "incidents");
        const newIncidentRef = push(incidentListRef);
        await set(newIncidentRef, {
            title,
            description,
            value,
            ongId
        });
        await getIncidents();
    }

    async function removeIncident(id: string) {
        const incidentRef = ref(database, `incidents/${id}`);
        await remove(incidentRef);
        await getIncidents();
    }


    return (
        <IncidentContext.Provider value={{ incidents, getIncidentById, newIncident, removeIncident, getIncidentsByOngId }} >
            {props.children}
        </IncidentContext.Provider>
    );
}