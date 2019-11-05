import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Sidebar = () => {
  return (
<NavWrapper>
    <nav className="navbar navbar-expand-lg bg-light py-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse nav flex-column align-items-start" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">forumsight</Link>

        <div className="nav-item"></div><Link className="nav-link" to="/dashboard"> Dashboard</Link>


        <Link className="nav-link" to="/dashboard/survey"> Survey</Link>
        <Link className="nav-link" to="/dashboard/voyage"> Voyage</Link>


        <a className="nav-link btn btn-create-survey" to="http://google.com"> Create Survey</a>
      </div>
    </nav>
    </NavWrapper>
  )
}


const NavWrapper = styled.nav`
.btn{
  background: var(--mainBlue);
  color:var(--mainWhite)!important;
}
`
export default Sidebar
