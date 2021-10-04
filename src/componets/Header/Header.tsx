import { HeaderStyled } from "./Header.styled";
import LogoImg from "../../assets/Logo.png";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    children?: ReactNode;
    ong?: string;
}

export function Header({ children, ong }: HeaderProps) {
    return (
        <HeaderStyled>
            <div>
                <Link to="/">
                    <img src={LogoImg} alt="Logo" />
                </Link>
                {ong && <p>Bem vindo, {ong}</p>}
            </div>
            <div>
                {children}
            </div>
        </HeaderStyled>
    )
}
