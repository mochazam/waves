import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { link } from 'fs';

const links = [
    {
        name: 'My account',
        linkto: '/user/dashboard'
    },
    {
        name: 'User information',
        linkto: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkto: '/user/cart'
    }
]

const admin = [
    {
        name: 'Site info',
        linkto: '/admin/site_info'
    },
    {
        name: 'Add products',
        linkto: '/admin/add_product'
    },
    {
        name: 'Manage categories',
        linkto: '/admin/manage_categories'
    }
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item, i) => (
            <Link to={item.linkto} key={i}>
                {item.name}
            </Link>
        ))
    )

    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>
                    <div className="links">
                        { generateLinks(links) }
                    </div>

                    { props.user.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                { generateLinks(admin) }
                            </div>
                        </div>
                    :null
                    }

                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);