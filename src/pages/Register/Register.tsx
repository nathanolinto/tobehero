import { FiArrowLeft  } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { successNotify, errorNotify } from "../../hooks/useToast";

import { Container, StyledSelect } from "./Register.styled";

import Input from "../../componets/Input"
import Button from "../../componets/Button";

import LogoImg from "../../assets/Logo.png";
import { useAuth } from '../../hooks/useAuth';

interface IValidate {
    name?: string;
    email?: string;
    whatsapp?: string;
    city?: string;
    uf?: string;
}

const validate = (values: IValidate) => {
    const errors: IValidate = {};
    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.whatsapp) {
        errors.whatsapp = 'Required';
    }

    if (!values.city) {
        errors.city = 'Required';
    }

    if (!values.uf) {
        errors.uf = 'Required';
    } else if (values.uf.length !== 2) {
        errors.uf = 'Must be 2 characters';
    }
    return errors;
}

const ufs = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export function Register() {
    const history = useHistory();
    const { signup } = useAuth();    

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            whatsapp: '',
            city: '',
            uf: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                const existUser = await signup({ 
                    name: values.name, 
                    email: values.email, 
                    whatsApp: values.whatsapp, 
                    city: values.city, 
                    uf: values.uf 
                }); 
                successNotify(`ONG ${existUser?.name} Cadastrada com sucesso`);
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
                <p>
                    Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
                </p>
                <Link className="back-link" to="/">
                    <FiArrowLeft  size={20} color="#E02041" />
                    Voltar para logon
                </Link>
            </section>
            <div className="">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nome da ONG"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name ? true : false}
                    />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors.email ? true : false}
                    />
                    <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        placeholder="whatsApp"
                        value={formik.values.whatsapp}
                        onChange={formik.handleChange}
                        error={formik.errors.whatsapp ? true : false}
                    />
                    <div className="address">
                        <div className="city">
                            <Input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Cidade"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.errors.city ? true : false}
                            />
                        </div>
                        <div className="uf">
                            <StyledSelect 
                                name="uf" 
                                id="uf" 
                                value={formik.values.uf} 
                                onChange={formik.handleChange}
                                error={formik.errors.uf ? true : false}
                            >
                                <option value="">UF</option>
                                {ufs.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))}
                            </StyledSelect>
                        </div>
                    </div>
                    <Button type="submit">Cadastrar</Button>
                </form>
            </div>
        </Container>
    )
}
