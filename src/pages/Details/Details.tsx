import { Container, Contact } from "./Details.styled";
import Header from "../../componets/Header";
import Card from "../../componets/Card";
import Button from "../../componets/Button";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory, useParams } from "react-router";
import { useIncidentById } from "../../hooks/useIncidents";
import { getOngById } from "../../hooks/useOngs";
import { useEffect, useState } from "react";

interface ParamTypes {
    id: string;
}

type IOng = {
    id: string;
    name: string;
    email: string;
    whatsApp: string;
    city: string;
    uf: string;
} | undefined

type IIncidentOng = {
    id: string;
    title: string;
    description: string;
    value: string;
    ong: IOng;
} | undefined;

export function Details() {
    const history = useHistory();
    const { id } = useParams<ParamTypes>();

    function handleBacktoHome() {
        history.push("/");
    }

    const incident = useIncidentById(id);

    // const { getIncidentById } = useIncidents();
    // const { getOngs } = useOngs();
    const [incidentOng, setIncidentOng] = useState<IIncidentOng | undefined>();
    // const [ong, setOng] = useState<IOng>();

    useEffect(() => {
        async function fetchData() {
            const tempIcident = incident.data;
            const tempOngs = await getOngById(String(tempIcident?.ongId));

            const parsedIncident = {
                id: String(tempIcident?.id),
                title: String(tempIcident?.title),
                description: String(tempIcident?.description),
                value: String(tempIcident?.value),
                ong: tempOngs
            }
            setIncidentOng(parsedIncident);
        }
        fetchData();


    }, [incident.data]);

    function handleWhatsApp() {
        //https://api.whatsapp.com/send?phone=
    }
    function handleEmail() {
        //Email 
    }

    return (
        <Container>
            <Header>
                <Button
                    secondary
                    style={{ width: "70px", marginLeft: "15px" }}
                    onClick={handleBacktoHome}
                >
                    <FiArrowLeft size={18} color="#E02041" />
                </Button>
            </Header>

            {incidentOng &&
                <Card item={incidentOng} />
            }

            {incidentOng &&
                <Contact>
                    <h2>Salve o dia!</h2>
                    <h2>Seja o herói desse caso.</h2>
                    <p>entre em contato: </p>

                    <div>
                        <div>
                            <a target="_blank" href={`https://api.whatsapp.com/send?phone=${incidentOng.ong?.whatsApp}`}>
                                <Button onClick={handleWhatsApp}>WhatsApp</Button>
                            </a>
                        </div>
                        <div>
                            <Button onClick={handleEmail}>E-mail</Button>
                        </div>
                    </div>
                </Contact>
            }

        </Container>
    )
}
