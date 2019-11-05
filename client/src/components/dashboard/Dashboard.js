import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from "./elements/Sidebar";
import Topbar from './elements/Topbar.js';
import Main from './elements/Mainpage.js';
import Survey from './elements/Surveyboard.js';
import Voyage from './elements/Voyageboard.js';
import { Route } from 'react-router-dom';


const Dashboard = props => {
  return (
    <div className="container-fluid">

      <div className="d-flex" >
        <div> <Sidebar /> </div>
        <div className="flex-column container-fluid" >
          <Topbar />
          <Route path="/dashboard" exact component={Main} />
          <Route path="/dashboard/survey" exact component={Survey} />
          <Route path="/dashboard/voyage" exact component={Voyage} />
        </div>
      </div>
    </div>)


}

Dashboard.propTypes = {

}

export default Dashboard
