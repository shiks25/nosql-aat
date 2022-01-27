import React, { Component } from 'react'
import UserService from '../services/UserService';

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
          id: this.props.match.params.id,
          drinkName: '',
          volume: '',
          calories: '',
          caffeine: '',
          type: ''
        }
        this.changeDrinkNameHandler = this.changeDrinkNameHandler.bind(this);
        this.changeVolumeHandler = this.changeVolumeHandler.bind(this);
        this.changeCaloriesHandler = this.changeCaloriesHandler.bind(this);
        this.changeCaffeineHandler = this.changeCaffeineHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
          let drink = res.data;
          this.setState({drinkName: drink['Drink Name'],
          volume: drink['Volume (ml)'],
          calories: drink['Calories'],
          caffeine: drink['Caffeine (mg)'],
          type: drink['Type of Drink']
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {drinkName: this.state.drinkName,
                   volume: this.state.volume,
                   calories: this.state.calories,
                   caffeine: this.state.caffeine,
                   type: this.state.type};
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUser(user, this.state.id).then( res => {
            this.props.history.push('/drinks');
        });
    }

    changeDrinkNameHandler = (event) => {
        this.setState({ drinkName: event.target.value });
    }
    changeVolumeHandler = (event) => {
        this.setState({ volume: event.target.value });
    }
    changeCaloriesHandler= (event) => {
        this.setState({ calories: event.target.value });
    }
    changeCaffeineHandler= (event) => {
        this.setState({ caffeine: event.target.value });
    }
    changeTypeHandler= (event) => {
        this.setState({ type: event.target.value });
}

    cancel(){
        this.props.history.push('/drinks');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Drink</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className="form-group">
                                    <label> Drink Name : </label>
 <input placeholder="Drink Name" name="drinkName" className="form-control"
    value={this.state.drinkName} onChange={this.changeDrinkNameHandler} />
                                </div>

                                <div className="form-group">
                                    <label> Volume (ml): </label>
<input placeholder="Volume (ml)" name="volume" className="form-control"
   value={this.state.volume} onChange={this.changeVolumeHandler} />
                                </div>

                                <div className="form-group">
                                    <label> Calories: </label>
<input placeholder="Calories" name="calories" className="form-control"
         value={this.state.calories} onChange={this.changeCaloriesHandler} />
                                </div>

                                <div className="form-group">
                                    <label> Caffeine (mg): </label>
<input placeholder="Caffeine" name="caffeine" className="form-control"
         value={this.state.caffeine} onChange={this.changeCaffeineHandler} />
                                </div>

                                <div className="form-group">
                                    <label> Type of Drink: </label>
<input placeholder="Type of Drink" name="type" className="form-control"
         value={this.state.type} onChange={this.changeTypeHandler} />
                                </div>

<button className="btn btn-success" onClick={this.updateUser}>Save</button>
<button className="btn btn-danger" onClick={this.cancel.bind(this)}
            style={{ marginLeft: "10px" }}>Cancel</button>
              </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateUserComponent
