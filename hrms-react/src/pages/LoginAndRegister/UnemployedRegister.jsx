import React from 'react'
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react'

export default function UnemployedRegister() {
    return (
        <div className="pages">
            <Grid textAlign="center" verticalAlign="middle" style={{ height: "64vh" }}>
                <Grid.Column mobile="15" tablet="8" computer="6">
                    <Header textAlign="center" content="Create your account."
                        style={{ color: "#404040" }} />
                    <Form size="small">
                        <Segment stacked style={{ borderRadius: "10px/10px" }}>
                            <Form.Field>
                                <Form.Input fluid icon="add user" iconPosition="left" placeholder="First Name" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="add user" iconPosition="left" placeholder="Last Name" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="id card" iconPosition="left" placeholder="Nationality Id" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="birthday" iconPosition="left" placeholder="YYYY.mm.DD" type="date" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="phone" iconPosition="left" placeholder="Phone Number" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="at" iconPosition="left" placeholder="Email" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="Password" type="password" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="unlock alternate" iconPosition="left" placeholder="Confirm Password" type="password" />
                            </Form.Field>
                            <Button size="large" compact fluid icon="coffee" labelPosition="right" content="Let's Start"
                                style={{ background: "#740303", color: "white", borderRadius: "10px/10px" }} />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}
