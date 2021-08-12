import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import HandleActiveMenuItem from '../utils/HandleActiveMenuItem'
import EmployerService from '../services/EmployerService'
import { Button, Card, Grid, Image, Table, Accordion, Modal } from 'semantic-ui-react'
import JobAdvertisementService from '../services/JobAdvertisementService'
import UpdateEmployer from '../layouts/ManageInformation/UpdateEmployer'
import { toast } from 'react-toastify'


export default function EmployerProfile() {

    HandleActiveMenuItem()
    const { employerId } = useParams()

    const [activeItem, setActiveItem] = useState("actives")
    const [open, setOpen] = useState(false)

    function handleItemClik(e, { name }) {
        if (activeItem === name) {
            setActiveItem("null")
        } else {
            setActiveItem(name)
        }
    }

    function updateEmployer() {
        let employerService = new EmployerService()
        employerService.getByUserId(employerId).then((result) => setEmployer(result.data.data))
    }

    function changeAdvertStatus(advertId) {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.changeAdvertisementStatus(advertId).then((result) => {
            toast.success(result.data.message)
            jobAdvertisementService.getByAdvertStatusAndAdvertIsConfirmedAndEmployerIdOrderByCreatedDate(employerId).then((result) => setJobAdvertisements(result.data.data))
            jobAdvertisementService.getByAdvertStatusFalseAndAdvertIsConfirmedTrueAndEmployerId(employerId).then((result) => setPassiveAdvertisements(result.data.data))
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const [employer, setEmployer] = useState([])
    const [jobAdvertisements, setJobAdvertisements] = useState([])
    const [passiveAdvertisements, setPassiveAdvertisements] = useState([])
    const [waitingAdvertisements, setWaitingAdvertisements] = useState([])

    useEffect(() => {
        let employerService = new EmployerService()
        let jobAdvertisementService = new JobAdvertisementService()
        employerService.getByUserId(employerId).then((result) => setEmployer(result.data.data))
        jobAdvertisementService.getByAdvertStatusAndAdvertIsConfirmedAndEmployerIdOrderByCreatedDate(employerId).then((result) => setJobAdvertisements(result.data.data))
        jobAdvertisementService.getByAdvertStatusFalseAndAdvertIsConfirmedTrueAndEmployerId(employerId).then((result) => setPassiveAdvertisements(result.data.data))
        jobAdvertisementService.getByAdvertIsConfirmed(false).then((result) => setWaitingAdvertisements(result.data.data))
    }, [employerId])



    return (
        <div className="pages employerProfile">
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
                <Modal.Header className="employerModalHeader">
                    {employer.companyName}
                    <Button compact negative circular basic
                        floated="right" icon="cancel"
                        onClick={() => setOpen(false)} />
                </Modal.Header>
                <Modal.Content>
                    <UpdateEmployer
                        employerId={employerId}
                        updateEmployer={updateEmployer} />
                </Modal.Content>

            </Modal>
            <Grid stackable padded
                verticalAlign="middle"
                style={{ paddingLeft: "5em", paddingRight: "5em" }}>
                <Grid.Row>
                    <Grid.Column
                        mobile="16" tablet="16" computer="4">
                        <Card fluid>
                            <Image
                                style={{ minHeight: "350px", marginBottom: "1em" }}
                                src={"https://www.incimages.com/uploaded_files/image/1920x1080/GettyImages-475636790_165141.jpg"} />
                            <Card.Header
                                content={employer.companyName} />
                            <Card.Meta
                                content={employer.email} />
                            <Card.Meta >
                                {employer.phoneNumber}
                            </Card.Meta>
                            <Card.Meta extra>
                                {employer.webSite}
                            </Card.Meta>
                            <Card.Content>
                                <Button
                                    style={{ letterSpacing: "1px" }}
                                    color="google plus"
                                    content="Bilgileri Güncelle"
                                    fluid compact circular
                                    onClick={() => setOpen(true)} />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column
                        mobile="16" tablet="16" computer="12">
                        <Accordion fluid styled style={{ marginBottom: "20px", marginTop: "10px" }}>
                            <Accordion.Title
                                className="employerListTitle"
                                name="actives"
                                icon="check"
                                content="Yayında Olan İlanlar"
                                active={activeItem === "actives"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "actives"}>
                                <Table compact stackable
                                    textAlign="center" size="small" celled="internally">
                                    <Table.Row positive>
                                        <Table.HeaderCell content="Pozisyon" />
                                        <Table.HeaderCell content="Maaş(TL)" />
                                        <Table.HeaderCell content="Kontenjan" />
                                        <Table.HeaderCell content="Şehir" />
                                        <Table.HeaderCell content="Açıklama" />
                                        <Table.HeaderCell content="Çalışma Şekli" />
                                        <Table.HeaderCell content="Çalışma Zamanı" />
                                        <Table.HeaderCell content="Son Kabul" />
                                        <Table.HeaderCell content="Eklenme Tarihi" />
                                        <Table.HeaderCell content="Durum Güncelle" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            jobAdvertisements.map(jobAdvertisement => (
                                                <Table.Row positive key={jobAdvertisement.advertId}>
                                                    <Table.Cell content={jobAdvertisement.position?.positionName} />
                                                    <Table.Cell content={`${jobAdvertisement.minSalary} - ${jobAdvertisement.maxSalary}`} />
                                                    <Table.Cell content={jobAdvertisement.quota} />
                                                    <Table.Cell content={jobAdvertisement.city?.cityName} />
                                                    <Table.Cell content={jobAdvertisement.jobDescription} />
                                                    <Table.Cell content={jobAdvertisement.employmentType?.typeName} />
                                                    <Table.Cell content={jobAdvertisement.employmentTime?.timeName} />
                                                    <Table.Cell >
                                                        {(
                                                            (new Date(jobAdvertisement.lastApplication).getTime() - new Date(Date.now()).getTime()) / 86400000
                                                        )
                                                            .toString()
                                                            .split(".", 1)}{" "}
                                                        gün
                                                    </Table.Cell>
                                                    <Table.Cell content={jobAdvertisement.createdDate} />
                                                    <Table.Cell>
                                                        <Button
                                                            color="linkedin"
                                                            icon="exchange"
                                                            circular compact
                                                            onClick={() => changeAdvertStatus(jobAdvertisement.advertId)} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="employerListTitle"
                                name="passives"
                                icon="cancel"
                                content="Yayında Olmayan İlanlar"
                                active={activeItem === "passives"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "passives"}>
                                <Table compact stackable
                                    textAlign="center" size="small" celled="internally">
                                    <Table.Row warning>
                                        <Table.HeaderCell content="Pozisyon" />
                                        <Table.HeaderCell content="Maaş(TL)" />
                                        <Table.HeaderCell content="Şehir" />
                                        <Table.HeaderCell content="Açıklama" />
                                        <Table.HeaderCell content="Çalışma Zamanı" />
                                        <Table.HeaderCell content="Çalışma Şekli" />
                                        <Table.HeaderCell content="Eklenme Tarihi" />
                                        <Table.HeaderCell content="Durum Güncelle" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            passiveAdvertisements.map(passiveAdvert => (
                                                <Table.Row warning key={passiveAdvert.advertId}>
                                                    <Table.Cell content={passiveAdvert.position?.positionName} />
                                                    <Table.Cell content={`${passiveAdvert.minSalary} - ${passiveAdvert.maxSalary}`} />
                                                    <Table.Cell content={passiveAdvert.city?.cityName} />
                                                    <Table.Cell width="6" content={passiveAdvert.jobDescription} />
                                                    <Table.Cell content={passiveAdvert.employmentType?.typeName} />
                                                    <Table.Cell content={passiveAdvert.employmentTime?.timeName} />
                                                    <Table.Cell content={passiveAdvert.createdDate} />
                                                    <Table.Cell>
                                                        <Button
                                                            color="linkedin"
                                                            icon="exchange"
                                                            circular compact
                                                            onClick={() => changeAdvertStatus(passiveAdvert.advertId)} />
                                                    </Table.Cell>
                                                </Table.Row>

                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="employerListTitle"
                                name="waiting"
                                icon="hourglass half"
                                content="Onay Bekleyen İlanlar"
                                active={activeItem === "waiting"}
                                onClick={handleItemClik}
                            />
                            <Accordion.Content
                                active={activeItem === "waiting"}>
                                <Table compact stackable
                                    textAlign="center" size="small" celled="internally" >
                                    <Table.Row negative>
                                        <Table.HeaderCell content="Pozisyon" />
                                        <Table.HeaderCell content="Maaş(TL)" />
                                        <Table.HeaderCell content="Kontenjan" />
                                        <Table.HeaderCell content="Şehir" />
                                        <Table.HeaderCell content="Çalışma Şekli" />
                                        <Table.HeaderCell content="Çalışma Zamanı" />
                                        <Table.HeaderCell content="Son Kabul" />
                                        <Table.HeaderCell content="Eklenme Tarihi" />
                                        <Table.HeaderCell content="Durum" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            waitingAdvertisements.map(waitingAdvert => (
                                                <Table.Row negative key={waitingAdvert.advertId}>
                                                    <Table.Cell content={waitingAdvert.position?.positionName} />
                                                    <Table.Cell content={`${waitingAdvert.minSalary} - ${waitingAdvert.maxSalary}`} />
                                                    <Table.Cell content={waitingAdvert.quota} />
                                                    <Table.Cell content={waitingAdvert.city?.cityName} />
                                                    <Table.Cell content={waitingAdvert.employmentType?.typeName} />
                                                    <Table.Cell content={waitingAdvert.employmentTime?.timeName} />
                                                    <Table.Cell >
                                                        {(
                                                            (new Date(waitingAdvert.lastApplication).getTime() - new Date(Date.now()).getTime()) / 86400000
                                                        )
                                                            .toString()
                                                            .split(".", 1)}{" "}
                                                        gün
                                                    </Table.Cell>
                                                    <Table.Cell content={waitingAdvert.createdDate} />
                                                    <Table.Cell content={
                                                        waitingAdvert.advertIsConfirmed ? null : "Awaiting approval."
                                                    } />
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}
