import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, Button, Card, Grid, Image, Table, Container, Icon } from 'semantic-ui-react'
import UnemployedService from '../services/UnemployedService'
import EducationService from '../services/EducationService'
import JobExperienceService from '../services/JobExperienceService'
import TechnologyService from '../services/TechnologyService'
import LanguageService from '../services/LanguageService'
import CoverLetterService from '../services/CoverLetterService'
import PhotoUploadService from '../services/PhotoUploadService'
import LinkService from '../services/LinkService'
import HandleActiveMenuItem from '../utils/HandleActiveMenuItem'

export default function UnemployedProfile() {

    HandleActiveMenuItem()

    const [activeItem, setActiveItem] = useState("educations")

    function handleItemClik(e, { name }) {
        if (activeItem === name) {
            setActiveItem("null")
        } else {
            setActiveItem(name)
        }
    }

    let { unemployedId } = useParams()
    const [unemployed, setUnemployed] = useState([])
    const [educations, setEducations] = useState([])
    const [languages, setLanguages] = useState([])
    const [jobExperiences, setJobExperiences] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [coverLetters, setCoverLetters] = useState([])
    const [links, setLinks] = useState([])
    const [photo, setPhoto] = useState([])

    useEffect(() => {
        let unemployedService = new UnemployedService()
        let educationService = new EducationService()
        let languageService = new LanguageService()
        let jobExperienceService = new JobExperienceService()
        let technologyService = new TechnologyService()
        let coverLetterService = new CoverLetterService()
        let photoService = new PhotoUploadService()
        let linkService = new LinkService()

        unemployedService.getByUserId(unemployedId).then((result) => setUnemployed(result.data.data))
        educationService.getByUnemployedIdOrderByGraduatedDate(unemployedId).then((result) => setEducations(result.data.data))
        languageService.getByUnemployedId(unemployedId).then((result) => setLanguages(result.data.data))
        jobExperienceService.getByUnemployedIdOrderByLeaveDate(unemployedId).then((result) => setJobExperiences(result.data.data))
        technologyService.getByUnemployedId(unemployedId).then((result) => setTechnologies(result.data.data))
        coverLetterService.getByUnemployedId(unemployedId).then((result) => setCoverLetters(result.data.data))
        photoService.getByUnemployedId(unemployedId).then((result) => setPhoto(result.data.data))
        linkService.getByUnemployedId(unemployedId).then((result) => setLinks(result.data.data))
    }, [unemployedId])

    return (
        <div className="pages">
            <Grid
                stackable
                style={{ paddingLeft: "3em", paddingRight: "3em" }}>
                <Grid.Row>
                    <Grid.Column
                        mobile="16" tablet="8" computer="4">
                        <Card fluid>
                            <Image
                                style={{ maxHeight: "500px" }}
                                src={photo.photoUrl} />
                            <Card.Header
                                content={`${unemployed.firstName} ${unemployed.lastName}`} />
                            <Card.Meta
                                content={unemployed.email} />
                            <Card.Content>
                                <Button
                                    style={{ marginBottom: "5px", letterSpacing: "1px" }}
                                    color="twitter"
                                    content="View CV"
                                    fluid compact circular />
                                <Button
                                    style={{ letterSpacing: "1px" }}
                                    color="google plus"
                                    content="Update Information"
                                    fluid compact circular />
                            </Card.Content>
                            <Card.Content>
                                <Button
                                    target="_blank"
                                    href={links.githubLink}
                                    style={{ marginRight: "5px" }}
                                    circular active
                                    color="black" >
                                    <Icon name="github" />
                                    Github
                                </Button>
                                <Button
                                    target="_blank"
                                    href={links.linkedinLink}
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
                                style={{ fontSize: "20px" }}
                                name="educations"
                                icon="book"
                                content="Educations"
                                active={activeItem === "educations"}
                                onClick={handleItemClik}>
                            </Accordion.Title>
                            <Accordion.Content
                                active={activeItem === "educations"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            School Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Department
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Start Date
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Graduated Date
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            educations.map(education => (
                                                <Table.Row key={education.educationId}>
                                                    <Table.Cell>{education.schoolName}</Table.Cell>
                                                    <Table.Cell>{education.department}</Table.Cell>
                                                    <Table.Cell>{education.startDate}</Table.Cell>
                                                    <Table.Cell>
                                                        {
                                                            education.graduatedDate == null ? "Continues" : education.graduatedDate
                                                        }
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
                                style={{ fontSize: "20px" }}
                                name="languages"
                                icon="language"
                                content="Languages"
                                active={activeItem === "languages"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "languages"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Language
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Language Level(1 - 5)
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            languages.map(language => (
                                                <Table.Row key={language.languageId}>
                                                    <Table.Cell>{language.languageName}</Table.Cell>
                                                    <Table.Cell>{language.languageLevel}</Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "20px" }}
                                name="technologies"
                                icon="js"
                                content="Technologies"
                                active={activeItem === "technologies"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "technologies"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Technology
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Technology Level(1 - 5)
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            technologies.map(technology => (
                                                <Table.Row key={technology.technologyId}>
                                                    <Table.Cell>{technology.technologyName}</Table.Cell>
                                                    <Table.Cell>{technology.technologyLevel}</Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled style={{ marginBottom: "20px" }}>
                            <Accordion.Title
                                style={{ fontSize: "20px" }}
                                name="jobExperiences"
                                icon="linkedin alternate"
                                content="Job Experiences"
                                active={activeItem === "jobExperiences"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "jobExperiences"}>
                                <Table textAlign="center">
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Workplace Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Position
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Start Date
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Leave Date
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Body>
                                        {
                                            jobExperiences.map(jobExperience => (
                                                <Table.Row key={jobExperience.experienceId}>
                                                    <Table.Cell>{jobExperience.workplaceName}</Table.Cell>
                                                    <Table.Cell>{jobExperience.positionName}</Table.Cell>
                                                    <Table.Cell>{jobExperience.startDate}</Table.Cell>
                                                    <Table.Cell>
                                                        {
                                                            jobExperience.leaveDate == null ? "Continues" : jobExperience.leaveDate
                                                        }
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
                                style={{ fontSize: "20px" }}
                                name="coverLetters"
                                icon="file alternate"
                                content="Cover Letter"
                                active={activeItem === "coverLetters"}
                                onClick={handleItemClik} />
                            <Accordion.Content
                                active={activeItem === "coverLetters"}>
                                {
                                    coverLetters.map(coverLetter => (
                                        <Container key={coverLetter.letterId}>
                                            {coverLetter.letterContent}
                                        </Container>
                                    ))
                                }
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
