
import { database, push, ref, set, get, remove } from "../services/firebase";
import { useQuery } from "react-query";

interface IIncident {
    id: string;
    title: string;
    description: string;
    value: string;
    ongId: string;
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

export async function newIncident({ title, description, value, ongId }: newIncidentProps) {
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

export async function removeIncident(id: string) {
    const incidentRef = ref(database, `incidents/${id}`);
    await remove(incidentRef);
}

async function getIncidents(): Promise<IIncident[]> {
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

    return parsedIncidents;
}

async function getIncidentById(id: string): Promise<IIncident> {
    const incidentListRef = ref(database, `incidents/${id}`);
    const value = await get(incidentListRef);
    const databaseIncident = value.val();
    const parsedIncident = {
        id,
        title: databaseIncident.title,
        description: databaseIncident.description,
        value: databaseIncident.value,
        ongId: databaseIncident.ongId
    };

    return parsedIncident;
}

async function getIncidentsByOngId(ongId: string) {
    const incidents = await getIncidents();
    const filteredIncidents = incidents?.filter(incident => {
        return incident.ongId === ongId;
    });
    return filteredIncidents;
}

export function useIncidentsByOngId(ongId: string) {
    return useQuery(["incidentByOng", ongId], () => getIncidentsByOngId(ongId));
}

export function useIncidentById(id: string) {
    return useQuery(["incidentById", id], () => getIncidentById(id));
}

export function useIncidents() {
    return useQuery("incidents", getIncidents);
}