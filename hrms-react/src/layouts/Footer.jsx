import React from 'react'
import { Container, Header } from 'semantic-ui-react'

export default function Footer() {
    return (
        <div>
            <Container className="footer" fluid textAlign="center">
                <Header className="footerHeader" dividing content="HRMS.com" />
                <Header.Content className="footerSubContent">Copyright 2021 by Berkcan Serbest</Header.Content>
                <Header.Content className="footerSubContent">HRMS.com is Powered By Semantic Ui React</Header.Content>
            </Container>
        </div>
    )
}
