import * as yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Header, Dropdown, Form, TextArea, Button, Message, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import JobAdvertisementService from '../services/JobAdvertisementService'
import LittleService from '../services/LittleService'

export default function AddAdvertisement() {

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

    const initialValues = {
        cityId:"",
        jobDescription:"",
        lastApplication:"",
        maxSalary:"",
        minSalary:"",
        positionId:"",
        quota:"",
        timeId:"",
        typeId:""
    }
    const schema = yup.object({
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

    })
    const onSubmit = (values, { resetForm }) => {
        values.employerId = 4
        jobAdvertisementService.addJobAdvertisements(values).then((result) => {
            toast.success(result.data.message)
        }).catch((result) => {
            toast(result.response.data.message)
        })
        setTimeout(() => {
            resetForm();
        }, 20000000)
    }

    return (
        <div className="pages">
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}>

                {({ values, touched, errors, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                    <React.Fragment>
                        <Header textAlign="center" content="Add new Job Advertisement!" />
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                className="formInput" width="6"
                                name="minSalary" placeholder="Min Salary"
                                onChange={handleChange}
                                value={values.minSalary} />
                            {touched.minSalary && errors.minSalary && (
                                <Message className="errorMessage" negative size="tiny">
                                    <Message.Content content={errors.minSalary} />
                                </Message>
                            )}

                            <Form.Input
                                className="formInput" width="6"
                                name="maxSalary" placeholder="Max Salary"
                                onChange={handleChange}
                                value={values.maxSalary} />
                            {touched.maxSalary && errors.maxSalary && (
                                <Message className="errorMessage" negative size="tiny">
                                    <Message.Content content={errors.maxSalary} />
                                </Message>
                            )}

                            <Form.Input
                                className="formInput" width="6"
                                name="quota" placeholder="Quota"
                                onChange={handleChange}
                                value={values.quota} />
                            {touched.quota && errors.quota && (
                                <Message className="errorMessage" negative size="tiny">
                                    <Message.Content content={errors.quota} />
                                </Message>
                            )}

                            <Label circular pointing="below" color="green" size="large" content="Last Application" />
                            <Form.Input
                                type="date"
                                className="formInput" width="6"
                                name="lastApplication" placeholder="Last Application"
                                onChange={handleChange}
                                value={values.lastApplication} />

                            {touched.lastApplication && errors.lastApplication && (
                                <Message className="errorMessage" negative size="tiny">
                                    <Message.Content content={errors.lastApplication} />
                                </Message>
                            )}
                            <Dropdown className="addAdvertDropdown"
                                clearable item search selection
                                placeholder="Cities"
                                id="cityId"
                                name="cityId"
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
                                name="positionId"
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
                                name="typeId"
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
                                name="timeId"
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
                            <Form.Field className="formInput" width="12" >
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
                            <Button
                                compact circular
                                className="addAdvertButton"
                                type="submit"
                                icon="add" labelPosition="right"
                                content="Add" />
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </div >
    )
}
