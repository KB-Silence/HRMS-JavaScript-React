import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Button } from 'semantic-ui-react'

export default function Register() {
    return (
        <div className="pages">
            <Grid textAlign="center" verticalAlign="middle" style={{ height: "64vh" }}>
                <Grid.Row>
                    <Grid.Column className="registerEmployer" mobile="15" tablet="8" computer="6">
                        <Container style={{marginTop:"90px"}}>
                            <Button className="registerToButton" as={Link} to="/employerRegister" 
                            inverted secondary fluid content="Click for Employer Register" />
                        </Container>
                    </Grid.Column>
                    <Grid.Column className="registerUnemployed" mobile="15" tablet="8" computer="6">
                        <Container style={{marginTop:"90px"}}>
                            <Button className="registerToButton" as={Link} to="/unemployedRegister" 
                            inverted secondary fluid content="Click for Unemployed Register" />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
