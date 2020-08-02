/*
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import UserContext from "../context/UserContext";
import React from "react";

export default function createForm() {
  const { UserData, setUserData } = useContext(UserContext);

  return <div></div>;
}

////Ill comment in so that its easier for you in interpret should you need it
////I have included the useContext like you mentioned and showed yesterday. Please look through to see if it implemented properly


const {UserData, setUserData} = useContext(UserContext);
var active_user = UserData.user.DisplayName

//or var active_user = UserData.user.id


const thisisit = 'fifty five';

export default class createForm extends Component {
    
    constructor(props) {
        super(props);
//binds all the states that are to be updated on the database
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeGallon = this.onChangeGallon.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.OnChangeFullName = this.OnChangeFullName.bind(this);

        this.onChangeSuggestedPrice = this.onChangeSuggestedPrice(this);
        this.onChangeFinalPrice = this.onChangeFinalPrice(this);
        this.onChangeState = this.onChangeState(this);

        this.onSubmit = this.onSubmit.bind(this);

//initialize states as empty
        this.state = {
            username: '',
            name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            gallon: '',
            suggested_price: '',
            instate: false,
            returning_customer: false,
            del_date: new Date,
            //price_margin: '',
            final_price: '',


        }
    }

    
//onChange trackers when the submit button is hit. There is an onChange or every state that needs to be added to the database
    onChangeGallon(e) {
        this.setState({
            gallon: e.target.value
        });
    }

    onChangeDate(del_date) {
        this.setState({
            del_date: del_date
        });
    }

    OnChangeFullName(name){
        this.setState({
            name: name
        })
    }

    onChangeSuggestedPrice(suggested_price){
        this.setState({
            suggested_price: suggested_price
        })
    }

    onChangeFinalPrice(final_price){
        this.setState({
            final_price:final_price
        })
    }

    onChangeState(state){
        this.setState({
            state:state
        })
    }


    onChangeName(username) {
        this.setState({
            username: username
        })
    }

    

    componentDidMount() {

        //the obtained active_user at the top of this script globally will be used here. I hope this works

       

        var newID = "";

        //getting the userID based on the username of the currently logged in user 
        axios.get('http://localhost:4000/user/' + active_user)
            .then(response => {
                var gimme = response.data;
                newID = gimme[0]._id;
                this.setState({ username: gimme[0].userName });
            
                console.log(response.data)

                //secon call to get the ID of the profile that has the same ID as the currently logged in user
                return axios.get('http://localhost:4000/profile/' + newID)
            })
            .then(response => {
                var gimme2 = response.data;
                
                //retrieve the profile with the ID and update all the necessary states

                this.setState({name: response.data.user_firstname + ' ' + response.data.user_lastname});
                this.setState({address1 : response.data.user_addy1});
                this.setState({address2 : response.data.user_addy2});
                this.setState({city : response.data.user_city});
                this.setState({zipcode : response.data.user_zipcode});
                this.setState({state : response.data.user_state});
                
                //update whether from Texas or not
                if(response.data.user_state == 'TX'){
                    this.setState({instate: true});
                }

                //the username is called again for a get request for a third time that will check if this user has previously asked for a quote.
                return axios.get('http://localhost:4000/form/' + active_user)
            
                
            
                
            })

            .then(response => {
                var all_the_forms = response.data;
                //console.log('here we are now', all_the_forms);

                if (all_the_forms.length > 0){
                    this.setState({returning_customer: true})
                    //console.log('greater than 0')
                }
            })

            .then()
            .catch(function (error) {
                console.log(error);
            })
            
        

        
    }

    //on submit changes - form is created and the frontend UI is emptied out
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted`);
        console.log(`Gallon: ${this.state.gallon}`);
        console.log(`Delivery Date: ${this.state.del_date}`);

        const createform = {
            username: this.state.username,
            del_date: this.state.del_date,
            gallon: this.state.gallon,
            suggested_price: this.state.suggested_price,
            final_price: this.state.final_price,
            name:this.state.name,
            state:this.state.state,
        }

        axios.post('http://localhost:4000/forms', createform)
            .then(res => console.log(res.data));


        this.setState({
            username: '',
            name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            gallon: '',
            suggested_price: '',
            del_date: new Date,
            price_margin: '',
            final_price: '',
        })
    }

    //this is the pricing module. It calculates using the necessary parameters needed for the thing to produce the right price

    addAction = (event) => {
        var margin, location_factor, rate_history_factor, gallons_requested_factor, sug_price_per_gallon, fin_price;
        const company_factor = 0.1;
        const price_per_gallon = 1.50;

        if(this.state.instate === true){ location_factor = 0.02; }else{location_factor = 0.04}
        if(this.state.returning_customer === true){ rate_history_factor = 0.01;} else {rate_history_factor = 0;}
        if(this.state.gallon >1000 ) { gallons_requested_factor = 0.02;} else { gallons_requested_factor = 0.03;}

        margin = price_per_gallon * (location_factor - rate_history_factor + gallons_requested_factor + company_factor)


        console.log(location_factor, rate_history_factor, gallons_requested_factor, this.state.returning_customer, margin);

        
        sug_price_per_gallon = price_per_gallon + margin;
        fin_price = this.state.gallon*sug_price_per_gallon;

        this.setState({suggested_price: sug_price_per_gallon})
        this.setState({final_price: fin_price })

    }

    //render views. One of the input uses datepicker, so install react-datepicker for it to work alright
    //the specs asked for two buttons, one to calculate the quote, and the other for the submission of the form

    render() {
        var { username, name, address1, address2, city, state, zipcode, suggested_price, final_price } = this.state
        return (
            <div style = {{ marginTop: 20}}>
                <h3>Create new Quote Form</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>
                            username:
                        </label>
                        <input type = "text" className = "form-control" value={username} readOnly />
                        
                    </div>

                    <div className="form-group">
                        <label>
                            Name:
                        </label>
                        <input type = "text" className = "form-control" value={name} readOnly />
                    </div>

                    <div className="form-group">
                        <label>
                           Address: 
                        </label>
                        <input type = "text" className = "form-control" value={address1 + ' ' + address2 + ' ' + city + ' '+ state + ' '+ zipcode} readOnly />
                    </div>






                    <div className="form-group">
                        <label>
                            Gallon:
                       </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.gallon}
                            onChange={this.onChangeGallon}
                        />

                    </div>
                    <div className="form-group">

                        <label>Date: </label>

                        <div>
                            <DatePicker
                                selected={this.state.del_date}
                                onChange={this.onChangeDate}
                            />
                        </div>

                    

                    </div>

                    <div className="form-group">
                        <label>
                           Suggested Price Per Gallon (in USD): 
                        </label>
                        <input type = "text" className = "form-control" value={suggested_price} readOnly />
                    </div>

                    <div className="form-group">
                        <label>
                           Final Price (in USD): 
                        </label>
                        <input type = "text" className = "form-control" value={final_price} readOnly />
                    </div>




                    <div className="form-group">
                        <input type= "button" onClick = {this.addAction} value = "Get Quote" />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Submit Quote" className="btn btn-primary" />
                    </div>

                    <div>

                    </div>
                </form>
            </div>

        )
    }
}

*/
