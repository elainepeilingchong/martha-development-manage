import React, { Component } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Draggable from 'react-draggable'; // Both at the same time
import { withFirebase } from '../Firebase';
import './index.css';
import { Button } from '@material-ui/core';

// [
//   [floor1]
//   [floor2]
//   [floor3]
// ]
// [
//   [a], [b],[a],[b],[a], [b],[a],[b]
// ]
// [
//   [0,0], [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]
//   [1,0], [1,1],[1,2],[1,3]
// ]
const Setanta =
  [
    [
      { number: 4, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 4, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 2, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 2, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 6, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 6, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 8, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 8, floor: 1, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 3, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 3, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 1, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 1, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 5, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 5, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 7, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 7, floor: 1, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 12, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 12, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 10, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 10, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 14, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 14, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 16, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 16, floor: 2, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 11, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 11, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 9, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 9, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 13, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 13, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 15, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 15, floor: 2, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 20, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 20, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 18, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 18, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 22, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 22, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 24, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 24, floor: 3, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 19, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 19, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 17, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 17, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 21, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 21, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 23, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 23, floor: 3, a: false, occupied: false, users: [], total: 0 }
    ]
  ]

const Oriel =
  [
    [
      { number: 32, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 32, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 30, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 30, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 26, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 26, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 28, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 28, floor: 1, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 31, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 31, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 29, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 29, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 25, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 25, floor: 1, a: false, occupied: false, users: [], total: 0 },
      { number: 27, floor: 1, a: true, occupied: false, users: [], total: 0 },
      { number: 27, floor: 1, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 40, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 40, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 38, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 38, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 33, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 33, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 36, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 36, floor: 2, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 39, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 39, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 37, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 37, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 34, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 34, floor: 2, a: false, occupied: false, users: [], total: 0 },
      { number: 35, floor: 2, a: true, occupied: false, users: [], total: 0 },
      { number: 35, floor: 2, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 48, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 48, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 46, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 46, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 42, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 42, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 44, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 44, floor: 3, a: false, occupied: false, users: [], total: 0 }
    ],
    [
      { number: 47, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 47, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 45, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 45, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 41, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 41, floor: 3, a: false, occupied: false, users: [], total: 0 },
      { number: 43, floor: 3, a: true, occupied: false, users: [], total: 0 },
      { number: 43, floor: 3, a: false, occupied: false, users: [], total: 0 }
    ]
  ]

class RoomArrangementPage extends Component {
  // V2
  constructor(props) {
    super(props);

    this.state = {
      activeDrags: 0,
      oriel: false,
      loading: false,
      tenants: new Map(),
      assigned: [],
      unassigned: [],
      expandedRowsOriel: [0, 1, 2, 3, 4, 5],
      expandedRowsSetanta: [0, 1, 2, 3, 4, 5],
      userEditNumber: new Map(),
      userEditRequest: new Map()
    };
  }

  componentWillUnmount() {
    this.props.firebase.tenants().off();
  }
  componentDidMount() {

    this.setState({ loading: true });
    this.props.firebase.tenants().on('value', snapshot => {
      const tenantsObject = snapshot.val();
      let editBoolean = new Map();
      let editRequest = new Map();

      if (tenantsObject) {
        const tenantsList = new Map();
        Object.keys(tenantsObject).forEach((key, index) => {
          tenantsList.set(key,
            {
              ...tenantsObject[key],
              uid: key,
            })
          editBoolean.set(key, false);
          editRequest.set(key, false);

        });

        this.setState({
          tenants: tenantsList,
          loading: false,
          userEditNumber: editBoolean,
          userEditRequest: editRequest
        });
        this.roomGenerateUsers(tenantsList, Setanta);

        this.roomGenerateUsers(tenantsList, Oriel);
        this.generateTenantsList(tenantsList);
      } else {
        this.setState({
          tenants: [],
          loading: false
        });
      }

    });
  }


  handleOrielRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRowsOriel;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);

    this.setState({ expandedRowsOriel: newExpandedRows });
  }

  handleSetantaRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRowsSetanta;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);

    this.setState({ expandedRowsSetanta: newExpandedRows });
  }

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };


  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };


  // handleDrag = (e, ui, index) => {

  //   let temp = this.state.deltaPosition;
  //   let selected = this.state.deltaPosition[index];
  //   temp[index].x = selected.x + ui.deltaX;
  //   temp[index].y = selected.y + ui.deltaY;

  //   this.setState({
  //     deltaPosition: temp
  //   });
  // };

  fib = (n) => {
    if (n <= 1)
      return n;

    return this.fib(n - 1) + this.fib(n - 2);
  }
  OrielTable = () => (
    <table style={{ width: "2500px" }}>
      <thead>
        <tr>
          <th colSpan="8">Oriel</th>
        </tr>
      </thead>
      <tbody>
        {Oriel.map((s, index) => {

          if (this.state.expandedRowsOriel == null || this.state.expandedRowsOriel == undefined) {
            this.state.expandedRowsOriel = [];
          }
          let itemRows = [];
          const clickCallback = () => this.handleOrielRowClick(index);
          if (index == 0 || index == 1) {
            itemRows = [
              <tr onClick={clickCallback} key={"row-data-" + index}>
                <td colSpan="8"><strong>Floor 1{ this.state.expandedRowsOriel.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsOriel.includes(index)&& <ChevronLeftIcon/>}</strong></td>
              </tr>
            ];
          } else if (index == 2 || index == 3) {
            itemRows = [
              <tr onClick={clickCallback} key={"row-data-" + index}>
                <td colSpan="8"><strong>Floor 2</strong> { this.state.expandedRowsOriel.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsOriel.includes(index)&& <ChevronLeftIcon/>}</td>
              </tr>
            ];
          } else {
            itemRows = [
              <tr onClick={clickCallback} key={"row-data-" + index}>
                <td colSpan="8" style={{ verticalAlign: "top" }}><strong>Floor 3 </strong>{ this.state.expandedRowsOriel.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsOriel.includes(index)&& <ChevronLeftIcon/>}</td>
              </tr>
            ];
          }
          if (this.state.expandedRowsOriel.includes(index)) {
            itemRows.push(<tr>
              {s.map((f, index) => {
                console.log(s);
                return (
                  <td key={"oriel-row-" + index} onClick={clickCallback} style={{ width: "250px", height: "25px", verticalAlign: "top" }}>{f.number}{f.a && 'a'}{!f.a && 'b'}</td>
                )
              })}
            </tr>)
          }
          if (this.state.expandedRowsOriel.includes(index)) {
            itemRows.push(<tr key={"tr-oriel-row-users" + index}>
            {s.map((f, index) => {
              return (
                <td key={"oriel-row-" + index} style={{ width: "250px", height: "250px", verticalAlign: "top" }}>{f.users.map(u => this.renderDrag(u))}</td>
              )
            })}
          </tr>)
          }
          return itemRows;
        })}
      </tbody>

    </table>
  );

  SetantaTable = () => {
    return (
      <table style={{ width:  "2500px"  }}>
        <thead>
          <tr>
            <th colSpan="8">Setanta</th>
          </tr>
        </thead>
        <tbody>
          {Setanta.map((s, index) => {

            if (this.state.expandedRowsSetanta == null || this.state.expandedRowsSetanta == undefined) {
              this.state.expandedRowsSetanta = [];
            }
            let itemRows = [];
            const clickCallback = () => this.handleSetantaRowClick(index);
            if (index == 0 || index == 1) {
              itemRows = [
                <tr onClick={clickCallback} key={"setanta-data-1" + index}>
                  <td colSpan="8"><strong>Floor 1</strong>{ this.state.expandedRowsSetanta.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsSetanta.includes(index)&& <ChevronLeftIcon/>}</td>
                </tr>
              ];
            } else if (index == 2 || index == 3) {
              itemRows = [
                <tr onClick={clickCallback} key={"setanta-data-2" + index}>
                  <td colSpan="8"><strong>Floor 2</strong>{ this.state.expandedRowsSetanta.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsSetanta.includes(index)&& <ChevronLeftIcon/>}</td>
                </tr>
              ];
            } else {
              itemRows = [
                <tr onClick={clickCallback} key={"setanta-row-data-3" + index}>
                  <td colSpan="8"><strong>Floor 3</strong>{ this.state.expandedRowsSetanta.includes(index)&& <ExpandMoreIcon/>} {!this.state.expandedRowsSetanta.includes(index)&& <ChevronLeftIcon/>}</td>
                </tr>
              ];
            }


            if (this.state.expandedRowsSetanta.includes(index)) {
              itemRows.push(<tr key={"tr-setanta-row" + index}>
                {s.map((f, index) => {
                  return (
                    <td key={"setanta-row-" + index} onClick={clickCallback} style={{ width: "250px", height: "25px", verticalAlign: "top" }}>{f.number}{f.a && 'a'}{!f.a && 'b'}</td>
                  )
                })}
              </tr>)
            }
            if (this.state.expandedRowsSetanta.includes(index)) {
              itemRows.push(<tr key={"tr-setanta-row-users" + index}>
                {s.map((f, index) => {
                  return (
                    <td key={"setanta-row-" + index} style={{ width: "250px", height: "250px", verticalAlign: "top" }}>{f.users.map(u => this.renderDrag(u))}</td>
                  )
                })}
              </tr>)
            }
            return itemRows;
          })}
        </tbody>

      </table>
    );

  }
  generateTenantsList(tenants) {
    const values = Array.from(tenants.values());
    const assigned = values.filter(t => t.allocated);
    const unassigned = values.filter(t => !t.allocated);
    console.log(values);
    this.setState({
      assigned: assigned,
      unassigned: unassigned
    })
  }
  onChangeBooleanA = (tenant) => {
    const temp = this.state.tenants;
    let getFromMapT = temp.get(tenant.uid);
    getFromMapT.a = !tenant.a;
    temp.set(tenant.uid, getFromMapT);
    this.setState({ tenants: temp })
    this.props.firebase.tenant(tenant.uid).set(
      {
        name: tenant.name,
        number: tenant.number,
        a: tenant.a,
        allocated: tenant.allocated,
        request: tenant.request
      }
    ).catch(error => {
      this.setState({ error });
    });
  }
  roomGenerateUsers(tenants, list) {
    const values = Array.from(tenants.values());

    list.map(o => {
      o.map(or => {
        const u = values.filter(t => t.number == or.number && t.a === or.a);
        or.users = u;
      })
    })
  }
onChangeRequest  = (event, tenant)=>{

  const { tenants = new Map() } = this.state;
  let t = tenants.get(tenant.uid);
  t.request = event.target.value;
  tenants.set(tenant.uid, t);
  this.setState({ tenants: tenants })

}
  editRequest = (tenant)=>{
    const { userEditRequest = new Map() } = this.state;
    if (userEditRequest.get(tenant.uid)) {

      this.props.firebase.tenant(tenant.uid).set(
        {
          name: tenant.name,
          number: tenant.number,
          a: tenant.a,
          allocated: tenant.allocated,
          request: tenant.request
        }
      ).catch(error => {
        this.setState({ error });
      });
    }
    const temp = userEditRequest;
    temp.set(tenant.uid, !userEditRequest.get(tenant.uid));

    this.setState({
      userEditRequest: temp
    });
  }
  editNumber = (tenant) => {
    const { userEditNumber = new Map() } = this.state;
    if (userEditNumber.get(tenant.uid)) {

      let allocated = tenant.allocated;
      if (tenant.number == 0) {
        allocated = false;
      } else {
        allocated = true;
      }
      this.props.firebase.tenant(tenant.uid).set(
        {
          name: tenant.name,
          number: tenant.number,
          a: tenant.a,
          allocated: allocated,
          request: tenant.request
        }
      ).catch(error => {
        this.setState({ error });
      });
    }

    const temp = userEditNumber;
    temp.set(tenant.uid, !userEditNumber.get(tenant.uid));

    this.setState({
      userEditNumber: temp
    });

  }
  onKeyDownChangeNumber = (event,tenant)=>{
    if (event.key === 'Enter') {
      this.editNumber(tenant);
    }
  }
  onKeyDownChangeRequest = (event,tenant)=>{
    if (event.key === 'Enter') {
      this.editRequest(tenant);
    }
  }
  onChangeNumber = (event, tenant) => {
 
    const { tenants = new Map() } = this.state;
    let t = tenants.get(tenant.uid);
    t.number = event.target.value;
    tenants.set(tenant.uid, t);
    this.setState({ tenants: tenants })
  }
  clearStatus=(tenant)=>{
    const {tenants= new Map()} = this.state;
    let getFromMapT = tenants.get(tenant.uid);
    getFromMapT.allocated = false;
    getFromMapT.number = 0;
    // tenants.set(tenant.uid, getFromMapT);
    // this.setState({ tenants: tenants })
    this.props.firebase.tenant(tenant.uid).set(
      getFromMapT
    ).catch(error => {
      this.setState({ error });
    });

  }
  renderDrag = (tenant) => {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { userEditNumber = new Map(), userEditRequest = new Map() } = this.state;

    return <Draggable  {...dragHandlers} key={tenant.uid}>
      <div className="box" style={{ display: 'flex', flexDirection: 'column' }}>
  <strong className="cursor"><div>{tenant.name}({tenant.scholarship? 'yes': "no"})</div></strong>
        <div style={{ overflow: 'scroll' }}>
          <div style={{ background: 'yellow', whiteSpace: 'pre-wrap' }}>
            <p>
            {tenant.nationality}
            <br/>
            {!userEditRequest.get(tenant.uid) &&  <button type="button" onDoubleClick={(e) => this.editRequest(tenant)}>Details: {tenant.request} </button>}
            {userEditRequest.get(tenant.uid)&&  <div><input type="text" id={tenant.uid + '-text'} name={tenant.uid + '-text'} value={tenant.request} style={{ width: "60%" }} onChange={(e) => this.onChangeRequest(e, tenant)}  onKeyDown={(e)=>this.onKeyDownChangeRequest(e,tenant)}/>
            <button onClick={(e) => this.editRequest(tenant)}>s</button></div>}

            </p>
            
            {!userEditNumber.get(tenant.uid) && <button onDoubleClick={(e) => this.editNumber(tenant)}>No: {tenant.number} </button>}
            {userEditNumber.get(tenant.uid) && <div><input type="number" id={tenant.uid + '-number'} name={tenant.uid + '-number'} value={tenant.number} style={{ width: "60%" }} onChange={(e) => this.onChangeNumber(e, tenant)} min="0" onKeyDown={(e)=>this.onKeyDownChangeNumber(e,tenant)}/>
              <button onClick={(e) => this.editNumber(tenant)}>s</button></div>}
            <br />
            <label htmlFor="a">A: </label>

            <input type="checkbox" id="a" name="a" value="A" defaultChecked={tenant.a} onClick={(e) => this.onChangeBooleanA(tenant)} /><br />
            <label htmlFor="b">B: </label>

            <input type="checkbox" id="b" name="b" value="B" defaultChecked={!tenant.a} onClick={(e) => this.onChangeBooleanA(tenant)} />
          <Button color="primary" variant="contained" onClick={(e)=>this.clearStatus(tenant)} style={{padding: '5px'}}>clear</Button>

          </div>
        </div>
      </div>
    </Draggable>;
  }


  render() {
    if (this.state.loading) {
      return <></>
    }
    return (

      <div>
        <p>Active DragHandlers: {this.state.activeDrags}</p>
        <div style={{
          overflowY: 'scroll', 
          border: '1px solid red',
          height: '180px',
          position: 'relative'
        }}>
          {
            this.state.unassigned.map((tenant) => {
              return this.renderDrag(tenant);
            })
          }
        </div >
        <div style={{ display: 'block' }}>
          <p><button onClick={() => { this.setState({ oriel: !this.state.oriel }) }}>{this.state.oriel ? 'Setanta' : 'Oriel'}</button></p>
          {this.state.oriel && this.OrielTable()}
          {!this.state.oriel && this.SetantaTable()}
        </div>
      </div>

    );
  }

}

// const OrielTable = () => (
//   <table style={{ width: "100%" }}>
//     <tr>
//       <th colspan="8">Oriel</th>
//     </tr>
//     {Oriel.map((s, index) => {

//       return (
//         <tr>
//           {s.map(f => {
//             return (
//               <td>{f.number}{f.a && 'a'}{!f.a && 'b'}</td>
//             )
//           })}
//         </tr>)
//     })}
//   </table>
// );
export default withFirebase(RoomArrangementPage);