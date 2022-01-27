import React, { Component } from 'react'
import UserService from '../services/UserService'
import '../App.css';
import drinksList from '../caffeine_dataset.json';

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                drinks: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( () => {
            this.setState({drinks: this.state.drinks.filter(drink => drink.id !== id)});
        });
    }
    viewUser(id){
        console.log(id);
        this.props.history.push(`/view-drink/${id}`);
        
    }
    editUser(id){
        this.props.history.push(`/add-drink/${id}`);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ drinks: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-drink/_add');
    }

    addGraph(){
        this.props.history.push(`/view-analytics`);
    }
    
    render() {
  
        const filterDrinks = (drinksList, query) => {
            return drinksList.filter((drink) => {
                const drinkName = drink['Drink Name'];
                return drinkName.includes(query);
            });
        };
        
        const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filteredDrinks = filterDrinks(drinksList,query);

        return (
            <div>
                <br></br>
                 <h2 className="text-center">Drinks List</h2>
                 <br></br>

            <div className="text-center">

            <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search drinks</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search drinks"
            name="s" 
        /> 
        <button type="submit">Search</button>
       
    </form>
<br></br>
            <ul>
                {filteredDrinks.map((drink) => (
                    <li key={drink['id']}>
                        <div className = "card col-md-6 offset-md-3">
                    <br></br><h3 className = "text-center"> View Details</h3>
                    <div className = "card-body">
                    <div className="row">
                        <label> Drink Name:
                         {drink['Drink Name']}
                         </label> 
                    </div>

                    <div className="row">
                        <label> Volume (ml):  
                         {drink['Volume (ml)']} 
                         </label> 
                    </div>

                    <div className="row">
                        <label> Calories: 
                         {drink['Calories']}
                        </label>
                    </div>

                    <div className="row">
                        <label>Caffeine (mg):
                        {drink['Caffeine (mg)']}
                        </label>
                    </div>

                    <div className="row">
                        <label> Type of Drink: 
                         {drink['Type of Drink']}
                        </label>
                    </div>
                    </div>

                </div>
                    </li>
                ))}
                    </ul>

        </div> 
                <br></br>
                <div className = "row">
                    <div className = "col">
                        <button className="btn btn-primary" onClick={this.addUser}> Add Drink</button>
                    </div>
                    <div className = "col">
                        <button id="right" className="btn btn-primary"  onClick={ () => this.addGraph()}>Analytics </button>
                    </div>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                <th> Drink Name</th>
                              <th> Volume (ml)</th>
                              <th> Calories</th>
                              <th> Caffeine(mg)</th>
                              <th> Type of Drink</th>
                              <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.drinks.map(
                                        drink =>
                                        <tr key = {drink['_id']}>
                                        <td> {drink['Drink Name']} </td>
                                       <td> {drink['Volume (ml)']} </td>
                                       <td> {drink['Calories']} </td>
                                       <td> {drink['Caffeine (mg)']} </td>
                                       <td> {drink['Type of Drink']} </td>
                                       <td>
                                                 <button onClick={ () => this.editUser(drink['id'])} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(drink['id'])} 
                                                 className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(drink['id'])} 
                                                 className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListUserComponent
