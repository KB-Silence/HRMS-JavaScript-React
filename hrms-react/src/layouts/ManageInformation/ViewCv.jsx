import React from 'react'
import { Grid, Header, Modal, Image } from 'semantic-ui-react'

export default function ViewCv({ unemployed, cv }) {
    return (

        <Grid textAlign="center" stackable divided centered padded>
            <Grid.Row>
                <Grid.Column mobile="16" tablet="6" computer="6">
                    <Header dividing content="Personal Information" />
                    <Modal.Description style={{ fontSize: "15px" }}>
                        <p>{`Full Name: ${unemployed.firstName} ${unemployed.lastName}`}</p>
                        <p>{`Phone: ${unemployed.phoneNumber}`}</p>
                        <p>{`Email: ${unemployed.email}`}</p>
                        <p>{`Birth Date: ${unemployed.birthDate}`}</p>
                    </Modal.Description>
                </Grid.Column>
                <Grid.Column mobile="16" tablet="6" computer="6">
                    <Header dividing content="Links" />
                    <Modal.Description style={{ fontSize: "15px" }}>
                        <p><a rel="noreferrer" href={cv.link?.githubLink} target="_blank">{`Github`}</a></p>
                        <p><a rel="noreferrer" href={cv.link?.linkedinLink} target="_blank">{`Linkedin`}</a></p>
                    </Modal.Description>
                </Grid.Column>
                <Grid.Column mobile="16" tablet="4" computer="4">
                    <Image size="small" src={cv.photo?.photoUrl} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ marginTop: "2em", padding: "0px" }}>
                <Grid.Column textAlign="center" width="16">
                    <Header dividing content="Cover Letter" />
                    <Modal.Description>
                        <p>{cv.coverLetter?.letterContent}</p>
                    </Modal.Description>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign="center" width="16">
                    <Header dividing content="Job Experiences" />
                    <Modal.Description>
                        {cv.jobExperiences?.map(experience => (
                            <Grid key={experience.experienceId} stackable reversed style={{ marginTop: "0px" }}>
                                <Grid.Row divided>
                                    <Grid.Column width="8" textAlign="right">
                                        <span style={{ fontWeight: "bolder", marginRight: "2em" }}>
                                            {`${experience.startDate} - ${experience.leaveDate == null ? 'Continues' : experience.leaveDate}`}
                                        </span>
                                    </Grid.Column>
                                    <Grid.Column width="8" textAlign="left">
                                        <span>
                                            {experience.workplaceName}
                                        </span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        ))}
                    </Modal.Description>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign="center" width="16">
                    <Header dividing content="Educations" style={{ marginBottom: "5px" }} />
                    <Modal.Description>
                        {cv.educations?.map(education => (
                            <Grid key={education.educationId} stackable reversed style={{ marginTop: "0px" }}>
                                <Grid.Row divided>
                                    <Grid.Column width="8" textAlign="right">
                                        <span style={{ fontWeight: "bolder", marginRight: "2em" }}>
                                            {`${education.startDate} - ${education.graduatedDate == null ? 'Continues' : education.graduatedDate}`}
                                        </span>
                                    </Grid.Column>
                                    <Grid.Column width="8" textAlign="left" >
                                        <span>
                                            {education.schoolName}
                                        </span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        ))}
                    </Modal.Description>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: "1em" }}>
                <Grid.Column textAlign="center" mobile="16" tablet="8" computer="8">
                    <Header dividing content="Languages" />
                    <Modal.Description>
                        {cv.languages?.map(language => (<p key={language.languageId}>{language.languageName}</p>))}
                    </Modal.Description>
                </Grid.Column>
                <Grid.Column textAlign="center" mobile="16" tablet="8" computer="8">
                    <Header dividing content="Technologies" />
                    <Modal.Description>
                        {cv.technologies?.map(technology => (<p key={technology.technologyId}>{technology.technologyName}</p>))}
                    </Modal.Description>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
