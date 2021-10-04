import styled from "styled-components";

interface StyledInputProps {
    error?: boolean ;
}

export const StyledInput = styled.input<StyledInputProps>`
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid ;
    border-color: ${(p) => p.error ? "#E02041" : "#dcdce6"};
    border-radius: 8px;
    padding: 0 24px;
    font: 400 18px Roboto, sans-serif;

    
`;