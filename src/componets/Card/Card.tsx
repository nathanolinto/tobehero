import { Link } from 'react-router-dom';
import { CardStyled, TitleStyled, ButtonStyled } from "./Card.styled";
import { FiTrash2, FiArrowRight } from 'react-icons/fi';
import Button from "../Button";
import { successNotify, errorNotify } from "../../hooks/useToast";

interface CardProps{
    item: {
        id: string;
        title: string;
        description: string;
        value: string;
        ong?: {
            name: string;
        }
    };
    details?: boolean;
    profile?: boolean;
    removeItem?: (id:string) => Promise<void>;
};

export function Card({ item, details, profile, removeItem }: CardProps) {
    async function handleRemove(id:string){
        try {
            if(removeItem !== undefined){
                await removeItem(id);
            }
            successNotify(`Incidente removido`);
        } catch (e) {
            const result = (e as Error).message;
            errorNotify(result);
        }
        
    }

    return (
        <CardStyled>
            {profile &&
                <ButtonStyled>
                    <Button 
                        secondary 
                        onClick={() => handleRemove(item.id)}
                    >
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </Button>
                </ButtonStyled>
            }
            <div className="casoOng">
                <div>
                    <TitleStyled>Caso:</TitleStyled>
                    <p>{item.title}</p>
                </div>
                {item.ong?.name &&
                    <div style={{ width: "80px" }}>
                        <TitleStyled>Ong:</TitleStyled>
                        <p>{item.ong.name }</p>
                    </div>
                }
            </div>

            {item.description &&
                <div>
                    <TitleStyled>Descrição</TitleStyled>
                    <p>{item.description}</p>
                </div>
            }

            <div>
                <TitleStyled>Valor:</TitleStyled>
                <p>{item.value}</p>
            </div>

            {details &&
                <Link to={`/${item.id}`}>
                    <div className="details">
                        <p>Ver mais detalhes</p>
                        <FiArrowRight size={20} color="#E02041" />
                    </div>
                </Link>
            }
        </CardStyled>
    );
}
