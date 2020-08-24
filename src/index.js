import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            depts: [],
            employees: [],
        }
        this.destroy = this.destroy.bind(this)
        this.removeDept = this.removeDept.bind(this)
    }
    async destroy(employee){
        try {
            await axios.delete(`/api/employees/${employee.id}`)
            const employees = this.state.employees.filter(e => e.id !== employee.id)
            this.setState({ employees })
        } catch(err){
            console.log(`Can't Destroy!!!`)
        }
    }
    async removeDept(employee){
        try{
            await axios.put(`/api/employees/${employee.id}`, {departmentId: 1})
            const employees = (await axios.get('/api/employees')).data
            this.setState({ employees })
            // Stopping Point. Fully functional but not sure how to remove the button once it is clicked
            // let elem = document.getElementById(employee.name);
            // elem.parentNode.removeChild(elem);
        } catch(err){
            console.log('Get Back To Work!!!')
        }
    }
    async componentDidMount(){
        try {
          this.setState({ depts: (await axios.get('/api/depts')).data })
          this.setState({ employees: (await axios.get('/api/employees')).data })
        } catch(err){
          console.log('error with Mounting!')
        }
    }
    render(){
        return(
            <div>
                <h4>{this.state.employees.length} Total Employees</h4>
                    <div id = 'lists'>
                        {
                        this.state.depts.map(dept => {
                            return (
                                <ul className = 'content' key = {dept.id}>
                                    <lh className = 'heads' key = {dept.deptName}>{dept.deptName.toUpperCase()}</lh>
                                    {
                                        this.state.employees.map(employee => {
                                            if (employee.departmentId === dept.id && dept.id !== 0){
                                                return (
                                                <li key = {employee.id}>
                                                    <p>{employee.employName}</p>
                                                    <button onClick = {() => {this.destroy(employee)}} id = {employee.employName}>x</button>
                                                    <button onClick = {() => {this.removeDept(employee)}}>Remove From Department</button>
                                                </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                                )
                            })
                        }
                    </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('data')
)