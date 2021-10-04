import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 32px;
        margin-bottom: 15px;
    }

    p {
        font-size: 20px;
        color: #737380;
        margin-bottom: 32px;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        list-style: none;
    }
`;