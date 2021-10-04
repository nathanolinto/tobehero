import { InputHTMLAttributes } from "react";
import { StyledInput } from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: boolean;
}

export function Input({error, ...rest}:InputProps) {
    return (
        <StyledInput error={error} {...rest} />
    )
}
