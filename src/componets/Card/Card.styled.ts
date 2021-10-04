import styled from "styled-components";

export const CardStyled = styled.div`
    width: 100%;
    color: #737380;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 24px;
    padding-bottom: 10px;
    font: 400 18px Roboto, sans-serif;
    position: relative;

    a {
        text-decoration: none;
    }

    div {
        margin-bottom: 30px;
    }

    .details, .casoOng {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }

    .details {
        p {
            color: #E02041;
        }
        
    }
`;

export const TitleStyled = styled.h3`
    font: 700 14px Roboto, sans-serif;
    color: #41414D;
    margin-bottom: 15px;
    text-transform: uppercase;
`;

export const ButtonStyled = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
`;