import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table, Button, Header, Container } from 'semantic-ui-react'
import JobAdvertisementService from '../services/JobAdvertisementService'

export default function JobAdvertisementList() {
    const [jobAdvertisements, setjobAdvertisements] = useState([])

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getJobAdvertisements().then(result => setjobAdvertisements(result.data.data))
    }, [])

    return (
        <div className="pages">
            <Container>
                <Header floated='left' color='black' size="large" content="Job Advertisement List" />
                <Table color="olive" celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Salary(TL)</Table.HeaderCell>
                            <Table.HeaderCell>Quota</Table.HeaderCell>
                            <Table.HeaderCell>Last Application</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            jobAdvertisements.map(jobAdvertisement => (
                                <Table.Row key={jobAdvertisement.advertId}>
                                    <Table.Cell>{jobAdvertisement.position.positionName}</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.minSalary}-{jobAdvertisement.maxSalary}</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.quota}</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.lastApplication}</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.city.cityName}</Table.Cell>
                                    <Table.Cell>
                                        <Button circular content='Details' fluid negative size='small'></Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='8'>
                                <Menu size="small" floated="right" borderless pagination >
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        </div>
    )
}
