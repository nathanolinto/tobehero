import styled from "styled-components";

export const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 50px;

    div {
        display: flex;
        align-items: center;

        img {
            height: 60px;
        }

        p {
            font-size: 20px;
            margin-left: 40px;
            margin-bottom: 0px;
        }
    }
`;