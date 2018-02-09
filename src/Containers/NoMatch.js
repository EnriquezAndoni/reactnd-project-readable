import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'

export default function NoMatch () {
  return (
    <div className='about'>
      <div className='container'>
        <div className='about-main'>
          <div className='col-md-8 about-left'>
            <div className='about-one'>
              <p>PAGE NOT FOUND</p>
              <h3>SORRY</h3>
            </div>
          </div>
          <Link to='/'><RaisedButton label={'Home'} /></Link>
          <div className='clearfix' />
        </div>
      </div>
    </div>
  )
}
