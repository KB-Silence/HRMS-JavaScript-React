import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import JobAdvertFavoriteService from '../services/JobAdvertFavoriteService'
import JobAdvertisementService from '../services/JobAdvertisementService'

export default function JobAdvertisementDetail() {

    let {advertId} = useParams()
    const {authInitial} = useSelector(state => state.auth)
    const [jobAdvertisement, setJobAdvertisement] = useState({})
    let [favoriteAdverts, setFavoriteAdverts] = useState([])

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        let jobAdvertFavoriteService = new JobAdvertFavoriteService()
    }, [])

    return (
        <div className="pages">
        </div>
    )
}
