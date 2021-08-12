import React from 'react'
import AuthService from "../../services/AuthService"
import * as yup from 'yup';
import { Grid, Form, Segment, Button, Message, Container } from 'semantic-ui-react'
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/Actions/authActions';
import { toast } from "react-toastify";
import HandleActiveMenuItem from '../../utils/HandleActiveMenuItem'
import { setActive } from '../../store/Actions/naviActions';

export default function Login() {

    HandleActiveMenuItem()

    let authService = new AuthService()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogin = (user) => {
        dispatch(userLogin(user))
    }
    const schema = yup.object({
        email: yup.string().email("Geçersiz mail adresi.").required("Bu alan boş bırakılamaz."),
        password: yup.string().required("Bu alan boş bırakılamaz.")
    })
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = (values) => {
        authService.login(values).then((result) => {
            handleLogin(result.data.data)
            toast.success(result.data.message)
            history.push("/")
            dispatch(setActive("home"))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <div className="pages">
            <Container fluid style={{ height: "auto", minHeight: "100vh" }}>
                <Grid className="loginPage" textAlign="center" verticalAlign="middle">
                    <Grid.Column mobile="16" tablet="12" computer="8">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}>
                            {({ values, errors, handleChange, handleSubmit, touched }) => (
                                <React.Fragment>
                                    <Form size="small" onSubmit={handleSubmit}>
                                        <Segment stacked piled style={{ borderRadius: "10px/10px" }}>
                                            <Form.Field>
                                                <Form.Input fluid icon="mail" iconPosition="left" placeholder="Email Adresi"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange} />
                                            </Form.Field>
                                            {errors.email && touched.email && (
                                                <Message className="errorMessage" negative size="tiny">
                                                    <Message.Content content={errors.email} />
                                                </Message>
                                            )}
                                            <Form.Field>
                                                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Şifre"
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange} />
                                            </Form.Field>
                                            {errors.password && touched.password && (
                                                <Message className="errorMessage" negative size="tiny">
                                                    <Message.Content content={errors.password} />
                                                </Message>
                                            )}
                                            <Button size="large" compact fluid icon="check" labelPosition="right" content="Giriş Yap"
                                                type="submit"
                                                style={{ background: "linear-gradient(to left, #1affba, #aa3a38)", color: "white", borderRadius: "10px/10px" }} />
                                        </Segment>
                                    </Form>
                                </React.Fragment>
                            )}
                        </Formik>
                    </Grid.Column>
                </Grid >
            </Container>
        </div >
    )
}
