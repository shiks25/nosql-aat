import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ChartComponent from './components/ChartComponent';
import ViewUserComponent from './components/ViewUserComponent';
import searchComponent from './components/SearchComponent';



function App() {
  return (
    
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {ListUserComponent}></Route>
                          <Route path = "/drinks" component = {ListUserComponent}></Route>
                          <Route path = "/add-drink/:id" component = {CreateUserComponent}></Route>
                          <Route path = "/view-drink/:id" component = {ViewUserComponent}></Route>
                          <Route path = "/view-analytics" component = {ChartComponent}></Route>
                          {/* <Route path = "/search/:name" component = {searchComponent}></Route> */}
                          {/* <Route path = "/update-drink/:id" component = {UpdateUserComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>

  );
}

export default App;
