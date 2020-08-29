import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';

class TenantPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            loading: false,
            tenants: [],
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
        const { name } = this.state;
        this.props.firebase
            .tenant(uuidv4())
            .set({
                name,
                number: 0,
                a: false,
                allocated: false,
                request: ""
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
            loading
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