import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            depts: [],
            employees: []
        }
    }
    async componentDidMount(){
        try {
          this.setState({depts: (await axios.get('/api/depts')).data})
          this.setState({employees: (await axios.get('/api/employees')).data})
        } catch(err){
          console.log('error with Mounting!')
        }
      }
    render(){
        return(
            <div>
                {/* <h4>{this.state.friends.length} Total Employees</h4> */}
                {/* Working on the below. Trying to create six list heads */}
                    {this.state.depts.map(dept => {
                        return (
                            <ul>
                                <lh>{dept.deptName}</lh>
                            </ul>
                            )
                        })
                    }
            </div>
        )
    }
}