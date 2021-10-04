import { Container } from "./Home.styled";
import Header from "../../componets/Header";
import Card from "../../componets/Card";
import { useIncidents } from "../../hooks/useIncidents";
import { useEffect, useState } from "react";
import { getOngs } from "../../hooks/useOngs";

interface IOng {
    id: string;
    name: string;
    email: string;
    whatsApp: string;
    city: string;
    uf: string;
}

type IIncidentOng = {
    id: string;
    title: string;
    description: string;
    value: string;
    ong: IOng;
} | undefined;

export function Home() {
    const Incidents = useIncidents();
    // const { getOngs } = useOngs();
    const [incidentsOng, setIncidentsOng] = useState<IIncidentOng[]>();

    useEffect(() => {
        async function fetchData() {
            const tempIcidents = Incidents.data;
            const tempOngs = await getOngs();
            const parsedIncidents = tempIcidents?.map((incident) => {
                const ongIndex = tempOngs.findIndex(ong => ong.id === incident.ongId);
                if (ongIndex !== -1) {
                    return {
                        id: incident.id,
                        title: incident.title,
                        description: incident.description,
                        value: incident.value,
                        ong: tempOngs[ongIndex]
                    }
                }
                return undefined;
            })
            parsedIncidents?.reverse();
            setIncidentsOng(parsedIncidents);
        }
        fetchData();

    }, [Incidents]);

    return (
        <Container>
            <Header>
                <p>Total de <span style={{ fontWeight: 700 }}>{incidentsOng?.length} casos</span></p>
            </Header>

            <h1>Bem-vindo!</h1>
            <p>Escolha um dos casos abaixo e salve o dia</p>

            <ul>
                {incidentsOng?.map((item) => (
                    <li key={item?.id}>
                        {item &&
                            <Card item={item} details />
                        }
                    </li>
                ))}
            </ul>

        </Container>
    )
}
