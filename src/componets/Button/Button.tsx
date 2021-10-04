import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    secondary?: boolean
}

export function Button({ children, secondary, ...rest }: ButtonProps) {
    return (
        <StyledButton secondary={secondary} {...rest}>
            {children}
        </StyledButton>
    )
}
