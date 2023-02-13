import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import './HomeTemplate.css'

export default function HomeTemplate(props) {
    const { Component, ...restParams } = props
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <Route {...restParams} render={(propsRoute) => {
            return (
                <Fragment>
                    <Header {...propsRoute}/>
                    <Component {...propsRoute}/>
                    <Footer/>
                </Fragment>
            )
        }} />
    )
}
