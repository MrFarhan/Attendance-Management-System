import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MainAppbar } from './Appbar/MainAppbar'
import SideNav from './Appbar/SideNav'
import "../App.css"

export const Profile = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)

    if (!loading && !userDetails) return <Redirect to="/" />

    return (
        <div className="profileMain">
        <div className="profileComp">
            <MainAppbar />
        </div>

            <div className="profileNav"> 
                <SideNav />
        </div >
        </div >
    )
}
