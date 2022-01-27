import React, { Component } from 'react'
import UserService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            drink: {}
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({drink: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Details</h3>
                    <div className = "card-body">
                    <div className="row">
                        <label> Drink Name:
                         {this.state.drink['Drink Name']}
                         </label> 
                    </div>

                    <div className="row">
                        <label> Volume (ml):  
                         {this.state.drink['Volume (ml)']} 
                         </label>
                    </div>

                    <div className="row">
                        <label> Calories: 
                         {this.state.drink['Calories']}
                        </label>
                    </div>

                    <div className="row">
                        <label>Caffeine (mg):
                        {this.state.drink['Caffeine (mg)']}
                        </label>
                    </div>

                    <div className="row">
                        <label> Type of Drink: 
                         {this.state.drink['Type of Drink']}
                        </label>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent
