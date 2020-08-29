import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from '@material-ui/core';

class TenantPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            request: "",
            nationality: "",
            loading: false,
            tenants: [],
            scholarship: false
        };
    }
    componentWillUnmount() {
        this.props.firebase.tenants().off();
    }
    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.tenants().on('value', snapshot => {
            const tenantsObject = snapshot.val();
            if (tenantsObject) {
                const tenantsList = Object.keys(tenantsObject).map(key => ({
                    ...tenantsObject[key],
                    uid: key,
                }));
                this.setState({
                    tenants: tenantsList,
                    loading: false
                });
            } else {
                this.setState({
                    tenants: [],
                    loading: false
                });
            }

        });
    }

    addTenant = event => {
        event.preventDefault();
        const { name, request, nationality, scholarship } = this.state;
        console.log(scholarship);
        this.props.firebase
            .tenant(uuidv4())
            .set({
                name,
                number: 0,
                a: false,
                allocated: false,
                request: request,
                nationality: nationality,
                scholarship: scholarship
            })
            .catch(error => {
                this.setState({ error });
            });

    };


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    deleteTenant = (uid) => {
        this.props.firebase.tenant(uid).remove();
    };

    TenantList = () => (
        <ul>
            {this.state.tenants.map(tenant => (
                <li key={tenant.uid}>
                    <span style={{ backgroundColor: tenant.allocated ? 'green' : 'red' }}>
                        <strong>Name:</strong> {tenant.name} ({tenant.number} {tenant.a ? 'a' : 'b'}) <button onClick={(e) => this.deleteTenant(tenant.uid)}>x</button>
                    </span>
                </li>
            ))}
        </ul>
    );

    render() {
        const {
            name,
            error,
            tenants,
            loading,
            nationality,
            request,
            scholarship
        } = this.state;

        return (
            <div>
                <form onSubmit={this.addTenant}>
                    <input
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"
                    />

                    <Divider />
                    <input
                        name="nationality"
                        value={nationality}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Nationality"
                    />

                    <Divider />
                    <textarea id="request" name="request" rows="4" cols="50" onChange={this.onChange}>
                    </textarea>

                    <Divider />
                    <label htmlFor="a">Scholarship: </label>
                    <input type="checkbox" id="scholarship" name="scholarship" value="true" defaultChecked={scholarship} onClick={() => this.setState({scholarship:!scholarship})} /><br />
                    <button type="submit">Add</button>
                    {error && <p>{error.message}</p>}
                </form>
                <h1>Tenant</h1>

                {loading && <div>Loading ...</div>}

                {this.TenantList()}
            </div >
        );
    }
}


export default withFirebase(TenantPage);