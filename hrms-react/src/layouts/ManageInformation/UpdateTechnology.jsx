import { Formik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Accordion, Button, Checkbox, Dropdown, Form, Grid, Label, Message, Table } from 'semantic-ui-react';
import * as yup from 'yup';
import TechnologyService from '../../services/TechnologyService'

export default function UpdateTechnology({ unemployedId, handleSubModalClick, activeSubModal, updateCv }) {

    const [isUpdate, setIsUpdate] = useState(false)
    const [technologies, setTechnologies] = useState([])
    const [technologyId, setTechnologyId] = useState([])
    const [technologyName, setTechnologyName] = useState([])
    const [technologyLevel, setTechnologyLevel] = useState([])

    let technologyService = new TechnologyService()

    const levels = [1, 2, 3, 4, 5]
    const levelOption = levels.map((level) => ({
        key: level,
        text: level,
        value: level
    }))

    useEffect(() => {
        technologyService.getByUnemployedId(unemployedId).then((result) => {
            setTechnologies(result.data.data)
        })
    }, [unemployedId])

    const initialValues = {
        technologyName: "",
        technologyLevel
    }

    const schema = yup.object({
        technologyName: yup.string().required("Bu alan boş bırakılamaz.")
    })

    const onSubmit = (values) => {
        values.unemployedId = unemployedId
        technologyService.addTechnology(values).then((result) => {
            toast.success(result.data.message)
            technologyService.getByUnemployedId(unemployedId).then((result) => {
                setTechnologies(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const techValues = {
        technologyName: technologyName,
        technologyLevel: technologyLevel
    }

    function updateTechnology() {
        technologyService.updateTechnology(techValues, technologyId).then((result) => {
            toast.success(result.data.message)
            technologyService.getByUnemployedId(unemployedId).then((result) => {
                setTechnologies(result.data.data)
            })
            updateCv()
            setIsUpdate(false)
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function deleteTechnology() {
        technologyService.deleteTechnology(technologyId).then((result) => {
            toast.success(result.data.message)
            technologyService.getByUnemployedId(unemployedId).then((result) => {
                setTechnologies(result.data.data)
            })
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <Accordion>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "1px" }}
                icon={false}
                content="Teknoloji Bilgisi Ekle"
                name="addTechnology"
                active={activeSubModal === "addTechnology"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                active={activeSubModal === "addTechnology"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={onSubmit}>
                    {({ values, touched, errors, handleSubmit, handleChange, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid stackable padded centered>
                                <Grid.Row>
                                    <Grid.Column width="10">
                                        <Form.Input
                                            placeholder="Teknoloji Adı"
                                            id="technologyName"
                                            name="technologyName"
                                            value={values.technologyName}
                                            onChange={handleChange} />
                                        {errors.technologyName && touched.technologyName && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content style={{ padding: "5px" }} content={errors.technologyName} />
                                            </Message>
                                        )}
                                    </Grid.Column>
                                    <Grid.Column width="6">
                                        <Dropdown
                                            fluid
                                            placeholder="Teknoloji Seviyesi"
                                            clearable selection
                                            onChange={(e, data) =>
                                                setFieldValue("technologyLevel", data.value)}
                                            value={values.technologyLevel}
                                            options={levelOption} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column textAlign="center" width="7">
                                        <Button
                                            circular fluid
                                            style={{ letterSpacing: "2px" }}
                                            type="submit"
                                            color="google plus"
                                            content="Ekle" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Accordion.Content>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "1px" }}
                icon={false}
                content="Teknoloji Bilgisi Güncelle"
                name="updateTechnology"
                active={activeSubModal === "updateTechnology"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                active={activeSubModal === "updateTechnology"}>
                <Grid stackable padded>
                    <Grid.Row textAlign="center" verticalAlign="middle">
                        <Table className="unemployedTable" textAlign="center">
                            {isUpdate ?
                                <Table.Row textAlign="center">
                                    <Table.HeaderCell content="Teknoloji Adı" />
                                    <Table.HeaderCell content="Teknoloji Seviyesi" />
                                    <Table.HeaderCell />
                                </Table.Row> :
                                <Table.Row>
                                    <Table.HeaderCell content="Güncelle" />
                                    <Table.HeaderCell content="Teknoloji Adı" />
                                    <Table.HeaderCell content="Teknoloji Seviyesi" />
                                    <Table.HeaderCell content="Sil" />
                                </Table.Row>}
                            <Table.Body>
                                {isUpdate ?
                                    <Table.Row textAlign="center">
                                        <Table.Cell width="7">
                                            <Form.Input
                                                fluid
                                                placeholder="Teknoloji Adı"
                                                onChange={(e, data) => setTechnologyName(data.value)} />
                                        </Table.Cell>
                                        <Table.Cell width="4">
                                            <Dropdown fluid
                                                placeholder="Dil Seviyesi"
                                                clearable selection
                                                onChange={(e, data) => setTechnologyLevel(data.value)}
                                                options={levelOption} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                compact circular
                                                content="Güncelle"
                                                color="green" type="button"
                                                onClick={() => updateTechnology()} />
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                compact circular
                                                content="Vazgeç"
                                                color="youtube" type="button"
                                                onClick={() => setIsUpdate(false)} />C
                                        </Table.Cell>
                                    </Table.Row> :
                                    technologies.map(technology => (
                                        <Table.Row key={technology.technologyId}>
                                            <Table.Cell width="2">
                                                <Button
                                                    style={{ letterSpacing: "2px" }}
                                                    fluid compact circular
                                                    content="Güncelle"
                                                    color="green" type="button"
                                                    onClick={() => {
                                                        setTechnologyId(technology.technologyId)
                                                        setIsUpdate(true)
                                                    }} />
                                            </Table.Cell>
                                            <Table.Cell width="6" content={technology.technologyName} />
                                            <Table.Cell width="4">
                                                {technology.technologyLevel}
                                            </Table.Cell>
                                            <Table.Cell width="2">
                                                <Button
                                                    circular negative
                                                    icon="x" type="button"
                                                    onClick={() => deleteTechnology(technology.technologyId)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </Accordion.Content>
        </Accordion>
    )
}