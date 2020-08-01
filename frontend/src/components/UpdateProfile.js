import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const { UserData, setUserData } = useContext(UserContext);
  const [ProfileUpdate, setProfileUpdate] = useState({
    first: "",
    last: "",
    addr1: "",
    addr2: "",
    city: "",
    zipcode: "",
    state: "",
  });

  const { handleSubmit, register } = useForm({});
  const history = useHistory();
  const handleChange = (e) => {
    setProfileUpdate({
      ...ProfileUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const Submit = async () => {
    try {
      const request = {
        ID: UserData.user.id,
        first: ProfileUpdate.first,
        last: ProfileUpdate.last,
        addr1: ProfileUpdate.addr1,
        addr2: ProfileUpdate.addr2,
        city: ProfileUpdate.city,
        zipcode: ProfileUpdate.zipcode,
        state: ProfileUpdate.state,
      };

      const authToken = localStorage.getItem("auth-token");
      const updateProfile = await axios.post(
        "http://localhost:4000/update-profile",
        request,
        { headers: { "x-auth-token": authToken } }
      );

      if (updateProfile) {
        alert("Success! Your profile has now been updated.");
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {UserData.user ? (
        <form className="update-profile-form" onSubmit={handleSubmit(Submit)}>
          <h2 className="text-center">Update your profile</h2>
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
              <option value="AL">Alabama - AL</option>
              <option value="AK">Alaska - AK</option>
              <option value="AZ">Arizona - AZ</option>
              <option value="AR">Arkansas - AR</option>
              <option value="CA">California - CA</option>
              <option value="CO">Colorado - CO</option>
              <option value="CT">Connecticut - CT</option>
              <option value="DE">Delaware - DE</option>
              <option value="FL">Florida - FL</option>
              <option value="GA">Georgia - GA</option>
              <option value="HI">Hawaii - HI</option>
              <option value="ID">Idaho - ID</option>
              <option value="IL">Illinois - IL</option>
              <option value="IN">Indiana - IN</option>
              <option value="IA">Iowa - IA</option>
              <option value="KS">Kansas - KS</option>
              <option value="KY">Kentucky - KY</option>
              <option value="LA">Louisiana - LA</option>
              <option value="ME">Maine - ME</option>
              <option value="MD">Maryland - MD</option>
              <option value="MA">Massachusetts - MA</option>
              <option value="MI">Michigan - MI</option>
              <option value="MN">Minnesota - MN</option>
              <option value="MS">Mississippi - MS</option>
              <option value="MO">Missouri - MO</option>
              <option value="MT">Montana - MT</option>
              <option value="NE">Nebraska - NE</option>
              <option value="NV">Nevada - NV</option>
              <option value="NH">New Hampshire - NH</option>
              <option value="NJ">New Jersey - NJ</option>
              <option value="NM">New Mexico - NM</option>
              <option value="NY">New York - NY</option>
              <option value="NC">North Carolina - NC</option>
              <option value="ND">North Dakota - ND</option>
              <option value="OH">Ohio - OH</option>
              <option value="OK">Oklahoma - OK</option>
              <option value="OR">Oregon - OR</option>
              <option value="PA">Pennsylvania - PA</option>
              <option value="RI">Rhode Island - RI</option>
              <option value="SC">South Carolina - SC</option>
              <option value="SD">South Dakota - SD</option>
              <option value="TN">Tennessee - TN</option>
              <option value="TX">Texas - TX</option>
              <option value="UT">Utah - UT</option>
              <option value="VT">Vermont - VT</option>
              <option value="VA">Virginia - VA</option>
              <option value="WA">Washington - WA</option>
              <option value="WV">West Virginia - WV</option>
              <option value="WI">Wisconsin - WI</option>
              <option value="WY">Wyoming - WY</option>
            </select>
          </div>
          <button className=" text-center btn-sm btn-dark" type="submit">
            Submit
          </button>
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
