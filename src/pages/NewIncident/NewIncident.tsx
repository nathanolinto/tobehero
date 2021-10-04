import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { Container, StyledTextarea } from "./NewIncident.styled";

import Input from "../../componets/Input"
import Button from "../../componets/Button";

import LogoImg from "../../assets/Logo.png";
import { useAuth } from '../../hooks/useAuth';
import { newIncident } from '../../hooks/useIncidents';

import { successNotify, errorNotify } from "../../hooks/useToast";

interface IValidate {
    title?: string;
    description?: string;
    value?: string;
}

const validate = (values: IValidate) => {
    const errors: IValidate = {};
    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.description) {
        errors.description = 'Required';
    }

    if (!values.value) {
        errors.value = 'Required';
    }

    return errors;
}


export function NewIncident() {
    const history = useHistory();
    const { user } = useAuth();
    // const { newIncident } = useIncidents();   

    if (!user) {
        history.push("/login");
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            value: ''
        },
        validate,
        onSubmit: async values => {
            try {
                await newIncident({
                    title: values.title,
                    description: values.description,
                    value: values.value,
                    ongId: user?.id
                });
                successNotify(`Incidente cadastrado`);
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
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={20} color="#E02041" />
                    Voltar para profile
                </Link>
            </section>
            <div className="">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Título do caso"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.errors.title ? true : false}
                    />
                    <StyledTextarea
                        id="description"
                        name="description"
                        placeholder="Descrição"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description ? true : false}
                    />
                    <Input
                        id="value"
                        name="value"
                        type="text"
                        placeholder="Valor em reais"
                        value={formik.values.value}
                        onChange={formik.handleChange}
                        error={formik.errors.value ? true : false}
                    />
                    <Button type="submit">Cadastrar</Button>
                </form>
            </div>
        </Container>
    )
}
