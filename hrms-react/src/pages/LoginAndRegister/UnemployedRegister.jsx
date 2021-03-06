import React from 'react'
import { Header, Form, Segment, Button, Checkbox, Message, Label } from 'semantic-ui-react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import HandleActiveMenuItem from '../../utils/HandleActiveMenuItem'
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';

export default function UnemployedRegister() {

    HandleActiveMenuItem()
    const history = useHistory()

    const initialValues = {
        firstName: "",
        lastName: "",
        nationalityId: "",
        birthDate: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: "",
    }
    const schema = yup.object({
        firstName: yup.string().required("First name field cannot be empty."),
        lastName: yup.string().required("Last name field cannot be empty."),
        nationalityId: yup.string().length(11, "Nationality ID must be 11 characters.").required("Nationality ID field cannot be empty."),
        birthDate: yup.date().required("Birth date field cannot be empty."),
        phoneNumber: yup.string().required("Phone number field cannot be empty."),
        email: yup.string().email("Invalid email.").required("Email field cannot be empty."),
        password: yup.string().required("Password field cannot be empty."),
        confirmPassword: yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false), then: yup.string().oneOf(
                [yup.ref("password")], "Both password need to be the same.")
        }).required("Confirm password field cannot be empty."),
        agree: yup.bool().oneOf([true], "You must accept the terms of use.")
    })

    let authService = new AuthService()

    const onSubmit = (values) => {
        authService.registerUnemployed(values.confirmPassword, values).then((result) => {
            toast.success(result.data.message)
            history.push("/")
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }
    return (

        <div className="pages" style={{ paddingLeft: "1em", paddingRight: "1em" }}>
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ values, errors, handleChange, handleSubmit, touched }) => (
                    <React.Fragment>
                        <Header className="registerHeader" textAlign="center" content="Hayallerindeki i??i bulmak i??in hemen hesab??n?? olu??tur." />
                        <Form onSubmit={handleSubmit}>
                            <Segment stacked piled style={{ borderRadius: "10px/10px" }}>

                                {/* First Name and Last Name Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="add user" iconPosition="left" placeholder="Ad"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.firstName && touched.firstName && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.firstName} />
                                    </Message>
                                )}

                                <Form.Field>
                                    <Form.Input fluid icon="add user" iconPosition="left" placeholder="Soyad"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.lastName && touched.lastName && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.lastName} />
                                    </Message>
                                )}

                                {/* Naitonality Id Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="id card" iconPosition="left" placeholder="T.C Kimlik Numaras??"
                                        name="nationalityId"
                                        value={values.nationalityId}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.nationalityId && touched.nationalityId && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.nationalityId} />
                                    </Message>
                                )}

                                {/* Birth Date Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="birthday" iconPosition="left" type="date"
                                        name="birthDate"
                                        value={values.birthDate}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.birthDate && touched.birthDate && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.birthDate} />
                                    </Message>
                                )}

                                {/* Phone Number Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="phone" iconPosition="left" placeholder="Telefon Numaras??"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.phoneNumber && touched.phoneNumber && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.phoneNumber} />
                                    </Message>
                                )}

                                {/* Email Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="at" iconPosition="left" placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.email && touched.email && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.email} />
                                    </Message>
                                )}

                                {/* Password and Confirm Password Validation */}
                                <Form.Field>
                                    <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="??ifre"
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

                                <Form.Field>
                                    <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="??ifreyi Onayla"
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange} />
                                </Form.Field>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <Message className="errorMessage" negative size="tiny">
                                        <Message.Content content={errors.confirmPassword} />
                                    </Message>
                                )}

                                {/* Terms of Use Validation */}
                                <Form.Field>
                                    <Checkbox label=" ' H??k??mleri ve Ko??ullar?? Kabul Ediyorum ' "
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

                                <Button size="large" compact fluid icon="coffee" labelPosition="right" content="Kay??t Ol!"
                                    type="submit"
                                    disabled={!values.agree}
                                    style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", color: "white", borderRadius: "10px/10px", letterSpacing: "1px" }} />
                                <Label className="registerLabel" as={Link} to="/employerRegister"
                                    content="???? veren olarak kay??t olmak i??in buraya t??klay??n." />
                            </Segment>
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </div>
    )
}