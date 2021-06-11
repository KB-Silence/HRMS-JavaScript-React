import React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

export default function ServiceSection() {
    return (
        <div id="services" className="section serviceSection">
            <Container className="serviceContainer">
                <Grid stackable textAlign='center'>
                    <Grid.Row className="serviceMainGridRow">
                        <Grid.Column mobile='16' tablet='12' computer='10' largeScreen="13" >
                            <Header className="serviceHeader" dividing as='h2'>What is HRMS?</Header>
                            <Header.Content className='serviceMainContent'>Human Resource Management is the process of recruiting, selecting, inducting employees, providing orientation, imparting training and development, appraising the performance of employees, deciding compensation and providing benefits, motivating employees, maintaining proper relations with employees and their trade unions, ensuring employees safety, welfare and healthy measures in compliance with labour laws of the land and finally following the Orders / Judgements of the concern High Court and Supreme Court, if any.
                            </Header.Content>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ marginTop: "15px" }}>
                        <Grid.Column>
                            <Grid verticalAlign="middle" columns="2" stackable divided container>
                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular inverted color="teal" name="street view" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'>You can advertise for your business. You set the criteria and you can hire people with the qualifications you are looking for. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular inverted color="teal" name="building outline" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'>You can view active job advertisements and details. You can create a CV and apply for the job you want. You can work in your dream job with pleasure. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular inverted color="teal" name="code branch" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'>As a volunteer, you become an employee of our system. You can help us improve the project and reach more people. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
