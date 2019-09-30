import React from 'react';
import { Link } from 'react-router-dom';

const User = (user) => {
    return (
        <div className="topic-wrapper" key={ user.user._id }>

            <div className="topic-user">
                <img src={ user.user.avatar } className="topic-avatar" alt=""/>
                <p className="font__p p__size">{ user.user.name }</p>
            </div>
            
            <div className="topic-section">
             
                <div className="topic-section-links">

                    <div className="link-to-post-page-button app_color_background font__p font__bold p__size">
                        <Link to={`/users/user/${ user.user._id }`}>
                            View Profile
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default User
