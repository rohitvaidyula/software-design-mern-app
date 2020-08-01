import React, { useState, useContext } from "react";
import { handleSubmit, errors, register, useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CreateProfile.css";
import Axios from "axios";
export default function CreateProfile() {
  const { UserData, setUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    first: "",
    last: "",
    addr1: "",
    addr2: "",
    city: "",
    zipcode: "",
    state: "",
    userID: "",
  });
  const { handleSubmit, register } = useForm({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let history = useHistory();
  const Submit = async () => {
    try {
      const request = {
        ID: UserData.user.id,
        first: form.first,
        last: form.last,
        addr1: form.addr1,
        addr2: form.addr2,
        city: form.city,
        zipcode: form.zipcode,
        state: form.state,
      };

      const token = localStorage.getItem("auth-token");
      const profileCheck = await Axios.post(
        "http://localhost:4000/add-profile",
        request,
        { headers: { "x-auth-token": token } }
      );
      if (profileCheck) {
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {UserData.user ? (
        <form class="add-profile-form" onSubmit={handleSubmit(Submit)}>
          <h1 className="text-center">
            Welcome {UserData.user.displayName}, please fill out your profile.
          </h1>
          <div>
            <label>First name:</label>
            <input
              className="input-form"
              type="text"
              name="first"
              onChange={handleChange}
              ref={register({
                required: "First name is required",
              })}
            ></input>
          </div>
          <div>
            <label>Last name:</label>
            <input
              type="text"
              onChange={handleChange}
              ref={register({
                required: "Last name is required",
              })}
              name="last"
              className="input-form"
            ></input>
          </div>
          <div>
            <label>Primary Address:</label>
            <input
              type="text"
              onChange={handleChange}
              ref={register({
                required: "Primary address is required!",
              })}
              name="addr1"
              className="input-form"
            ></input>
          </div>
          <div>
            <label>Secondary Address (Optional):</label>
            <input
              type="text"
              name="addr2"
              onChange={handleChange}
              className="input-form"
            ></input>
          </div>
          <div>
            <label>City: </label>
            <input
              onChange={handleChange}
              type="text"
              ref={register({
                required: "Name of city required!",
              })}
              name="city"
              className="input-form"
            ></input>
          </div>
          <div>
            <label>Zipcode: </label>
            <input
              type="text"
              onChange={handleChange}
              ref={register({
                required: "Last name is required",
                minLength: {
                  value: 5,
                  message: "Please enter a valid zip-code",
                },
              })}
              name="zipcode"
              className="input-form"
            ></input>
          </div>
          <div>
            <label>State: </label>
            <select
              required
              name="state"
              onChange={handleChange}
              className="input-form"
            >
              <option value="Alabama - AL">Alabama - AL</option>
              <option value="Alaska - AK">Alaska - AK</option>
              <option value="Arizona - AZ">Arizona - AZ</option>
              <option value="Arkansas - AR">Arkansas - AR</option>
              <option value="California - CA">California - CA</option>
              <option value="Colorado - CO">Colorado - CO</option>
              <option value="Connecticut - CT">Connecticut - CT</option>
              <option value="Delaware - DE">Delaware - DE</option>
              <option value="Florida - FL">Florida - FL</option>
              <option value="Georgia - GA">Georgia - GA</option>
              <option value="Hawaii - HI">Hawaii - HI</option>
              <option value="Idaho - ID">Idaho - ID</option>
              <option value="Illinois - IL">Illinois - IL</option>
              <option value="Indiana - IN">Indiana - IN</option>
              <option value="Iowa - IA">Iowa - IA</option>
              <option value="Kansas - KS">Kansas - KS</option>
              <option value="Kentucky - KY">Kentucky - KY</option>
              <option value="Louisiana - LA">Louisiana - LA</option>
              <option value="Maine - ME">Maine - ME</option>
              <option value="Maryland - MD">Maryland - MD</option>
              <option value="Massachusetts - MA">Massachusetts - MA</option>
              <option value="Michigan - MI">Michigan - MI</option>
              <option value="Minnesota - MN">Minnesota - MN</option>
              <option value="Mississippi - MS">Mississippi - MS</option>
              <option value="Missouri - MO">Missouri - MO</option>
              <option value="Montana - MT">Montana - MT</option>
              <option value="Nebraska - NE">Nebraska - NE</option>
              <option value="Nevada - NV">Nevada - NV</option>
              <option value="New Hampshire - NH">New Hampshire - NH</option>
              <option value="New Jersey - NJ">New Jersey - NJ</option>
              <option value="New Mexico - NM">New Mexico - NM</option>
              <option value="New York - NY">New York - NY</option>
              <option value="North Carolina - NC">North Carolina - NC</option>
              <option value="North Dakota - ND">North Dakota - ND</option>
              <option value="Ohio - OH">Ohio - OH</option>
              <option value="Oklahoma - OK">Oklahoma - OK</option>
              <option value="Oregon - OR">Oregon - OR</option>
              <option value="Pennsylvania - PA">Pennsylvania - PA</option>
              <option value="Rhode Island - RI">Rhode Island - RI</option>
              <option value="South Carolina - SC">South Carolina - SC</option>
              <option value="South Dakota - SD">South Dakota - SD</option>
              <option value="Tennessee - TN">Tennessee - TN</option>
              <option value="Texas - TX">Texas - TX</option>
              <option value="Utah - UT">Utah - UT</option>
              <option value="Vermont - VT">Vermont - VT</option>
              <option value="Virginia - VA">Virginia - VA</option>
              <option value="Washington - WA">Washington - WA</option>
              <option value="West Virginia - WV">West Virginia - WV</option>
              <option value="Wisconsin - WI">Wisconsin - WI</option>
              <option value="Wyoming - WY">Wyoming - WY</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <h1>You cannot access this page!</h1>
          <Redirect to={{ pathname: "/" }} />
        </>
      )}
    </div>
  );
}
