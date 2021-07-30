import React from 'react'
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory()
    return (
        <div className="pages">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column mobile="15" tablet="8" computer="6">
                    <Formik initialValues={{
                        email: "",
                        password: ""
                    }}
                        validationSchema={
                            yup.object({
                                email: yup.string().email("Invalid email").required("Email field cannot be empty."),
                                password: yup.string().required("Password field cannot be empty.")
                            })}
                        onSubmit={(values) => {
                            history.push("/")
                        }}>
                        {({ values, errors, handleChange, handleSubmit, touched }) => (
                            <React.Fragment>
                                <Header textAlign="center" content="Login to your account."
                                    style={{ color: "#404040" }} />
                                <Form size="small" onSubmit={handleSubmit}>
                                    <Segment stacked piled style={{ borderRadius: "10px/10px" }}>
                                        <Form.Field>
                                            <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail Address"
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
                                            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password"
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
                                        <Button size="large" compact fluid icon="check" labelPosition="right" content="Login"
                                            type="submit"
                                            style={{ background: "linear-gradient(to left, #1affba, #aa3a38)", color: "white", borderRadius: "10px/10px" }} />
                                    </Segment>
                                </Form>
                            </React.Fragment>
                        )}
                    </Formik>
                </Grid.Column>
            </Grid>
        </div>
    )
}
