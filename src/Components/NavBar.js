import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div className="nn" style={{display : 'flex',background : '#22254b',padding : '0.5' ,color : 'white'}}>
                <Link to="/" style={{textDecoration : 'none',color : 'white',paddingLeft : '3rem'}}><h1>movies App</h1></Link>
                <Link to="/favourites" className="fav" style={{textDecoration : 'none',color : 'white',paddingLeft : '50vw'}}><h2 style={{marginLeft : '2rem',marginTop : '1rem'}}>Favourites</h2></Link>
            </div>
        )
    }
}
