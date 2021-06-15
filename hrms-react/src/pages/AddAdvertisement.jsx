import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Grid, Header, Dropdown, Form, TextArea, Button } from 'semantic-ui-react'
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

    const formik = useFormik({
        initialValues: {
            minSalary: "",
            maxSalary: "",
            quota: "",
            lastApplication: "",
            jobDescription: "",
            positionId: "",
            cityId: "",
            typeId: "",
            timeId: ""
        },
        onSubmit: values => {
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
        }
    })

    const handleDropdownChange = (name, value) => {
        formik.setFieldValue(name, value)
    }

    return (

        <div className="pages">
            <Formik initialValues={formik.initialValues} onSubmit={formik.onSubmit} >
                <React.Fragment>
                    <Header textAlign="center" content="Add new Job Advertisement!" />
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid columns="2" centered container stackable >
                            <Grid.Row >
                                <Grid.Column mobile="16" tablet="5" computer="5">
                                    <Form.Input
                                        name="minSalary" placeholder="Min Salary"
                                        onChange={formik.handleChange}
                                        value={formik.values.minSalary} />
                                    <Form.Input
                                        name="maxSalary" placeholder="Max Salary"
                                        onChange={formik.handleChange}
                                        value={formik.values.maxSalary} />
                                    <Form.Input
                                        name="quota" placeholder="Quota"
                                        onChange={formik.handleChange}
                                        value={formik.values.quota} />
                                    <Form.Input
                                        type="date"
                                        name="lastApplication" placeholder="Last Application"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastApplication} />
                                </Grid.Column>
                                <Grid.Column width="3" stretched>
                                    <Dropdown className="addAdvertDropdown"
                                        clearable item search selection
                                        placeholder="Cities"
                                        id="cityId"
                                        onChange={(e, data) =>
                                            handleDropdownChange("cityId", data.value)}
                                        onBlur={formik.onBlur}
                                        value={formik.values.cityId}
                                        options={cityOptions} />
                                    <Dropdown className="addAdvertDropdown"
                                        clearable item search selection
                                        placeholder="Positions"
                                        id="positionId"
                                        onChange={(e, data) =>
                                            handleDropdownChange("positionId", data.value)}
                                        onBlur={formik.onBlur}
                                        value={formik.values.positionId}
                                        options={positionOptions} />
                                    <Dropdown className="addAdvertDropdown"
                                        clearable item search selection
                                        placeholder="Employment Type"
                                        id="typeId"
                                        onChange={(e, data) =>
                                            handleDropdownChange("typeId", data.value)}
                                        onBlur={formik.onBlur}
                                        value={formik.values.typeId}
                                        options={employmentTypeOptions} />
                                    <Dropdown className="addAdvertDropdown"
                                        clearable item search selection
                                        placeholder="Employment Time"
                                        id="timeId"
                                        onChange={(e, data) =>
                                            handleDropdownChange("timeId", data.value)}
                                        onBlur={formik.onBlur}
                                        value={formik.values.timeId}
                                        options={employmentTimeOptions} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row stretched centered columns="1">
                                <Grid.Column mobile="16" tablet="10" computer="10" >
                                    <Form.Field>
                                        <TextArea rows="5"
                                            placeholder="Job Description"
                                            name="jobDescription"
                                            onChange={formik.handleChange}
                                            onBlur={formik.onBlur} />
                                    </Form.Field>
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
            </Formik>
        </div >
    )
}
