import React, { useEffect, useState } from 'react'
import { Table, Button, Header, Container, Pagination, Dropdown } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import HandleActiveMenuItem from '../../utils/HandleActiveMenuItem'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import JobAdvertFavoriteService from '../../services/JobAdvertFavoriteService'
import AdvertisementFilterOption from '../../layouts/advertisementFilter/AdvertisementFilterOption'

export default function JobAdvertisementList() {

    HandleActiveMenuItem()

    const [jobAdvertisements, setjobAdvertisements] = useState([])
    let [favorites, setFavorites] = useState([])

    const { authInitial } = useSelector(state => state.auth)

    let [activePage, setActivePage] = useState(1)
    let [filterOption, setFilterOption] = useState({})
    let [pageSize, setPageSize] = useState(5)
    let [totalPageSize, setTotalPageSize] = useState(0)

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        let jobAdvertFavoriteService = new JobAdvertFavoriteService()
        jobAdvertisementService.getByApprovedAndFilter(activePage, pageSize, filterOption).then((result) => {
            setjobAdvertisements(result.data.data)
            setTotalPageSize(parseInt(result.data.message))
        })
        if (authInitial[0].login && authInitial[0].user.userType === 1) {
            jobAdvertFavoriteService.getByUnemployedId(authInitial[0].user.id).then((result) => {
                setFavorites(result.data.data.map((favoriteAdvert) => (
                    favoriteAdvert.jobAdvertisement.advertId
                )))
            })
        }
    }, [filterOption, activePage, pageSize, authInitial])

    const handleFilterClick = (filterOption) => {
        if (filterOption.cityId.length === 0) {
            filterOption.cityId = null
        }
        if (filterOption.positionId.length === 0) {
            filterOption.positionId = null
        }
        if (filterOption.timeId.length === 0) {
            filterOption.timeId = null
        }
        if (filterOption.typeId.length === 0) {
            filterOption.typeId = null
        }
        setFilterOption(filterOption)
        setActivePage(1)
    }

    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage)
    }

    let jobAdvertFavoriteService = new JobAdvertFavoriteService()
    const handleAddFavorite = (advertId) => {
        jobAdvertFavoriteService.addFavorite(advertId, authInitial[0].user.id).then((result) => {
            toast.success(result.data.message)
            favorites.push(advertId)
            setFavorites([...favorites])
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const handlePaginationSizeChange = (value) => {
        setPageSize(value)
        console.log(pageSize)
    }

    const paginationOptions = [
        { key: 5, text: "5 Adverts", value: 5 },
        { key: 10, text: "10 Adverts", value: 10 },
        { key: 25, text: "25 Adverts", value: 25 },
        { key: 50, text: "50 Adverts", value: 50 },
        { key: 100, text: "100 Adverts", value: 100 },
    ]

    return (
        <Container className="pages advertList" fluid style={{ paddingLeft: "3em", paddingRight: "3em" }}>
            <AdvertisementFilterOption clickEvent={handleFilterClick} />
            <Table
                selectable stackable compact sortable
                style={{ paddingLeft: "1vh", paddingRight: "1vh" }}
                color="olive" celled size="small">
                <Table.Header>
                    <tr><td>
                        <Header
                            style={{
                                margin: "7px",
                                borderRadius: "20%",
                                textAlign: "center"
                            }}
                            color="grey" dividing size="large" content="Job Advertisements" />
                    </td></tr>
                    <Table.Row>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Salary(TL)</Table.HeaderCell>
                        <Table.HeaderCell>Quota</Table.HeaderCell>
                        <Table.HeaderCell>Last Application</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>

                        {authInitial[0].login && authInitial[0].user.userType === 1 &&
                            <Table.HeaderCell>Add to Favorites</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {
                        jobAdvertisements.map(jobAdvertisement => (
                            <Table.Row key={jobAdvertisement.advertId}>
                                <Table.Cell>{jobAdvertisement.position.positionName}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.minSalary} - {jobAdvertisement.maxSalary}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.quota}</Table.Cell>
                                <Table.Cell>
                                    {(
                                        (new Date(jobAdvertisement.lastApplication).getTime() - new Date(Date.now()).getTime()) / 86400000
                                    )
                                        .toString()
                                        .split(".", 1)}{" "}
                                    day
                                </Table.Cell>
                                <Table.Cell>{jobAdvertisement.city.cityName}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        as={Link} to={`/jobAdvertisement/${jobAdvertisement.advertId}`}
                                        circular content='Details' fluid negative size='small' />
                                </Table.Cell>
                                {
                                    authInitial[0].login && authInitial[0].user.userType === 1 &&
                                    <Table.Cell>
                                        <Button
                                            size="small" content="Add"
                                            circular fluid
                                            disabled={favorites.includes(jobAdvertisement.advertId) ? true : false}
                                            color={favorites.includes(jobAdvertisement.advertId) ? "grey" : "twitter"}
                                            onClick={() => handleAddFavorite(jobAdvertisement.advertId)} />
                                    </Table.Cell>
                                }
                            </Table.Row>
                        ))}
                </Table.Body>
                <Table.Footer>
                    <tr><td>
                        <Pagination
                            style={{ marginBottom: "5px" }}
                            firstItem={null}
                            lastItem={null}
                            activePage={activePage}
                            onPageChange={handlePaginationChange}
                            totalPages={Math.ceil(totalPageSize / pageSize)} />
                        <Dropdown
                            selection
                            text={"Pagination: " + pageSize}
                            defaultValue={pageSize}
                            options={paginationOptions}
                            onChange={(e, data) => {
                                setActivePage(1)
                                setPageSize(data.value)
                                handlePaginationSizeChange(data.value)
                            }} />
                    </td></tr>
                </Table.Footer>
            </Table>
        </Container>
    )
}
