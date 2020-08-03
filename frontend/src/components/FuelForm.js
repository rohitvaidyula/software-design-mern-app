import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FuelForm() {
  const { UserData, setUserData } = useContext(UserContext);
  const active_user = UserData.user.displayName;
  let history = useHistory();
  const { handleSubmit } = useForm({});
  const [Form, setForm] = useState({
    username: active_user,
    first: "",
    last: "",
    addr1: "",
    addr2: "",
    city: "",
    zipcode: "",
    state: "",
    gallon: "",
    suggested_price: "",
    inState: false,
    isReturning: false,
    del_date: new Date(),
    final_price: "",
  });

  useEffect(() => {
    const Stuff = async () => {
      const token = localStorage.getItem("auth-token");
      const ID = UserData.user.id;
      const profileCheck = await Axios.get(
        "http://localhost:4000/getprofile/" + ID,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (profileCheck) {
        setForm({
          first: profileCheck.data.user_firstname,
          last: profileCheck.data.user_lastname,
          addr1: profileCheck.data.user_addy1,
          addr2: profileCheck.data.user_addy2,
          city: profileCheck.data.user_city,
          zipcode: profileCheck.data.user_zipcode,
          state: profileCheck.data.user_state,
        });

        if (profileCheck.data.user_state === "TX") {
          Form.inState = true;
        }
        //console.log(Form.inState);
      } else {
        alert("Profile for user not found.");
      }

      const username = UserData.user.displayName;
      const formCheck = Axios.get(
        "http://localhost:4000/get-form/" + username,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (formCheck.data) {
        Form.isReturning = true;
      }
    };

    Stuff();
  }, []);

  const Submit = async (e) => {
    const name = Form.first + " " + Form.last;
    const newForm = {
      _id: UserData.user.id,
      username: UserData.user.displayName,
      del_date: Form.del_date,
      gallon: Form.gallon,
      suggested_price: Form.suggested_price,
      final_price: Form.final_price,
      name: name,
      state: Form.state,
    };

    const token = localStorage.getItem("auth-token");
    const addCheck = await Axios.post(
      "http://localhost:4000/create-form",
      newForm,
      {
        headers: { "x-auth-token": token },
      }
    );

    if (addCheck) {
      let request = {
        username: UserData.user.displayName,
        suggested_price: Form.suggested_price,
        gallons: Form.gallon,
        final_price: Form.final_price,
        del_date: Form.del_date,
      };
      const historyCheck = await Axios.post(
        "http://localhost:4000/add-fuel-history/" + UserData.user.id,
        request,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (historyCheck) {
        alert(
          "This is the calculated price of your quote: " + Form.final_price
        );
        history.push("/dashboard");
      }
    }
  };

  const handleGallons = (e) => {
    Form.gallon = e.target.value;
  };
  const getQuote = (event) => {
    var margin,
      location_factor,
      rate_history_factor,
      gallons_requested_factor,
      sug_price_per_gallon,
      fin_price;
    const company_factor = 0.1;
    const price_per_gallon = 1.5;

    if (Form.inState === false) {
      location_factor = 0.04;
    } else {
      location_factor = 0.02;
    }

    console.log(location_factor);
    if (Form.isReturning === false) {
      rate_history_factor = 0;
    } else {
      rate_history_factor = 0.01;
    }

    console.log(rate_history_factor);
    if (Form.gallon < 1000) {
      gallons_requested_factor = 0.03;
    } else {
      gallons_requested_factor = 0.02;
    }

    console.log(gallons_requested_factor);
    var value =
      location_factor -
      rate_history_factor +
      gallons_requested_factor +
      company_factor;
    margin = price_per_gallon * value;

    sug_price_per_gallon = price_per_gallon + margin;
    fin_price = Form.gallon * sug_price_per_gallon;

    Form.suggested_price = sug_price_per_gallon;
    Form.final_price = fin_price;
  };

  const name = Form.first + " " + Form.last;
  let fullAddress = "";

  if (Form.addr2.length > 0) {
    fullAddress =
      Form.addr1 +
      ", " +
      Form.addr2 +
      ", " +
      Form.city +
      ", " +
      Form.state +
      ", " +
      Form.zipcode;
  } else {
    fullAddress =
      Form.addr1 + ", " + Form.city + ", " + Form.state + ", " + Form.zipcode;
  }

  return (
    <div>
      <h3>Create a new Quote Form</h3>
      <form onSubmit={handleSubmit(Submit)}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={Form.username}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            readOnly
          />
        </div>

        <div>
          <label>Address: </label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={fullAddress}
            readOnly
          />
        </div>

        <div>
          <label>Number of gallons:</label>
          <input
            type="text"
            className="form-control"
            name="gallon"
            onChange={handleGallons}
          />
        </div>

        <div>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={Form.del_date}
              onChange={(Date) => (Form.del_date = Date)}
            />
          </div>
        </div>

        <div>
          <label>Suggested Price Per Gallon (in USD):</label>
          <input
            type="text"
            className="form-control"
            name="suggested_price"
            readOnly
          />
        </div>

        <div>
          <label>Final Price (in USD):</label>

          <input
            type="text"
            className="form-control"
            name="final_price"
            readOnly
          />
        </div>

        <div className="text-center form-group">
          <input type="button" onClick={getQuote} value="Get Quote" />
        </div>

        <div className=" text-center form-group">
          <button type="submit" className="btn-sm btn-dark">
            Submit Quote
          </button>
        </div>
      </form>
    </div>
  );
}
