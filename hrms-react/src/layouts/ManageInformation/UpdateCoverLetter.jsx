import { Formik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, Message, TextArea } from 'semantic-ui-react'
import CoverLetterService from '../../services/CoverLetterService'
import * as yup from "yup";
import { toast } from 'react-toastify'

export default function UpdateCoverLetter({ unemployedId, updateCv }) {

    const [coverLetter, setCoverLetter] = useState([])
    let coverLetterService = new CoverLetterService()

    useEffect(() => {
        coverLetterService.getByUnemployedId(unemployedId).then((result) => {
            setCoverLetter(result.data.data)
        })
    }, [unemployedId])

    const initialValues = {
        letterContent: ""
    }

    const schema = yup.object({
        letterContent: yup.string().required("Bu alan boş bırakılamaz.").min(100, "Min 100 karakter.").max(700, "Max 700 karakter.")
    })

    const addSubmit = (values) => {
        values.unemployedId = unemployedId
        coverLetterService.addCoverLetter(values).then((result) => {
            toast.success(result.data.message)
            coverLetterService.getByUnemployedId(unemployedId).then((result) => setCoverLetter(result.data.data))
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const updateSubmit = (values) => {
        values.unemployedId = unemployedId
        coverLetterService.updateCoverLetter(values).then((result) => {
            toast.success(result.data.message)
            coverLetterService.getByUnemployedId(unemployedId).then((result) => setCoverLetter(result.data.data))
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={coverLetter == null ? addSubmit : updateSubmit}>
                {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <TextArea rows="7"
                                placeholder={
                                    coverLetter === null ? "Hadi kendin hakkında bir şeyler yaz. " : coverLetter.letterContent}
                                name="letterContent"
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </Form.Field>
                        {touched.letterContent && errors.letterContent && (
                            <Message negative
                                className="errorMessage" size="tiny">
                                <Message.Content style={{ paddingBottom: "5px", letterSpacing: "2px" }} content={errors.letterContent} />
                            </Message>
                        )}
                        <Button
                            style={{ letterSpacing: "2px" }}
                            animated
                            fluid circular
                            type="submit"
                            color={coverLetter === null ? "google plus" : "linkedin"}
                            content={coverLetter === null ? "Ekle" : "Güncelle"} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
