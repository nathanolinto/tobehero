import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 50px;
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

export const Contact = styled.div`
    width: 100%;
    color: #737380;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 24px;
    padding-bottom: 10px;
    font: 400 18px Roboto, sans-serif;
    position: relative;
    margin-top: 30px;

    h2 {
        font-size: 20px;
        line-height: 30px;
        color:#13131A;
    }

    p {
        margin: 20px 0 ;
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 15px;

        div, a{
            text-decoration: none;
            display: flex;
            width: 100%;
        }
    }
`;
