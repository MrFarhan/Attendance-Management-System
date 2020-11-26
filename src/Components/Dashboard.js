import React from 'react'
import MenuAppBar from './Appbar/Appbar'
import "../App.css"
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideNav  from './Appbar/SideNav'

export const Dashboard = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const loading = useSelector((val) => val.loading)

    if (!loading && !userDetails) return <Redirect to="/" />

    return (

            <MenuAppBar />
    )
}