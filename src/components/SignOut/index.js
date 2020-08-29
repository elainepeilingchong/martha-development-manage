import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from '@material-ui/core';

const SignOutButton = ({ firebase }) => (
    <Button variant="contained" onClick={firebase.doSignOut} color="secondary">
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);