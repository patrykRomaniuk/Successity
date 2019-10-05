import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import successity from '../successity.png';

const Dashboard = ({ auth }) => {
    if(!auth.isAuthenticated){
        return <Redirect to="/login"/> 
    }
    return (
        <div className="dashboard-wrapper">

                <div className="image-wrapper">
                    <img src={ successity } alt="" className="dashboard-image"/>
                </div>

                <div className="dashboard-links-wrapper">
                    
                    <div className="dashboard-links">

                        <div className="dashboard-link font__p font__bold p__size">
                            Change e-mail
                        </div>
                        
                        <div className="dashboard-link font__p font__bold p__size">
                            Change password
                        </div>
                        
                        <div className="dashboard-link font__p font__bold p__size">
                            Remind password
                        </div>

                    </div>
                    
                </div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
