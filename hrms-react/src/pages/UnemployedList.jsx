import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table, Button, Header } from 'semantic-ui-react'
import UnemployedService from '../services/UnemployedService'

export default function UnemployedList() {
    const [unemployeds, setUnemployeds] = useState([])

    useEffect(() => {
        let unemployedService = new UnemployedService();
        unemployedService.getUnemployeds().then(result=>setUnemployeds(result.data.data))
    }, [])

    return (
        <div>
            <Header floated='left' color='grey'>
                <Header.Content>Unemployed List</Header.Content>
            </Header>
            <Table color="green" celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Firs Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        unemployeds.map(unemployed => (
                            <Table.Row key={unemployed.id}>
                                <Table.Cell>{unemployed.firstName}</Table.Cell>
                                <Table.Cell>{unemployed.lastName}</Table.Cell>
                                <Table.Cell>{unemployed.email}</Table.Cell>
                                <Table.Cell width='2'>
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
        </div>
    )
}
