import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import './index.css';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <AppBar position="static">
        <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton> */}
            <Typography variant="subtitle1">
                <Link to={ROUTES.LANDING} className="menuButton">Landing</Link>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1">
                <Link to={ROUTES.HOME} className="menuButton">Home</Link>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1">
                <Link to={ROUTES.ROOM_ARRANGEMENT} className="menuButton">Room Arrangement</Link>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" >
                <Link to={ROUTES.TENANT} className="menuButton">Tenant</Link>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1">
                <Link to={ROUTES.ACCOUNT} className="menuButton">Account</Link>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1">
                <Link to={ROUTES.ADMIN} className="menuButton">Admin</Link>
            </Typography>
            <SignOutButton />
        </Toolbar>
    </AppBar>
)
// const NavigationAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.HOME}>Home</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ROOM_ARRANGEMENT}>Room Arrangement</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.TENANT}>Tenant</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ACCOUNT}>Account</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ADMIN}>Admin</Link>
//     </li>
//     <li>
//       <SignOutButton />
//     </li>
//   </ul>
// );

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

export default Navigation;