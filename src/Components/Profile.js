import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const Profile = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)

    if (!loading && !userDetails) return <Redirect to="/" />

    return (
        <div>
            User profile setting here
        </div>
    )
}
