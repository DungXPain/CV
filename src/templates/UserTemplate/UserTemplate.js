import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

export default function UserTemplate(props) {
  const { Component, ...restParam } = props

  return (
    <Route {...restParam} render={(propsRoute)=>{
      return <Fragment>
        <Component {...propsRoute}/>
      </Fragment>
    }}/>
  )
}
