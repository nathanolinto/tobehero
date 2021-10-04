import styled from "styled-components";

interface StyledButtonProps {
    secondary?: boolean ;
}

export const StyledButton = styled.button<StyledButtonProps>`
    width: 100%;
    height: 60px;
    border-radius: 8px;
    display: inline-block;
    padding: 0 25px;
    font-weight: bold;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: filter 0.2s;

    color:  ${(p) => p.secondary ? "#41414D" :  "#FFFFFF"};
    background-color: ${(p) => p.secondary ? "transparent" :  "#E02041"};
    border:  ${(p) => p.secondary ? "1.5px solid #DCDCE6;" :  "0"};

    &:hover{
        filter: brightness(0.9);
    }
`;