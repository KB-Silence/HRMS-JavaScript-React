import { Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import LinkService from '../../services/LinkService'

export default function UpdateLink({ unemployedId, updateCv }) {

    const [links, setLinks] = useState([])

    let linkService = new LinkService()

    useEffect(() => {
        linkService.getByUnemployedId(unemployedId).then((result) => {
            setLinks(result.data.data)
        })
    }, [unemployedId])

    const initialValues = {
        githubLink: "",
        linkedinLink: ""
    }

    const schema = yup.object({
        githubLink: yup.string().url("Geçerli bir Github bağlantısı girin.").required("Bu alan boş bırakılamaz."),
        linkedinLink: yup.string().url("Geçerli bir Linkedin bağlantısı girin.").required("Bu alan boş bırakılamaz.")
    })

    const addSubmit = (values) => {
        values.unemployedId = unemployedId
        linkService.addLink(values).then((result) => {
            toast.success(result.data.message)
            linkService.getByUnemployedId(unemployedId).then((result) => {
                setLinks(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const updateSubmit = (values) => {
        values.unemployedId = unemployedId
        linkService.updateLink(values).then((result) => {
            toast.success(result.data.message)
            linkService.getByUnemployedId(unemployedId).then((result) => {
                setLinks(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={links == null ? addSubmit : updateSubmit}>
            {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid stackable padded>
                        <Grid.Row>
                            <Grid.Column width="8">
                                <Form.Input
                                    placeholder={
                                        links === null ? "Github Adresi " : links.githubLink}
                                    name="githubLink"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {touched.githubLink && errors.githubLink && (
                                    <Message negative
                                        className="errorMessage" size="tiny">
                                        <Message.Content style={{ paddingBottom: "5px", letterSpacing: "2px" }} content={errors.githubLink} />
                                    </Message>
                                )}
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Form.Input
                                    placeholder={
                                        links === null ? "Github Adresi " : links.linkedinLink}
                                    name="linkedinLink"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {touched.linkedinLink && errors.linkedinLink && (
                                    <Message negative
                                        className="errorMessage" size="tiny">
                                        <Message.Content style={{ paddingBottom: "5px", letterSpacing: "2px" }} content={errors.linkedinLink} />
                                    </Message>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                        <Button
                            style={{ letterSpacing: "2px" }}
                            animated
                            fluid circular
                            type="submit"
                            color={links === null ? "google plus" : "linkedin"}
                            content={links === null ? "Ekle" : "Güncelle"} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}
