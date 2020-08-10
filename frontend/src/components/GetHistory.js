import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./GetHistory.css";
import ReactDatePicker from "react-datepicker";
export default function GetHistory() {
  const { UserData } = useContext(UserContext);
  let history = useHistory();

  const [quoteItems, setQuoteItems] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const token = localStorage.getItem("auth-token");
      await Axios.get(
        "http://localhost:4000/get-fuel-history/" + UserData.user.id,
        {
          headers: { "x-auth-token": token },
        }
      ).then((resp) => {
        resp.data.map(function (item, index) {
          setQuoteItems((quoteItems) => [...quoteItems, resp.data[index]]);
        });
      });
    };

    getHistory();
  }, []);

  const Submit = (e) => {
    history.push("/dashboard");
  };

  var usernames = quoteItems.map(function (item, index) {
    return <p>{quoteItems[index].username}</p>;
  });

  var dates = quoteItems.map(function (item, index) {
    return <p>{quoteItems[index].date}</p>;
  });

  var gallons = quoteItems.map(function (item, index) {
    return <p>{quoteItems[index].gallon}</p>;
  });
  var suggestedPrices = quoteItems.map(function (item, index) {
    return <p>${quoteItems[index].suggestedPrice}</p>;
  });

  var finalPrices = quoteItems.map(function (item, index) {
    return <p>${quoteItems[index].finalPrice}</p>;
  });

  return (
    <div className="history-list">
      <div id="label-name" className="labels">
        <label className="username">Username</label>
        <label className="date">Date</label>
        <label className="gallons">Num of Gallons</label>
        <label className="suggested_price">Suggested price (in USD)</label>
        <label className="final_price">Final price (in USD)</label>
      </div>

      <div className="labels">
        <label className="username">{usernames}</label>
        <label className="date">{dates}</label>
        <label className="gallons">{gallons}</label>
        <label className="suggested_price">{suggestedPrices}</label>
        <label className="final_price">{finalPrices}</label>
      </div>

      <button
        className="text-center btn-group btn-sm btn-dark"
        type="submit"
        onClick={Submit}
      >
        Go Back
      </button>
    </div>
  );
}
/*
{quoteItems.map((index) => (
    <p>{quoteItems[index].usernmae}</p>
  ))}

 {quoteItems.map((index) => (
            <p>{quoteItems[index].date} Shit</p>
          ))}

          {quoteItems.map((index) => (
            <p>{quoteItems[index].suggestedPrice} Shit</p>
          ))

{quoteItems.map((index) => (
            <p>{quoteItems[index].finalPrice}Shit </p>
          ))}

          */
