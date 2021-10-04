import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        margin-top: 100px;
        font-size: 32px;
        margin-bottom: 32px;
    }

    p {
        line-height: 32px;
        color: #737380;
        font-size: 18px;
    }

    input {
        margin-bottom: 15px;
    }

    .address {
        display: flex ;
        justify-content: space-between;

        .city {
            flex: 5;
        }

        .uf {
            flex: 1;
            padding-left: 15px;
        }
    }
`;

interface StyledSelectProps {
    error?: boolean ;
}

export const StyledSelect = styled.select<StyledSelectProps>`
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid ;
    border-color: ${(p) => p.error ? "#E02041" : "#dcdce6"};
    border-radius: 8px;
    padding: 0 18px;
    font: 400 18px Roboto, sans-serif;
`

