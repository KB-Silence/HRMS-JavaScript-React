import React from 'react'
import { Header, Form, Segment, Button, Checkbox, Message } from 'semantic-ui-react'
import { Formik } from 'formik';
import * as yup from 'yup';
import HandleActiveMenuItem from '../../utils/HandleActiveMenuItem'
import AuthService from '../../services/AuthService'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function EmployerRegister() {

    HandleActiveMenuItem()
    const history = useHistory()

    const initialValues = {
        companyName: "",
        webSite: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        agree: false
    }
    const schema = yup.object({
        companyName: yup.string().required("Company name field cannot be empty."),
        webSite: yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!')
            .required("Web site field cannot be empty."),
        email: yup.string().email("Invalid email.").required("Email field cannot be empty."),
        phoneNumber: yup.string().required("Phone number field cannot be empty."),
        password: yup.string().required("Password field cannot be empty."),
        confirmPassword: yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false), then: yup.string().oneOf(
                [yup.ref("password")], "Both password need to be the same.")
        }).required("Confirm password field cannot be empty."),
        agree: yup.bool().oneOf([true], "You must accept the terms of use.")
    })

    let authService = new AuthService()

    const onSubmit = (values) => {
        authService.registerEmployer(values.confirmPassword, values).then((result) => {
            toast.success(result.data.message)
            history.push("/")
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <div className="pages employerRegister"
            style={{ paddingLeft: "1em", paddingRight: "1em" }}>
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values, errors, handleChange, handleSubmit, touched }) => (
                    <React.Fragment>
                        <Header className="registerHeader" textAlign="center" content="Create your account to find qualified employees now."
                            style={{ color: "#404040" }} />
                        <Form onSubmit={handleSubmit}>
                            <Segment stacked piled style={{ borderRadius: "10px/10px" }}>

                                {/* Company Name Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="user" iconPosition="left" placeholder="Company Name"
                                        name="companyName"
                                        value={values.companyName}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.companyName && touched.companyName && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.companyName} />
                                    </Message>
                                )}

                                {/* Web Site Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="sitemap" iconPosition="left" placeholder="Web Site Address"
                                        name="webSite"
                                        value={values.webSite}
                                        onChange={handleChange}
                                    />
                                </Form.Field>
                                {errors.webSite && touched.webSite && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.webSite} />
                                    </Message>
                                )}

                                {/* E-mail Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="at" iconPosition="left" placeholder="E-mail Address"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        type="email" />
                                </Form.Field>
                                {errors.email && touched.email && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.email} />
                                    </Message>
                                )}

                                {/* Phonu Number Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="phone" iconPosition="left" placeholder="Phone Number"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.phoneNumber && touched.phoneNumber && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.phoneNumber} />
                                    </Message>
                                )}

                                {/* Password and Confrim Password Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        type="password" />
                                </Form.Field>
                                {errors.password && touched.password && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.password} />
                                    </Message>
                                )}

                                <Form.Field>
                                    <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        type="password" />
                                </Form.Field>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.confirmPassword} />
                                    </Message>
                                )}

                                {/* Terms of Use Validation */}
                                <Form.Field>
                                    <Checkbox label=" ' I agree to the Terms and Conditions ' "
                                        id="agree"
                                        onChange={handleChange}
                                        style={{ fontWeight: "bold" }}
                                        type="checkbox" />
                                </Form.Field>
                                {errors.agree && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.agree} />
                                    </Message>
                                )}

                                <Button size="large" compact fluid icon="coffee" labelPosition="right" content="Let's Start"
                                    type="submit"
                                    disabled={!values.agree}
                                    style={{
                                        background: "linear-gradient(to right, #11998e, #38ef7d)",
                                        color: "white", borderRadius: "10px/10px"
                                    }} />
                            </Segment>
                        </Form>
                    </React.Fragment>
                )
                }
            </Formik>
        </div >
    )
}
