import React from 'react'
import { Container, Grid, Header, Item, Image, Icon, Divider } from 'semantic-ui-react'
import myImage from './homeImages/brkcn.png'
import myTeach from './homeImages/enginhocam.jpg'
import teamImage from './homeImages/team.png'

export default function TeamSection() {
    return (
        <div id="team" className="section teamSection">
            <Container className="teamContainer">
                <Grid stackable textAlign="center" columns='3' container>
                    <Grid.Row>
                        <Grid.Column largeScreen="16" mobile='16' tablet='12' computer='10' >
                            <Header className='teamHeader' as='h2'>Who Are We?</Header>
                            <Header.Content className='teamMainContent'>
                                <span className="teamMainPersonName">Engin Demiroğ;</span> Owner of Microsoft Certified Trainer (MCT), PMP and ITIL certificates.</Header.Content>
                            <Header.Content className='teamMainContent'>
                                <span className="teamMainPersonName">Berkcan Serbest;</span> You are an IProductDal. </Header.Content>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column tablet="8">
                            <Image size="large" fluid circular centered src={teamImage} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Grid verticalAlign="middle" columns="2">
                                <Grid.Column tablet="16" computer="8">
                                    <Image circular spaced src={myTeach} fluid />
                                </Grid.Column>
                                <Grid.Column tablet="16" computer="8">
                                    <Header dividing className="teamPersonHeader" content="Engin Demiroğ" />
                                    <Item className="teamPersonContent" meta="Ceo & Owner" />
                                    <Divider />
                                    <Icon circular inverted link name="instagram" />
                                    <Icon circular inverted link name="linkedin" />
                                    <Icon circular inverted link name="github" />
                                    <Icon circular inverted link name="discord" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>

                        <Grid.Column>
                            <Grid verticalAlign="middle" columns="2">
                                <Grid.Column tablet="16" computer="8">
                                    <Image circular spaced src={myImage} fluid />
                                </Grid.Column>
                                <Grid.Column tablet="16" computer="8" >
                                    <Header dividing className="teamPersonHeader" content="Berkcan Serbest" />
                                    <Item className="teamPersonContent" meta="Developer" />
                                    <Divider />
                                    <Icon circular inverted link name="instagram" />
                                    <Icon circular inverted link name="linkedin" />
                                    <Icon circular inverted link name="github" />
                                    <Icon circular inverted link name="discord" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
