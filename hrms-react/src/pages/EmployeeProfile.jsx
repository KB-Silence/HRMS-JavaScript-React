import { Formik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Accordion, Button, Card, Divider, Dropdown, Form, Grid, Message, Modal, Table, TableBody } from 'semantic-ui-react'
import * as yup from 'yup'
import ConfirmationService from '../services/ConfirmationService'
import EmployeeService from '../services/EmployeeService'
import EmployerService from '../services/EmployerService'
import LittleService from '../services/LittleService'
import HandleActiveMenuItem from '../utils/HandleActiveMenuItem'

export default function EmployeeProfile() {

    HandleActiveMenuItem()
    const { employeeId } = useParams()

    const [open, setOpen] = useState(false)
    const [positions, setPositions] = useState([])
    const [activeItem, setActiveItem] = useState("adverts")

    const [isUpdate, setIsUpdate] = useState(false)
    const [employeeUserId, setEmployeeUserId] = useState([])

    function handleItemClick(e, { name }) {
        if (activeItem === name) {
            setActiveItem("null")
        } else {
            setActiveItem(name)
        }
    }

    const [updates, setUpdates] = useState([])
    const [employee, setEmployee] = useState([])
    const [employer, setEmployer] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [waitingAdverts, setWaitingAdverts] = useState([])
    const [waitingEmployers, setWaitingEmployer] = useState([])

    useEffect(() => {
        let confirmationService = new ConfirmationService()
        let employeeService = new EmployeeService()
        let littleService = new LittleService()
        littleService.getPositions().then((result) => setPositions(result.data.data))
        employeeService.getAllEmployee().then((result) => setEmployeeList(result.data.data))
        employeeService.getByUserId(employeeId).then((result) => setEmployee(result.data.data))
        confirmationService.getByApproveStatus().then((result) => setUpdates(result.data.data))
        confirmationService.getByAdvertIsConfirmed().then((result) => setWaitingAdverts(result.data.data))
        confirmationService.getByEmployerIsConfirmed().then((result) => setWaitingEmployer(result.data.data))
    }, [employeeId])

    function handleEmployerInformation(employerId) {
        let employerService = new EmployerService()
        employerService.getByUserId(employerId).then((result) => setEmployer(result.data.data))
        setOpen(true)
    }

    const positionOptions = positions.map((position => ({
        key: position.positionId,
        text: position.positionName,
        value: position.positionId
    })))

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        positionId: "",
        password: ""
    }

    const schema = yup.object({
        firstName: yup.string().required("Bu alan boş bırakılamaz.").min(2, "Min 2 karakter."),
        lastName: yup.string().required("Bu alan boş bırakılamaz.").min(2, "Min 2 karakter."),
        email: yup.string().email("Geçerli bir mail adresi girin.").required("Bu alan boş bırakılamaz."),
        phoneNumber: yup.number().required("Bu alan boş bırakılamaz.").min(10, "Min 10 karakter."),
        password: yup.string().required("Bu alan boş bırakılamaz.").min(6, "Min 6 karakter"),
        positionId: yup.string().required("Bu alan boş bırakılamaz.")
    })

    let employeeService = new EmployeeService()

    const updateSubmit = (values) => {
        employeeService.updateEmployee(employeeUserId, values).then((result) => {
            toast.success(result.data.message)
            employeeService.getAllEmployee().then((result) => setEmployeeList(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const addSubmit = (values, { resetForm }) => {
        employeeService.addEmployee(values).then((result) => {
            toast.success(result.data.message)
            employeeService.getAllEmployee().then((result) => setEmployeeList(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
        setTimeout(() => {
            resetForm()
        }, 3000);
    }

    function deleteEmployee(employeeId) {
        employeeService.deleteEmployee(employeeId).then((result) => {
            toast.success(result.data.message)
            employeeService.getAllEmployee().then((result) => setEmployeeList(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function verifyEmployer(employerId) {
        let confirmationService = new ConfirmationService()
        confirmationService.confirmEmployers(employeeId, employerId).then((result) => {
            toast.success(result.data.message)
            confirmationService.getByEmployerIsConfirmed().then((result) => setWaitingEmployer(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function verifyAdvert(advertId, status) {
        let confirmationService = new ConfirmationService()
        confirmationService.confirmAdvertisement(advertId, employeeId, status).then((result) => {
            toast.success(result.data.message)
            confirmationService.getByAdvertIsConfirmed().then((result) => setWaitingAdverts(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function verifyUpdate(employerId, status) {
        let confirmationService = new ConfirmationService()
        confirmationService.confirmUpdate(employeeId, employerId, status).then((result) => {
            toast.success(result.data.message)
            confirmationService.getByApproveStatus().then((result) => setUpdates(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <div className="pages">
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
                <Modal.Header>
                    İşverenin Güncel Bilgileri
                    <Button compact negative circular basic
                        floated="right" icon="cancel"
                        onClick={() => setOpen(false)} />
                </Modal.Header>
                <Modal.Content>
                    <Table>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell content="Şirket Adı" />
                            <Table.HeaderCell content="Email" />
                            <Table.HeaderCell content="Web Site" />
                            <Table.HeaderCell content="Telefon No" />
                        </Table.Row>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell content={employer.companyName} />
                                <Table.Cell content={employer.email} />
                                <Table.Cell content={employer.webSite} />
                                <Table.Cell content={employer.phoneNumber} />
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Modal.Content>
            </Modal>
            <Grid
                stackable textAlign="center">
                <Grid.Row
                    style={{ paddingRight: "6em", paddingLeft: "6em" }}
                    textAlign="center">
                    <Card
                        fluid
                        className="employeeCard">
                        <Card.Content>
                            <Card.Header
                                style={{ letterSpacing: "2px" }}
                                className="employeeCardHeader"
                                content="Sistem Personeli" />
                            <Divider
                                style={{ margin: "10px" }} />
                            <Card.Header
                                className="employeeCardHeader"
                                content={`${employee.firstName} ${employee.lastName}`} />
                            <Card.Meta className="employeeCardMeta" content={employee.email} />
                            <Card.Meta className="employeeCardMeta" content={employee.phoneNumber} />
                        </Card.Content>
                    </Card>
                </Grid.Row>

                <Grid.Row style={{ paddingRight: "5em", paddingLeft: "5em" }}>
                    <Grid.Column width="16">
                        <Accordion styled fluid>
                            <Accordion.Title
                                icon={false}
                                className="employeeAccordTitle"
                                name="adverts"
                                content="Onay Bekleyen İlanlar"
                                active={activeItem === "adverts"}
                                onClick={handleItemClick} />
                            <Accordion.Content
                                active={activeItem === "adverts"}>
                                <Table compact stackable
                                    textAlign="center" celled="internally" >
                                    <Table.Row>
                                        <Table.HeaderCell content="Şirket" />
                                        <Table.HeaderCell content="Pozisyon" />
                                        <Table.HeaderCell content="Maaş(TL)" />
                                        <Table.HeaderCell content="Kontenjan" />
                                        <Table.HeaderCell content="Şehir" />
                                        <Table.HeaderCell content="Açıklama" />
                                        <Table.HeaderCell singleLine content="Çalışma Şekli" />
                                        <Table.HeaderCell singleLine content="Çalışma Zamanı" />
                                        <Table.HeaderCell singleLine content="Son Kabul" />
                                        <Table.HeaderCell content="Onayla" />
                                    </Table.Row>
                                    <Table.Body>
                                        {waitingAdverts.map(advert => (
                                            <Table.Row key={advert.advertId}>
                                                <Table.Cell content={advert.employer?.companyName} />
                                                <Table.Cell content={advert.position?.positionName} />
                                                <Table.Cell content={`${advert.minSalary} - ${advert.maxSalary}`} />
                                                <Table.Cell content={advert.quota} />
                                                <Table.Cell content={advert.city?.cityName} />
                                                <Table.Cell width="5" content={advert.jobDescription} />
                                                <Table.Cell content={advert.employmentType?.typeName} />
                                                <Table.Cell content={advert.employmentTime?.timeName} />
                                                <Table.Cell >
                                                    {(
                                                        (new Date(advert.lastApplication).getTime() - new Date(Date.now()).getTime()) / 86400000)
                                                        .toString()
                                                        .split(".", 1)}{" "} gün
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button
                                                        compact circular
                                                        color="green"
                                                        icon="check"
                                                        onClick={() => verifyAdvert(advert.advertId, true)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ paddingRight: "5em", paddingLeft: "5em" }}>
                    <Grid.Column width="16">
                        <Accordion styled fluid>
                            <Accordion.Title
                                icon={false}
                                className="employeeAccordTitle"
                                name="employers"
                                content="Onay Bekleyen İşverenler"
                                active={activeItem === "employers"}
                                onClick={handleItemClick} />
                            <Accordion.Content
                                active={activeItem === "employers"}>
                                <Table compact stackable
                                    textAlign="center" >
                                    <Table.Row>
                                        <Table.HeaderCell content="Şirket Adı" />
                                        <Table.HeaderCell content="Email" />
                                        <Table.HeaderCell content="Web Site" />
                                        <Table.HeaderCell content="Telefon No" />
                                        <Table.HeaderCell content="Onayla" />
                                    </Table.Row>
                                    <Table.Body>
                                        {waitingEmployers.map(employer => (
                                            <Table.Row key={employer.userId}>
                                                <Table.Cell content={employer.companyName} />
                                                <Table.Cell content={employer.email} />
                                                <Table.Cell content={employer.webSite} />
                                                <Table.Cell content={employer.phoneNumber} />
                                                <Table.Cell>
                                                    <Button
                                                        compact circular
                                                        color="green"
                                                        icon="check"
                                                        onClick={() => verifyEmployer(employer.userId, true)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ paddingRight: "5em", paddingLeft: "5em" }}>
                    <Grid.Column width="16">
                        <Accordion styled fluid>
                            <Accordion.Title
                                icon={false}
                                className="employeeAccordTitle"
                                name="updates"
                                content="Onay Bekleyen İşveren Güncellemeleri"
                                active={activeItem === "updates"}
                                onClick={handleItemClick} />
                            <Accordion.Content
                                active={activeItem === "updates"}>
                                <Table compact stackable
                                    textAlign="center" celled="internally" >
                                    <Table.Row>
                                        <Table.HeaderCell content="Şirket Adı" />
                                        <Table.HeaderCell content="Email" />
                                        <Table.HeaderCell content="Web Site" />
                                        <Table.HeaderCell content="Telefon No" />
                                        <Table.HeaderCell content="Onayla" />
                                        <Table.HeaderCell content="Güncel Bilgiler" />
                                    </Table.Row>
                                    <Table.Body>
                                        {updates.map(update => (
                                            <Table.Row key={update.updateId}>
                                                <Table.Cell content={update.companyName} />
                                                <Table.Cell content={update.email} />
                                                <Table.Cell content={update.webSite} />
                                                <Table.Cell content={update.phoneNumber} />
                                                <Table.Cell>
                                                    <Button
                                                        compact circular
                                                        color="green"
                                                        icon="check"
                                                        onClick={() => verifyUpdate(update.employerId, true)} />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button
                                                        compact
                                                        color="google plus"
                                                        content="Gör"
                                                        onClick={() => handleEmployerInformation(update.employerId)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ paddingRight: "5em", paddingLeft: "5em" }}>
                    <Grid.Column width="16">
                        <Accordion styled fluid>
                            <Accordion.Title
                                icon={false}
                                className="employeeAccordTitle"
                                name="updateEmployee"
                                content="Sistem Personeli Güncelle"
                                active={activeItem === "updateEmployee"}
                                onClick={handleItemClick} />
                            <Accordion.Content
                                active={activeItem === "updateEmployee"}
                                style={{ paddingLeft: "10em", paddingRight: "10em", backgroundColor: "#ECE9E6" }}>
                                {console.log(isUpdate)}
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={schema}
                                    onSubmit={updateSubmit}>
                                    {({ values, touched, errors, handleChange, handleSubmit, setFieldValue }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Table stackable compact size="small" textAlign="center">
                                                {isUpdate ?
                                                    <Table.Row>
                                                        <Table.HeaderCell content="Adı" />
                                                        <Table.HeaderCell content="Soyadı" />
                                                        <Table.HeaderCell content="Email" />
                                                    </Table.Row> :
                                                    <Table.Row>
                                                        <Table.HeaderCell />
                                                        <Table.HeaderCell content="Adı" />
                                                        <Table.HeaderCell content="Soyadı" />
                                                        <Table.HeaderCell content="Email" />
                                                        <Table.HeaderCell content="Pozisyon" />
                                                        <Table.HeaderCell content="Telefon Numarası" />
                                                    </Table.Row>}

                                                <Table.Body>
                                                    {isUpdate ?
                                                        <React.Fragment>
                                                            <Table.Row>
                                                                <Table.Cell>
                                                                    <Form.Input
                                                                        name="firstName"
                                                                        placeholder="Personel Adı"
                                                                        onChange={handleChange}
                                                                        value={values.firstName} />
                                                                    {touched.firstName && errors.firstName && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.firstName} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Form.Input
                                                                        name="lastName"
                                                                        placeholder="Personel Soyadı"
                                                                        onChange={handleChange}
                                                                        value={values.lastName} />
                                                                    {touched.lastName && errors.lastName && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.lastName} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Form.Input
                                                                        name="email"
                                                                        placeholder="Personel Email"
                                                                        onChange={handleChange}
                                                                        value={values.email} />
                                                                    {touched.email && errors.email && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.email} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <Table.HeaderCell content="Pozisyon" />
                                                                <Table.HeaderCell content="Şifre" />
                                                                <Table.HeaderCell content="Telefon Numarası" />
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <Table.Cell>
                                                                    <Dropdown
                                                                        clearable search selection fluid
                                                                        placeholder="Pozisyon"
                                                                        name="positionId"
                                                                        onChange={(e, data) =>
                                                                            setFieldValue("positionId", data.value)}
                                                                        value={values.positionId}
                                                                        options={positionOptions} />
                                                                    {touched.positionId && errors.positionId && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.positionId} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Form.Input
                                                                        name="password"
                                                                        placeholder="Personel Şifre"
                                                                        type="password"
                                                                        onChange={handleChange}
                                                                        value={values.password} />
                                                                    {touched.password && errors.password && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.password} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Form.Input
                                                                        name="phoneNumber"
                                                                        placeholder="Personel Telefon"
                                                                        onChange={handleChange}
                                                                        value={values.phoneNumber} />
                                                                    {touched.phoneNumber && errors.phoneNumber && (
                                                                        <Message className="errorMessage" negative size="tiny">
                                                                            <Message.Content
                                                                                style={{ paddingBottom: "5px" }}
                                                                                content={errors.phoneNumber} />
                                                                        </Message>)}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <Table.HeaderCell />
                                                                <Table.HeaderCell
                                                                    width="6"
                                                                    style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                                    <Button
                                                                        type="button" color="youtube"
                                                                        circular compact
                                                                        style={{ letterSpacing: "1px" }}
                                                                        content="Sil" size="large"
                                                                        onClick={() => deleteEmployee(employeeUserId)} />
                                                                    <Button
                                                                        type="submit" size="large"
                                                                        circular positive compact
                                                                        style={{ letterSpacing: "1px" }}
                                                                        content="Güncelle" />
                                                                    <Button
                                                                        circular compact
                                                                        type="button" color="vk"
                                                                        style={{ letterSpacing: "1px" }}
                                                                        content="Vazgeç" size="large"
                                                                        onClick={() => setIsUpdate(false)} />
                                                                </Table.HeaderCell>
                                                                <Table.HeaderCell />
                                                            </Table.Row>
                                                        </React.Fragment> :
                                                        employeeList.map(employee => (
                                                            <React.Fragment>
                                                                <Table.Row key={employee.userId}>
                                                                    <Table.Cell width="1">
                                                                        <Button
                                                                            type="button"
                                                                            compact circular size="small"
                                                                            color="green"
                                                                            content="Güncelle"
                                                                            onClick={() => {
                                                                                setEmployeeUserId(employee.userId)
                                                                                setIsUpdate(true)
                                                                            }} />
                                                                    </Table.Cell>
                                                                    <Table.Cell content={employee.firstName} />
                                                                    <Table.Cell content={employee.lastName} />
                                                                    <Table.Cell content={employee.email} />
                                                                    <Table.Cell content={employee.position?.positionName} />
                                                                    <Table.Cell content={employee.phoneNumber} />
                                                                </Table.Row>
                                                            </React.Fragment>))
                                                    }
                                                </Table.Body>
                                            </Table>
                                        </Form>
                                    )}
                                </Formik>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ paddingRight: "5em", paddingLeft: "5em" }}>
                    <Grid.Column width="16">
                        <Accordion styled fluid>
                            <Accordion.Title
                                icon={false}
                                className="employeeAccordTitle"
                                name="addEmployee"
                                content="Sistem Personeli Ekle"
                                active={activeItem === "addEmployee"}
                                onClick={handleItemClick} />
                            <Accordion.Content
                                active={activeItem === "addEmployee"}
                                style={{ paddingLeft: "10em", paddingRight: "10em", backgroundColor: "#ECE9E6" }}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={schema}
                                    onSubmit={addSubmit}>
                                    {({ values, touched, errors, handleChange, handleSubmit, setFieldValue }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Table stackable compact size="small" textAlign="center">
                                                <Table.Row>
                                                    <Table.HeaderCell content="Pozisyon" />
                                                    <Table.HeaderCell content="Adı" />
                                                    <Table.HeaderCell content="Soyadı" />
                                                </Table.Row>
                                                <Table.Body>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            <Dropdown
                                                                clearable search selection fluid
                                                                placeholder="Pozisyon"
                                                                name="positionId"
                                                                onChange={(e, data) =>
                                                                    setFieldValue("positionId", data.value)}
                                                                value={values.positionId}
                                                                options={positionOptions} />
                                                            {touched.positionId && errors.positionId && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.positionId} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                name="firstName"
                                                                placeholder="Personel Adı"
                                                                onChange={handleChange}
                                                                value={values.firstName} />
                                                            {touched.firstName && errors.firstName && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.firstName} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                name="lastName"
                                                                placeholder="Personel Soyadı"
                                                                onChange={handleChange}
                                                                value={values.lastName} />
                                                            {touched.lastName && errors.lastName && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.lastName} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                                <Table.Row>
                                                    <Table.HeaderCell content="Email" />
                                                    <Table.HeaderCell content="Telefon Numarası" />
                                                    <Table.HeaderCell content="Şifre" />
                                                </Table.Row>
                                                <Table.Body>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                name="email"
                                                                placeholder="Personel Email"
                                                                onChange={handleChange}
                                                                value={values.email} />
                                                            {touched.email && errors.email && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.email} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                name="phoneNumber"
                                                                placeholder="Personel Telefon"
                                                                onChange={handleChange}
                                                                value={values.phoneNumber} />
                                                            {touched.phoneNumber && errors.phoneNumber && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.phoneNumber} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Form.Input
                                                                name="password"
                                                                placeholder="Personel Şifre"
                                                                type="password"
                                                                onChange={handleChange}
                                                                value={values.password} />
                                                            {touched.password && errors.password && (
                                                                <Message className="errorMessage" negative size="tiny">
                                                                    <Message.Content
                                                                        style={{ paddingBottom: "5px" }}
                                                                        content={errors.password} />
                                                                </Message>)}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                                <TableBody>
                                                    <Table.Row>
                                                        <Table.Cell />
                                                        <Table.Cell >
                                                            <Button
                                                                fluid compact circular
                                                                icon="add" labelPosition="right"
                                                                type="submit" color="linkedin"
                                                                content="Ekle" />
                                                        </Table.Cell>
                                                        <Table.Cell />
                                                    </Table.Row>
                                                </TableBody>
                                            </Table>
                                        </Form>
                                    )}
                                </Formik>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}