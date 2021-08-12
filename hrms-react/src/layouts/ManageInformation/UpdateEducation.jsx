import React from 'react'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { Accordion, Button, Checkbox, Container, Form, Grid, Label, Message, Table } from 'semantic-ui-react'
import EducationService from '../../services/EducationService'
import { toast } from 'react-toastify';
import { Formik } from 'formik';

export default function UpdateEducation({ unemployedId, activeSubModal, handleSubModalClick, updateCv }) {

    const [isUpdate, setIsUpdate] = useState(false)
    const [educations, setEducations] = useState([])
    const [educationId, setEducationId] = useState([])

    let educationService = new EducationService()

    useEffect(() => {
        educationService.getByUnemployedIdOrderByGraduatedDate(unemployedId).then((result) => {
            setEducations(result.data.data)
        })
    }, [unemployedId])

    const initialValues = {
        schoolName: "",
        department: "",
        startDate: "",
        graduatedDate: ""
    }

    const schema = yup.object({
        schoolName: yup.string().required("Bu alan boş bırakılamaz.").min(20, "Min 20 karakter"),
        department: yup.string().required("Bu alan boş bırakılamaz.").min(5, "Min 5 karakter."),
        startDate: yup.date().required("Bu alan boş bırakılamaz."),
        graduatedDate: yup.date()
    })

    const onSubmit = (values) => {
        values.unemployedId = unemployedId
        educationService.addEducation(values).then((result) => {
            toast.success(result.data.message)
            educationService.getByUnemployedIdOrderByGraduatedDate(unemployedId).then((result) => {
                setEducations(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const updateSubmit = (values) => {
        values.unemployedId = unemployedId
        educationService.updateEducation(educationId, values).then((result) => {
            toast.success(result.data.message)
            educationService.getByUnemployedIdOrderByGraduatedDate(unemployedId).then((result) => {
                setEducations(result.data.data)
            })
            updateCv()
            setIsUpdate(false)
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function deleteEducation(educationId) {
        educationService.deleteEducation(educationId).then((result) => {
            toast.success(result.data.message)
            educationService.getByUnemployedIdOrderByGraduatedDate(unemployedId).then((result) => {
                setEducations(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <Accordion>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "2px" }}
                icon={false}
                content="Eğitim Bilgisi Ekle"
                name="addEducation"
                active={activeSubModal === "addEducation"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                active={activeSubModal === "addEducation"}
                style={{ paddingLeft: "4em", paddingRight: "4em" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={onSubmit}>
                    {({ values, errors, touched, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Table className="unemployedTable">
                                <Table.Row textAlign="center">
                                    <Table.HeaderCell content="Okul Adı" />
                                    <Table.HeaderCell content="Bölüm Adı" />
                                </Table.Row>
                                <Table.Body>
                                    <Table.Row verticalAlign="middle" textAlign="center">
                                        <Table.Cell>
                                            <Form.Input
                                                style={{ padding: "2px" }}
                                                name="schoolName"
                                                placeholder="Okul Adı"
                                                onChange={handleChange}
                                                value={values.schoolName} />
                                            {touched.schoolName && errors.schoolName && (
                                                <Message className="errorMessage" negative size="tiny">
                                                    <Message.Content
                                                        style={{ paddingBottom: "5px" }}
                                                        content={errors.schoolName} />
                                                </Message>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Input
                                                style={{ padding: "2px" }}
                                                name="department"
                                                placeholder="Bölüm Adı"
                                                onChange={handleChange}
                                                value={values.department} />
                                            {touched.department && errors.department && (
                                                <Message className="errorMessage" negative size="tiny">
                                                    <Message.Content style={{ paddingBottom: "5px" }} content={errors.department} />
                                                </Message>)}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row textAlign="center">
                                        <Table.HeaderCell content="Başlama Tarihi" />
                                        <Table.HeaderCell content="Mezuniyet Tarihi" />
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Form.Input
                                                style={{ marginTop: "14px" }}
                                                type="date" name="startDate"
                                                value={values.startDate}
                                                onChange={handleChange} />
                                            {touched.startDate && errors.startDate && (
                                                <Message className="errorMessage" negative size="tiny">
                                                    <Message.Content style={{ paddingBottom: "5px" }} content={errors.startDate} />
                                                </Message>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Input
                                                type="date" name="graduatedDate"
                                                value={values.graduatedDate}
                                                onChange={handleChange} />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Button
                                style={{ letterSpacing: "2px" }}
                                circular size="large"
                                type="submit"
                                color="google plus"
                                content="Eğitim Bilgisi Ekle" />
                        </Form>
                    )}
                </Formik>
            </Accordion.Content>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "2px" }}
                icon={false}
                content="Eğitim Bilgisi Güncelle"
                name="updateEducation"
                active={activeSubModal === "updateEducation"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                active={activeSubModal === "updateEducation"}
                style={{ paddingRight: "3em", paddingLeft: "3em" }}>

                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={updateSubmit}>
                    {({ values, errors, touched, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid stackable padded>
                                <Grid.Row textAlign="center" verticalAlign="middle">
                                    <Table className="unemployedTable" verticalAlign="middle" >
                                        {isUpdate ?
                                            <Table.Row textAlign="center">
                                                <Table.HeaderCell content="Okul Adı" />
                                                <Table.HeaderCell content="Bölüm Adı" />
                                            </Table.Row> :
                                            <Table.Row textAlign="center">
                                                <Table.HeaderCell content="Güncelle" />
                                                <Table.HeaderCell content="Okul Adı" />
                                                <Table.HeaderCell content="Bölüm Adı" />
                                                <Table.HeaderCell content="Başlama Tarihi" />
                                                <Table.HeaderCell content="Mezuniyet Tarihi" />
                                                <Table.HeaderCell content="Sil" />
                                            </Table.Row>}
                                        <Table.Body>
                                            {isUpdate ?
                                                <React.Fragment>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                style={{ padding: "2px" }}
                                                                name="schoolName"
                                                                placeholder="Okul Adı"
                                                                onChange={handleChange}
                                                                value={values.schoolName} />
                                                            {touched.schoolName && errors.schoolName && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.schoolName} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                style={{ padding: "2px" }}
                                                                name="department"
                                                                placeholder="Bölüm Adı"
                                                                onChange={handleChange}
                                                                value={values.department} />
                                                            {touched.department && errors.department && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content style={{ paddingBottom: "5px" }} content={errors.department} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row textAlign="center">
                                                        <Table.HeaderCell content="Başlama Tarihi" />
                                                        <Table.HeaderCell content="Mezuniyet Tarihi" />
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                style={{ marginTop: "14px" }}
                                                                type="date" name="startDate"
                                                                value={values.startDate}
                                                                onChange={handleChange} />
                                                            {touched.startDate && errors.startDate && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content style={{ paddingBottom: "5px" }} content={errors.startDate} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                type="date" name="graduatedDate"
                                                                value={values.graduatedDate}
                                                                onChange={handleChange} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </React.Fragment> :
                                                educations.map(education => (
                                                    <Table.Row textAlign="center">
                                                        <Table.Cell width="2">
                                                            <Button
                                                                style={{ letterSpacing: "2px" }}
                                                                fluid compact circular
                                                                content="Güncelle"
                                                                color="green" type="button"
                                                                onClick={() => {
                                                                    setEducationId(education.educationId)
                                                                    setIsUpdate(true)
                                                                }} />
                                                        </Table.Cell>
                                                        <Table.Cell content={education.schoolName} />
                                                        <Table.Cell content={education.department} />
                                                        <Table.Cell content={education.startDate} />
                                                        <Table.Cell content={
                                                            education.graduatedDate === null ?
                                                                "Devam Ediyor" : education.graduatedDate
                                                        } />
                                                        <Table.Cell>
                                                            <Button
                                                                type="button"
                                                                compact circular
                                                                negative icon="x"
                                                                onClick={() => deleteEducation(education.educationId)} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                        </Table.Body>
                                    </Table>
                                </Grid.Row>
                                {isUpdate ?
                                    <Grid.Row textAlign="center" verticalAlign="middle">
                                        <Container>
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                circular size="large"
                                                type="submit"
                                                color="google plus"
                                                content="Güncelle" />
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                circular size="large"
                                                type="button" color="vk"
                                                content="Vazgeç"
                                                onClick={() => setIsUpdate(false)} />
                                        </Container>
                                    </Grid.Row> : null}
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Accordion.Content>
        </Accordion>
    )
}