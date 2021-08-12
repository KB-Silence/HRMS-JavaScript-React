import React from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import { Button, Form, Message } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'

export default function UpdateEmployer({ employerId, updateEmployer }) {

    let employerService = new EmployerService()

    const initialValues = {
        companyName: "",
        email: "",
        phoneNumber: "",
        webSite: ""
    }

    const schema = yup.object({
        companyName: yup.string().required("Bu alan boş bırakılamaz.").min(10, "Min 10 karakter."),
        email: yup.string().email("Geçerli bir mail adresi girin.").required("Bu alan boş bırakılamaz."),
        phoneNumber: yup.number("Metinsel karakter kullanamazsınız.").required("Bu alan boş bırakılamaz.").min(10, "Min 10 karakter"),
        webSite: yup.string().url("Geçerli bir adres bağlantısı girin.").required("Bu alan boş bırakılamaz.")
    })

    const onSubmit = (values) => {
        values.employerId = employerId
        employerService.updateEmployer(values).then((result) => {
            toast.success(result.data.message)
            updateEmployer()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}>
            {({ values, errors, touched, handleSubmit, handleChange }) => (
                <Form
                    onSubmit={handleSubmit}>
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
                    <Form.Button compact fluid basic inverted labelPosition="right">
                        <Button compact fluid
                            type="submit" size="large" content="Güncelle"
                            style={{
                                background: "linear-gradient(to right, #11998e, #38ef7d)",
                                color: "white", borderRadius: "10px/10px"
                            }} />
                    </Form.Button>
                </Form>
            )}
        </Formik>
    )
}
