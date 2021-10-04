import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { useAuth } from '../../hooks/useAuth';
import { Container } from "./Login.styled";

import { successNotify, errorNotify } from "../../hooks/useToast";

import Input from "../../componets/Input"
import Button from "../../componets/Button";

import PessoasImg from "../../assets/Pessoas.png";
import LogoImg from "../../assets/Logo.png";

interface IValidate {
    ongId?: string;
}

const validate = (values: IValidate) => {
    const errors: IValidate = {};
    if (!values.ongId) {
        errors.ongId = 'Required';
    }
    return errors;
}

export function Login() {
    const history = useHistory();
    const { signin } = useAuth();


    const formik = useFormik({
        initialValues: {
            ongId: '',
        },
        validate,
        onSubmit: async values => {
            try {
                const existUser = await signin(values.ongId);
                successNotify(`Olá ${existUser?.name}`);
                history.push("/profile");
            } catch (e) {
                const result = (e as Error).message;
                errorNotify(result);
            }
        },
    });

    return (
        <Container>
            <section className="">
                <img src={LogoImg} alt="" />

                <h1>Faça seu logon</h1>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="ongId"
                        name="ongId"
                        type="text"
                        placeholder="Sua ID"
                        value={formik.values.ongId}
                        onChange={formik.handleChange}
                        error={formik.errors.ongId ? true : false}
                    />
                    <Button type="submit">Entrar</Button>
                </form>
                <Link className="back-link" to="/register">
                    <FiLogIn size={20} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </section>
            <div className="">
                <img src={PessoasImg} alt="" />
            </div>
        </Container>
    )
}
