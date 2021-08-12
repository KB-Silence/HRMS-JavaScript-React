import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, Button, Card, Grid, Image, Table, Container, Icon, Modal } from 'semantic-ui-react'
import UnemployedService from '../services/UnemployedService'
import HandleActiveMenuItem from '../utils/HandleActiveMenuItem'
import UpdateCoverLetter from '../layouts/ManageInformation/UpdateCoverLetter'
import UpdateLanguage from '../layouts/ManageInformation/UpdateLanguage'
import UpdateTechnology from '../layouts/ManageInformation/UpdateTechnology'
import UpdateEducation from '../layouts/ManageInformation/UpdateEducation'
import UpdateJobExperience from '../layouts/ManageInformation/UpdateJobExperience'
import UpdatePhoto from '../layouts/ManageInformation/UpdatePhoto'
import UpdateLink from '../layouts/ManageInformation/UpdateLink'
import ViewCv from '../layouts/ManageInformation/ViewCv'

export default function UnemployedProfile() {

    let { unemployedId } = useParams()

    HandleActiveMenuItem()
    function handleItemClik(e, { name }) {
        if (activeItem === name) {
            setActiveItem("null")
        } else {
            setActiveItem(name)
        }
    }
    function handleModalClick(e, { name }) {
        if (activeModalItem === name) {
            setActiveModalItem("null")
        } else {
            setActiveModalItem(name)
        }
    }
    function handleSubModalClick(e, { name }) {
        if (activeSubModal === name) {
            setActiveSubModal("null")
        } else {
            setActiveSubModal(name)
        }
    }

    const [activeItem, setActiveItem] = useState("educations")
    const [activeModalItem, setActiveModalItem] = useState("coverLetter")
    const [activeSubModal, setActiveSubModal] = useState("addLanguage")
    const [open, setOpen] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)

    const [unemployed, setUnemployed] = useState([])
    const [cv, setCv] = useState([])

    useEffect(() => {
        let unemployedService = new UnemployedService()
        unemployedService.getByUserId(unemployedId).then((result) => setUnemployed(result.data.data))
        unemployedService.createCv(unemployedId).then((result) => setCv(result.data.data))
    }, [unemployedId])

    function updateCv() {
        let unemployedService = new UnemployedService()
        unemployedService.createCv(unemployedId).then((result) => setCv(result.data.data))
    }

    return (
        <div className="pages">
            <Modal
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
                <Modal.Header >
                    {`${unemployed.firstName}'s CV`}
                    <Button compact negative circular basic
                        floated="right" icon="cancel"
                        onClick={() => setOpen(false)} />
                </Modal.Header>
                <Modal.Content>
                    <ViewCv unemployed={unemployed} cv={cv} />
                </Modal.Content>
            </Modal>

            <Modal
                size="large"
                onClose={() => setOpenInfo(false)}
                onOpen={() => setOpenInfo(true)}
                open={openInfo} >
                <Modal.Header className="manageInfoHeader" content="Bilgilerini Yönet" />
                <Modal.Content className="manageInfoMainContent">
                    <Modal.Description>
                        <Accordion fluid styled style={{ textAlign: "center" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Ön Yazı Bilgileri"
                                name="coverLetter"
                                active={activeModalItem === "coverLetter"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "coverLetter"}>
                                <UpdateCoverLetter unemployedId={unemployedId} updateCv={updateCv} />
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Dil Bilgileri"
                                name="language"
                                active={activeModalItem === "language"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "language"}>
                                <UpdateLanguage
                                    updateCv={updateCv}
                                    unemployedId={unemployedId}
                                    activeSubModal={activeSubModal}
                                    handleSubModalClick={handleSubModalClick} />
                            </Accordion.Content>
                        </Accordion >

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Teknoloji Bilgileri"
                                name="technology"
                                active={activeModalItem === "technology"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "technology"}>
                                <UpdateTechnology
                                    updateCv={updateCv}
                                    unemployedId={unemployedId}
                                    activeSubModal={activeSubModal}
                                    handleSubModalClick={handleSubModalClick} />
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Eğitim Bilgileri"
                                name="education"
                                active={activeModalItem === "education"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "education"}>
                                <UpdateEducation
                                    updateCv={updateCv}
                                    unemployedId={unemployedId}
                                    activeSubModal={activeSubModal}
                                    handleSubModalClick={handleSubModalClick} />
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="İş Tecrübesi Bilgileri"
                                name="jobExperience"
                                active={activeModalItem === "jobExperience"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "jobExperience"}>
                                <UpdateJobExperience
                                    updateCv={updateCv}
                                    unemployedId={unemployedId}
                                    activeSubModal={activeSubModal}
                                    handleSubModalClick={handleSubModalClick} />
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Profil Fotoğrafı"
                                name="photo"
                                active={activeModalItem === "photo"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "photo"}>
                                <UpdatePhoto
                                    updateCv={updateCv}
                                    unemployedId={unemployedId}
                                    activeSubModal={activeSubModal}
                                    handleSubModalClick={handleSubModalClick} />
                            </Accordion.Content>
                        </Accordion>

                        <Accordion fluid styled style={{ textAlign: "center", marginTop: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "15px", letterSpacing: "2px" }}
                                icon={false}
                                content="Bağlantılar"
                                name="link"
                                active={activeModalItem === "link"}
                                onClick={handleModalClick} />
                            <Accordion.Content className="manageInformationSubContent"
                                active={activeModalItem === "link"}>
                                <UpdateLink
                                    updateCv={updateCv}
                                    unemployedId={unemployedId} />
                            </Accordion.Content>
                        </Accordion>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

            <Grid
                stackable
                style={{ paddingLeft: "3em", paddingRight: "3em" }}>
                <Grid.Row>
                    <Grid.Column
                        mobile="16" tablet="8" computer="4">
                        <Card fluid>
                            <Image
                                style={{ maxHeight: "500px" }}
                                src={cv.photo?.photoUrl} />
                            <Card.Header
                                content={`${unemployed.firstName} ${unemployed.lastName}`} />
                            <Card.Meta
                                content={unemployed.email} />
                            <Card.Content>
                                <Button
                                    style={{ marginBottom: "5px", letterSpacing: "1px" }}
                                    color="twitter"
                                    content="CV'yi Gör"
                                    fluid compact circular
                                    onClick={() => setOpen(true)} />
                                <Button
                                    style={{ letterSpacing: "1px" }}
                                    color="google plus"
                                    content="Bilgilerini Güncelle"
                                    onClick={() => setOpenInfo(true)}
                                    fluid compact circular />
                            </Card.Content>
                            <Card.Content>
                                <Button
                                    target="_blank"
                                    href={cv.link?.githubLink}
                                    style={{ marginRight: "5px" }}
                                    circular active
                                    color="black" >
                                    <Icon name="github" />
                                    Github
                                </Button>
                                <Button
                                    target="_blank"
                                    href={cv.link?.linkedinLink}
                                    style={{ marginLeft: "5px" }}
                                    circular active
                                    color="linkedin">
                                    <Icon name="linkedin" />
                                    Linkedin
                                </Button>
                            </Card.Content>
                            <Card.Content
                                extra textAlign="left"
                                content=
                                {(
                                    (new Date(unemployed.birthDate).toDateString())
                                )} />
                        </Card>
                    </Grid.Column >
                    <Grid.Column
                        verticalAlign="middle"
                        mobile="16" tablet="8" computer="12" >
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="unemployedProfileTitle"
                                name="educations"
                                icon="book"
                                content="Eğitim Bilgileri"
                                active={activeItem === "educations"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "educations"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell content="Okul Adı" />
                                        <Table.HeaderCell content="Bölüm Adı" />
                                        <Table.HeaderCell content="Başlama Tarihi" />
                                        <Table.HeaderCell content="Mezuniyet Tarihi" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            cv.educations?.map(education => (
                                                <Table.Row key={education.educationId}>
                                                    <Table.Cell content={education.schoolName} />
                                                    <Table.Cell content={education.department} />
                                                    <Table.Cell content={education.startDate} />
                                                    <Table.Cell
                                                        content={education.graduatedDate == null ? "Devam Ediyor" : education.graduatedDate} />
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="unemployedProfileTitle"
                                name="languages"
                                icon="language"
                                content="Dil Bilgileri"
                                active={activeItem === "languages"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "languages"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell content="Dil Adı" />
                                        <Table.HeaderCell content="Dil Seviyesi(1 - 5)" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            cv.languages?.map(language => (
                                                <Table.Row key={language.languageId}>
                                                    <Table.Cell content={language.languageName} />
                                                    <Table.Cell content={language.languageLevel} />
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="unemployedProfileTitle"
                                name="technologies"
                                icon="js"
                                content="Teknoloji Bilgileri"
                                active={activeItem === "technologies"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "technologies"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell content="Teknoloji Adı" />
                                        <Table.HeaderCell content="Teknoloji Seviyesi(1 - 5)" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            cv.technologies?.map(technology => (
                                                <Table.Row key={technology.technologyId}>
                                                    <Table.Cell content={technology.technologyName} />
                                                    <Table.Cell content={technology.technologyLevel} />
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="unemployedProfileTitle"
                                name="jobExperiences"
                                icon="linkedin alternate"
                                content="İş Tecrübeleri"
                                active={activeItem === "jobExperiences"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "jobExperiences"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell content="İşyeri Adı" />
                                        <Table.HeaderCell content="Pozisoyn Adı" />
                                        <Table.HeaderCell content="Başlama Tarihi" />
                                        <Table.HeaderCell content="Ayrılma Tarihi" />
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            cv.jobExperiences?.map(jobExperience => (
                                                <Table.Row key={jobExperience.experienceId}>
                                                    <Table.Cell content={jobExperience.workplaceName} />
                                                    <Table.Cell content={jobExperience.positionName} />
                                                    <Table.Cell content={jobExperience.startDate} />
                                                    <Table.Cell
                                                        content={jobExperience.leaveDate == null ? "Devam Ediyor" : jobExperience.leaveDate} />
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                className="unemployedProfileTitle"
                                name="coverLetters"
                                icon="file alternate"
                                content="Ön Yazı"
                                active={activeItem === "coverLetters"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "coverLetters"}>
                                <Container>
                                    {cv.coverLetter?.letterContent}
                                </Container>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}
