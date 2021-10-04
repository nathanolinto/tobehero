import { Container } from "./Profile.styled"
import Header from "../../componets/Header";
import Card from "../../componets/Card";
import Button from "../../componets/Button";
import { FiPower } from 'react-icons/fi';
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useIncidentsByOngId, removeIncident } from "../../hooks/useIncidents";

export function Profile() {
    const history = useHistory();
    const { user, signout } = useAuth();

    if (!user) {
        history.push("/login");
    }

    const { data, refetch} = useIncidentsByOngId(String(user?.id));

    function handleNewIncident() {
        history.push("/incidents/new");
    }

    async function handleRemoveIncident(id:string){
        await removeIncident(id);
        await refetch();
    }

    return (
        <Container>
            <Header ong={user?.name}>
                <Button
                    onClick={handleNewIncident}
                >
                    Cadastrar novo caso
                </Button>
                <Button
                    secondary
                    style={{ width: "70px", marginLeft: "15px" }}
                    onClick={signout}
                >
                    <FiPower size={18} color="#E02041" />
                </Button>
            </Header>

            <h1>Casos cadastrados</h1>

            <ul>
                {data && data?.map((item) => (
                    <li key={item?.id}>
                        <Card 
                            item={item} 
                            profile 
                            removeItem={handleRemoveIncident}
                        />
                    </li>
                ))}

            </ul>
        </Container>
    )
}
