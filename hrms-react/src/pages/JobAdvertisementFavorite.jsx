import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, Container, Divider, Grid, Header, Segment, Table } from 'semantic-ui-react'
import JobAdvertFavoriteService from '../services/JobAdvertFavoriteService'

export default function JobAdvertisementFavorite() {


    const { authInitial } = useSelector(state => state.auth)
    const [favoriteAdverts, setFavoriteAdverts] = useState([])

    let jobAdvertFavoriteService = new JobAdvertFavoriteService()

    useEffect(() => {
        jobAdvertFavoriteService.getByUnemployedId(authInitial[0].user.id).then((result) => {
            setFavoriteAdverts(result.data.data)
        })
    }, [authInitial])

    const handleRemoveFavorite = (favoriteId) => {
        jobAdvertFavoriteService.deleteFavorite(favoriteId).then((result) => {
            setFavoriteAdverts(favoriteAdverts.filter((favoriteAdvert) => favoriteAdvert.favoriteId !== favoriteId))
            toast.success(result.data.message)
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <Container className="pages" >

            <Grid stackable textAlign="center" verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column mobile="16" tablet="12" computer="10">
                        <Segment piled stacked
                            style={
                                {
                                    borderRadius: "15px",
                                    background: "linear-gradient(to left, #c9d6ff, #e2e2e2)",
                                    letterSpacing: "4px"
                                }} >
                            <Header color="black" content="Your favorites" dividing />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Card.Group>
                <Grid stackable textAlign="center" columns="4" container style={{ marginTop: "1em" }}>
                    <Grid.Row stretched divided>
                        {favoriteAdverts?.map((favoriteAdvert) => (
                            <Grid.Column style={{ marginTop: "1em" }} mobile="16" tablet="6" computer="4" largeScreen="4">
                                <Card>
                                    <Card.Content>
                                        <Card.Header className="favoriteHeader" style={{marginBottom:"5px"}}>
                                            {favoriteAdvert.jobAdvertisement.employer.companyName}
                                        </Card.Header>
                                        <Card.Meta>
                                            {favoriteAdvert.jobAdvertisement.position.positionName}
                                        </Card.Meta>
                                        <Card.Content>
                                            <Card.Meta>
                                                Last Application:
                                                {(
                                                    (new Date(favoriteAdvert.jobAdvertisement.lastApplication).getTime() -
                                                        new Date(Date.now()).getTime()) /
                                                    86400000
                                                )
                                                    .toString()
                                                    .split(".", 1)}{" "}
                                                day
                                            </Card.Meta>
                                        </Card.Content>
                                        <Divider hidden />
                                        <Card.Description textAlign="center" >
                                            {favoriteAdvert.jobAdvertisement.jobDescription}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Button
                                            circular basic
                                            as={Link} to={`/jobAdvertisements/${favoriteAdvert.jobAdvertisement.advertId}`}
                                            color="green" content="Detail" />
                                        <Button
                                            circular basic
                                            color="red" content="Remove"
                                            onClick={() => handleRemoveFavorite(favoriteAdvert.favoriteId)} />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                        ))}
                    </Grid.Row>
                </Grid>
            </Card.Group>

        </Container >
    )
}


{/* <Card fluid>
                <Card.Content
                    header="Your favorite job advertisements." />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>Salary(TL)</Table.HeaderCell>
                            <Table.HeaderCell>Last Application</Table.HeaderCell>
                            <Table.HeaderCell>Details</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {favoriteAdverts?.map((favoriteAdvert) => (
                            <Table.Row key={favoriteAdvert.favoriteId}>
                                <Table.Cell>{favoriteAdvert.jobAdvertisement.employer.companyName}</Table.Cell>
                                <Table.Cell>{favoriteAdvert.jobAdvertisement.position.positionName}</Table.Cell>
                                <Table.Cell>{favoriteAdvert.jobAdvertisement.city.cityName}</Table.Cell>
                                <Table.Cell>{favoriteAdvert.jobAdvertisement.minSalary} - {favoriteAdvert.jobAdvertisement.maxSalary}</Table.Cell>
                                <Table.Cell>
                                    {(
                                        (new Date(favoriteAdvert.jobAdvertisement.lastApplication).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                    )
                                        .toString()
                                        .split(".", 1)}{" "}
                                    day
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        as={Link} to={`/jobAdvertisements/${favoriteAdvert.jobAdvertisement.advertId}`}
                                        circular content='Details' fluid negative size='small'
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        color="red" icon="delete"
                                        circular inverted
                                        onClick={() => handleRemoveFavorite(favoriteAdvert.favoriteId)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card> */}