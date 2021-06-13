import React from 'react'
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react'

export default function UnemployedLogin() {
    return (
        <div className="pages">
            <Grid textAlign="center" verticalAlign="middle" style={{ height: "64vh" }}>
                <Grid.Column mobile="15" tablet="8" computer="6">
                    <Header textAlign="center" content="Log in to your account."
                        style={{ color: "#404040" }} />
                    <Form size="small">
                        <Segment stacked style={{ borderRadius: "10px/10px" }}>
                            <Form.Field>
                                <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail Address" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
                            </Form.Field>
                            <Button size="large" compact fluid icon="check" labelPosition="right" content="Login"
                                style={{ background: "#740303", color: "white", borderRadius: "10px/10px" }} />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}
