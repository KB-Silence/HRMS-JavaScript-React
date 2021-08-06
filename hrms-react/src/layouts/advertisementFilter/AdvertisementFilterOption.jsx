import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Checkbox, Container, Divider, Dropdown, Label, Segment } from 'semantic-ui-react'
import LittleService from '../../services/LittleService'

export default function AdvertisementFilterOption({ clickEvent }) {

    const [cities, setCities] = useState([])
    const [positions, setPositions] = useState([])
    const [employmentTypes, setEmploymentTypes] = useState([])
    const [employmentTimes, setEmploymentTimes] = useState([])

    const [cityIndex, setCityIndex] = useState([])
    const [positionIndex, setPositionIndex] = useState([])
    const [typeIndex] = useState([])
    const [timeIndex] = useState([])

    useEffect(() => {
        let littleService = new LittleService()

        littleService.getCities().then(result => setCities(result.data.data))
        littleService.getPositions().then(result => setPositions(result.data.data))
        littleService.getEmploymentTypes().then(result => setEmploymentTypes(result.data.data))
        littleService.getEmploymentTimes().then(result => setEmploymentTimes(result.data.data))
    }, [])

    const handleChangeCity = (e, { value }) => {
        setCityIndex(value)
    }

    const handleChangePosition = (e, { value }) => {
        setPositionIndex(value)
    }

    const handleChangeEmploymentType = (e, { value, checked }) => {
        if (checked) {
            typeIndex.push(value)
        } else {
            let index = typeIndex.indexOf(value)
            if (index > -1) {
                typeIndex.splice(index, 1)
            }
        }
    }

    const handleChangeEmploymentTime = (e, { value, checked }) => {
        if (checked) {
            timeIndex.push(value)
        } else {
            let index = timeIndex.indexOf(value)
            if (index > -1) {
                timeIndex.splice(index, 1)
            }
        }
    }

    const cityOptions = cities.map((city => ({
        key: city.cityIndex,
        text: city.cityName,
        value: city.cityId
    })))

    const positionOptions = positions.map((position => ({
        key: position.positionIndex,
        text: position.positionName,
        value: position.positionId
    })))

    return (
        <div>
            <Segment style={{ borderRadius: "25px/25px" }}>
                <Label
                    className="filterLabel"
                    attached="top" circular size="large"
                    content="Cities and Positions" />
                <Dropdown
                    style={{ marginBottom: "5px" }}
                    fluid scrolling pointing
                    placeholder="Choose city."
                    selection search item multiple clearable
                    value={cityIndex}
                    options={cityOptions}
                    onChange={handleChangeCity} />
                <Dropdown
                    fluid scrolling pointing
                    placeholder="Choose positions."
                    selection search item multiple clearable
                    value={positionIndex}
                    options={positionOptions}
                    onChange={handleChangePosition} />
            </Segment>

            <Segment style={{ borderRadius: "25px/25px" }}>
                <Label
                    className="filterLabel"
                    attached="top" circular size="large"
                    content="Employment Types and Times" />
                <Container className="checkboxContainer">
                    {
                        employmentTypes.map(employmentType => (
                            <Checkbox
                                className="filterCheckbox"
                                key={employmentType.typeId}
                                value={employmentType.typeId}
                                label={employmentType.typeName}
                                onChange={handleChangeEmploymentType} />
                        ))
                    }
                </Container>
                <Divider style={{margin:"10px"}} />
                <Container className="checkboxContainer">
                    {
                        employmentTimes.map(employmentTime => (
                            <Checkbox
                                className="filterCheckbox"
                                key={employmentTime.timeId}
                                value={employmentTime.timeId}
                                label={employmentTime.timeName}
                                onChange={handleChangeEmploymentTime} />
                        ))
                    }
                </Container>
            </Segment>
            <Button
                className="filterButton"
                type="button" content="Filter"
                onClick={() => clickEvent({ cityId: cityIndex, positionId: positionIndex, typeId: typeIndex, timeId: timeIndex })} />
        </div>
    )
}
