import React from 'react';
import { Link } from 'react-router-dom';
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
                            <Link to="/change-profile" className="dashboard-link-href">
                                Change Profile
                            </Link>
                        </div>
                        
                        <div className="dashboard-link font__p font__bold p__size">
                            <Link to="/change-password" className="dashboard-link-href">
                                Change password
                            </Link>
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
