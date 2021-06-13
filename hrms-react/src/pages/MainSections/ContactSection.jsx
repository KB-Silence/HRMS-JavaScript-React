import React from 'react'
import { Container, Grid, Header, Icon, Form, List, Divider } from 'semantic-ui-react'

export default function ContactSection() {
    return (
        <div id="contact" className="section contactSection">
            <Container className="contactContainer">
                <Grid columns="2" stackable textAlign="center" container >
                    <Grid.Row centered>
                        <Grid.Column largeScreen="16" textAlign="center">
                            <Header inverted className="contactHeader" as="h2">CONTACT US</Header>
                            <Header.Content className="contactContent">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet elit ut massa gravida consectetur. Integer at nibh auctor.
                            </Header.Content>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                        <Grid.Column>
                            <Form>
                                <Form.Field className="contactFormInput">
                                    <Form.Input icon="users" focus placeholder="First Name" />
                                </Form.Field>
                                <Form.Field className="contactFormInput">
                                    <Form.Input icon="envelope" focus placeholder="Email" />
                                </Form.Field>
                                <Form.Field className="contactFormInput">
                                    <Form.TextArea rows="6" placeholder="Message" />
                                </Form.Field>
                                <Form.Button color='google plus' labelPosition='right' icon='share' content="Send" />
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign="top" textAlign="left">
                            <List>
                                <List.Item>
                                    <Icon className="contactInformationIcon" name="map" inverted size="large" />
                                    <List.Content>
                                        <Header className="contactInformationHeader" inverted size="large">Office Address</Header>
                                        <Header.Content className="contactContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<p>Integer mollis.</p></Header.Content>
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider hidden />
                            <List>
                                <List.Item>
                                    <Icon className="contactInformationIcon" name="phone volume" inverted size="large" />
                                    <List.Content>
                                        <Header className="contactInformationHeader" inverted size="large">Office Number</Header>
                                        <Header.Content className="contactContent">+90 (212) 777 22 77</Header.Content>
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider hidden />
                            <List>
                                <List.Item>
                                    <Icon className="contactInformationIcon" name="envelope outline" inverted size="large" />
                                    <List.Content>
                                        <Header className="contactInformationHeader" size="large" inverted>Contact Mail</Header>
                                        <Header.Content className="contactContent">berkcanserbest5@gmail.com</Header.Content>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
