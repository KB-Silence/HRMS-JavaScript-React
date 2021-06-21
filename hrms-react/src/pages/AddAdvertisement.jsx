import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup';
import { Grid, Header, Dropdown, Form, TextArea, Button, Message, Modal } from 'semantic-ui-react'
import JobAdvertisementService from '../services/JobAdvertisementService'
import LittleService from '../services/LittleService'

export default function AddAdvertisement() {
    const [state, dispatch] = React.useReducer(ModalReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state

    function ModalReducer(state, action) {
        switch (action.type) {
            case 'OPEN_MODAL':
                return { open: true, dimmer: action.dimmer }
            case 'CLOSE_MODAL':
                return { open: false }
            default:
                throw new Error()
        }
    }

    let jobAdvertisementService = new JobAdvertisementService()

    const [cities, setCities] = useState([])
    const [positions, setPositions] = useState([])
    const [employmentTimes, setEmploymentTimes] = useState([])
    const [employmentTypes, setEmploymentTypes] = useState([])

    useEffect(() => {
        let littleService = new LittleService();
        littleService.getCities().then((res) => setCities(res.data.data))
        littleService.getPositions().then((res) => setPositions(res.data.data))
        littleService.getEmploymentTimes().then((res) => setEmploymentTimes(res.data.data))
        littleService.getEmploymentTypes().then((res) => setEmploymentTypes(res.data.data))
    }, [])

    const cityOptions = cities.map((city => ({
        key: city.cityId,
        text: city.cityName,
        value: city.cityId
    })))

    const positionOptions = positions.map((position => ({
        key: position.positionId,
        text: position.positionName,
        value: position.positionId
    })))

    const employmentTimeOptions = employmentTimes.map((employmentTime => ({
        key: employmentTime.timeId,
        text: employmentTime.timeName,
        value: employmentTime.timeId
    })))

    const employmentTypeOptions = employmentTypes.map((employmentType => ({
        key: employmentType.typeId,
        text: employmentType.typeName,
        value: employmentType.typeId
    })))

    return (

        <div className="pages">
            <Modal
                size="tiny"
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
                <Modal.Header className="addAdvertModalHeader" content="Successfully added." />
                <Modal.Actions className="addAdvertModalAction">
                    <Button color="linkedin" compact circular onClick={() => dispatch({ type:"CLOSE_MODAL"})} content="OK!"/>
                </Modal.Actions>
            </Modal>
            <Formik
                initialValues={{
                    minSalary: "",
                    maxSalary: "",
                    quota: "",
                    lastApplication: "",
                    jobDescription: "",
                    positionId: "",
                    cityId: "",
                    typeId: "",
                    timeId: ""
                }}
                onSubmit={(values, { resetForm }) => {
                    let advertisement = {
                        advertStatus: true,
                        city: { cityId: values.cityId },
                        employer: { id: 4 },
                        employmentTime: { timeId: values.timeId },
                        employmentType: { typeId: values.typeId },
                        jobDescription: values.jobDescription,
                        lastApplication: values.lastApplication,
                        minSalary: values.minSalary,
                        maxSalary: values.maxSalary,
                        position: { positionId: values.positionId },
                        quota: values.quota
                    }
                    console.log(advertisement)
                    jobAdvertisementService.addJobAdvertisements(advertisement)
                    dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })
                    setTimeout(() => {
                        resetForm();
                    }, 2000)
                }}
                validationSchema={
                    yup.object({
                        minSalary: yup.number().required("Min Salary field cannot be empty.")
                            .positive("Min salary must be a positive value.").integer("Min salary must be an integer."),
                        maxSalary: yup.number().required("Max Salary field cannot be empty.")
                            .positive("Max salary must be a positive value.").integer("Max salary must be an integer."),
                        quota: yup.number().required("Quota field cannot be empty.")
                            .positive("Quota must be a positive value.").integer("Quota must be an integer."),
                        lastApplication: yup.date().required("Birth date field cannot be empty."),
                        jobDescription: yup.string().required("Job description field cannot be empty.").max(500, "Max 500 characters."),
                        cityId: yup.string().required("City must be selected."),
                        positionId: yup.string().required("Position must be selected."),
                        typeId: yup.string().required("Employment Type must be selected."),
                        timeId: yup.string().required("Employment Time must be selected.")

                    })}>

                {({ values, touched, errors, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                    <React.Fragment>
                        <Header textAlign="center" content="Add new Job Advertisement!" />
                        <Form onSubmit={handleSubmit}>
                            <Grid columns="2" centered container stackable >
                                <Grid.Row >
                                    <Grid.Column mobile="16" tablet="5" computer="5">
                                        <Form.Input
                                            name="minSalary" placeholder="Min Salary"
                                            onChange={handleChange}
                                            value={values.minSalary} />
                                        {touched.minSalary && errors.minSalary && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.minSalary} />
                                            </Message>
                                        )}

                                        <Form.Input
                                            name="maxSalary" placeholder="Max Salary"
                                            onChange={handleChange}
                                            value={values.maxSalary} />
                                        {touched.maxSalary && errors.maxSalary && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.maxSalary} />
                                            </Message>
                                        )}

                                        <Form.Input
                                            name="quota" placeholder="Quota"
                                            onChange={handleChange}
                                            value={values.quota} />
                                        {touched.quota && errors.quota && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.quota} />
                                            </Message>
                                        )}

                                        <Form.Input
                                            type="date"
                                            name="lastApplication" placeholder="Last Application"
                                            onChange={handleChange}
                                            value={values.lastApplication} />
                                        {touched.lastApplication && errors.lastApplication && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.lastApplication} />
                                            </Message>
                                        )}
                                    </Grid.Column>
                                    <Grid.Column width="3" stretched>
                                        <Dropdown className="addAdvertDropdown"
                                            clearable item search selection
                                            placeholder="Cities"
                                            id="cityId"
                                            onChange={(e, data) =>
                                                setFieldValue("cityId", data.value)}
                                            onBlur={handleBlur}
                                            value={values.cityId}
                                            options={cityOptions} />
                                        {touched.cityId && errors.cityId && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.cityId} />
                                            </Message>
                                        )}
                                        <Dropdown className="addAdvertDropdown"
                                            clearable item search selection
                                            placeholder="Positions"
                                            id="positionId"
                                            onChange={(e, data) =>
                                                setFieldValue("positionId", data.value)}
                                            onBlur={handleBlur}
                                            value={values.positionId}
                                            options={positionOptions} />
                                        {touched.positionId && errors.positionId && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.positionId} />
                                            </Message>
                                        )}
                                        <Dropdown className="addAdvertDropdown"
                                            clearable item search selection
                                            placeholder="Employment Type"
                                            id="typeId"
                                            onChange={(e, data) =>
                                                setFieldValue("typeId", data.value)}
                                            onBlur={handleBlur}
                                            value={values.typeId}
                                            options={employmentTypeOptions} />
                                        {touched.typeId && errors.typeId && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.typeId} />
                                            </Message>
                                        )}

                                        <Dropdown className="addAdvertDropdown"
                                            clearable item search selection
                                            placeholder="Employment Time"
                                            id="timeId"
                                            onChange={(e, data) =>
                                                setFieldValue("timeId", data.value)}
                                            onBlur={handleBlur}
                                            value={values.timeId}
                                            options={employmentTimeOptions} />
                                        {touched.timeId && errors.timeId && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.timeId} />
                                            </Message>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row stretched centered columns="1">
                                    <Grid.Column mobile="16" tablet="10" computer="10" >
                                        <Form.Field>
                                            <TextArea rows="5"
                                                placeholder="Job Description"
                                                name="jobDescription"
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                        </Form.Field>
                                        {touched.jobDescription && errors.jobDescription && (
                                            <Message className="errorMessage" negative size="tiny">
                                                <Message.Content content={errors.jobDescription} />
                                            </Message>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Button
                                        compact circular
                                        className="addAdvertButton"
                                        type="submit"
                                        icon="add" labelPosition="right"
                                        content="Add" />
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </div >
    )
}
