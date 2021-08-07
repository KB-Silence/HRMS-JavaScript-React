import React from 'react'
import { Button, Grid, Header, Icon, Table } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import JobAdvertFavoriteService from '../../services/JobAdvertFavoriteService'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import HandleActiveMenuItem from '../../utils/HandleActiveMenuItem'

export default function JobAdvertisementDetail() {

    HandleActiveMenuItem()

    let { advertId } = useParams()
    const { authInitial } = useSelector(state => state.auth)
    const [jobAdvertisement, setJobAdvertisement] = useState({})
    let [favoriteAdverts, setFavoriteAdverts] = useState([])

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        let jobAdvertFavoriteService = new JobAdvertFavoriteService()
        jobAdvertisementService.getByAdvertId(advertId).then((result) => setJobAdvertisement(result.data.data))
        if (authInitial[0].login && authInitial[0].user.userType === 1) {
            jobAdvertFavoriteService.getByUnemployedId(authInitial[0].user.id).then((result) => {
                setFavoriteAdverts(result.data.data.map((favoriteAdverts) => (
                    favoriteAdverts.jobAdvertisement.advertId
                )))
            })
        }
    }, [advertId, authInitial])

    const handleAddFavorites = (jobAdvertId) => {
        let jobAdvertFavoriteService = new JobAdvertFavoriteService()
        jobAdvertFavoriteService.addFavorite(jobAdvertId, authInitial[0].user.id).then((result) => {
            toast.success(result.data.message)
            favoriteAdverts.push(jobAdvertId)
            setFavoriteAdverts([...favoriteAdverts])
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <div className="pages advertDetail" style={{ marginLeft: "1em", marginRight: "1em"}}>
            <Grid stackable padded>
                <Grid.Row>
                    <Grid.Column mobile="6" tablet="6" computer="8">
                        <Table celled stackable>
                            <Table.Header>
                                <Table.Row style={{ letterSpacing: "2px" }}>
                                    <Table.HeaderCell>Employer</Table.HeaderCell>
                                    <Table.HeaderCell>Information</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row textAlign="left">
                                    <Table.Cell>
                                        <Header as="h5">
                                            <Header.Content>
                                                <Icon name="building" />
                                                Company
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employer?.companyName}</Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign="left">
                                    <Table.Cell>
                                        <Header as="h5">
                                            <Header.Content>
                                                <Icon name="mail" />
                                                Email
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employer?.email}</Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign="left">
                                    <Table.Cell>
                                        <Header as="h5">
                                            <Header.Content>
                                                <Icon name="phone" />
                                                Phone
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employer?.phoneNumber}</Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign="left">
                                    <Table.Cell>
                                        <Header as="h5">
                                            <Header.Content>
                                                <Icon name="world" />
                                                Web Site
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employer?.webSite}</Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign="left">
                                    <Table.Cell>
                                        <Header as="h5">
                                            <Header.Content>
                                                <Icon name="list ul" />
                                                Details
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="google plus" content="Details"
                                            as={Link}
                                            to={`/employers/${jobAdvertisement.employer?.userId}`}>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        {authInitial[0].login && authInitial[0].user.userType === 1 &&
                            <Button
                                fluid
                                style={{ letterSpacing: "2px", fontWeight: "lighter" }}
                                disabled={favoriteAdverts.includes(jobAdvertisement.advertId) ? true : false}
                                color={favoriteAdverts.includes(jobAdvertisement.advertId) ? "grey" : "twitter"} onClick={() => handleAddFavorites(jobAdvertisement.advertId)}>
                                {favoriteAdverts.includes(jobAdvertisement.advertId) ? "Advert has already been added." : "Add to Favorite"}
                            </Button>
                        }
                    </Grid.Column>
                    <Grid.Column mobile="6" tablet="8" computer="8">
                        <Table stackable striped size="small" structured >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell
                                        style={{ letterSpacing: "2px" }}
                                        content="Details" />
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Position</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.position?.positionName}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>City</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.city?.cityName}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Employment Type</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employmentType?.typeName}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Employment Time</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.employmentTime?.timeName}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Min Salary</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.minSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Max Salary</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.maxSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Quota</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.quota}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Created Date</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.createdDate}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Last Application</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.lastApplication}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: "bolder" }}>Description</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.jobDescription}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
