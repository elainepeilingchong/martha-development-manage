import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from '@material-ui/core';

class TenantPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            name: "",
            request: "",
            nationality: "",
            loading: false,
            tenants: [],
            scholarship: false,
            quarantine: false,
            editing: false
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

        const { uid, name, request, nationality, scholarship, quarantine , editing} = this.state;
        let uuid="";
        if(editing){
            this.setState({editing: false});
            uuid = uid
        }else{
            uuid = uuidv4();
        }
        let r = "";
        let n = "";
        let q = false;
        let s = false;

        if(request != undefined && request != null){
            r = request;
        }
        if(nationality == undefined && nationality != null){
            n = nationality;
        }
        if(quarantine == undefined && quarantine != null){
            q = quarantine;
        }
        if(scholarship == undefined && scholarship != null){
            s = scholarship;
        }
       
        this.props.firebase
            .tenant(uuid)
            .set({
                name,
                number: 0,
                a: false,
                allocated: false,
                request: r,
                nationality: n,
                scholarship: s,
                quarantine: q

            })
            .then(() => {
                this.setState(
                    {
                        uid: null,
                        name: "",
                        request: "",
                        nationality: "",
                        loading: false,
                        scholarship: false,
                        quarantine: false
                    }
                )
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
    editTenant = (tenant) => {
        this.setState({editing: true});
        console.log(tenant.scholarshi);
        this.setState({
            uid: tenant.uid,
            name: tenant.name,
            request: tenant.request,
            nationality: tenant.nationality,
            loading: false,
            scholarship: tenant.scholarship,
            quarantine: tenant.quarantine
        })
    };

    TenantList = () => (
        <ul>
            {this.state.tenants.map(tenant => (
                <li key={tenant.uid}>
                    <span style={{ backgroundColor: tenant.allocated ? 'green' : 'red' }}>
                        <strong>Name:</strong> {tenant.name} ({tenant.number} {tenant.a ? 'a' : 'b'}) <button onClick={(e) => this.editTenant(tenant)}>edit</button><button onClick={(e) => this.deleteTenant(tenant.uid)}>x</button>
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
            scholarship,
            quarantine,
            editing
        } = this.state;

        console.log(scholarship)
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
                    <textarea id="request" name="request" rows="4" cols="50" onChange={this.onChange} value={request}>
                    </textarea>

                    <Divider />
                    <label htmlFor="a">Scholarship: </label>
                    <input type="checkbox" id="scholarship" name="scholarship" value="true" checked={scholarship} onClick={() => this.setState({ scholarship: !scholarship})} /><br />
                    <Divider />
                    <label htmlFor="a">Quarantine: </label>
                    <input type="checkbox" id="quarantine" name="quarantine" value="true" checked={quarantine} onClick={() => this.setState({ quarantine: !quarantine })} /><br />

                    <button type="submit">{editing? 'Save':'Add'}</button>

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