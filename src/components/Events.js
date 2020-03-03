import React from 'react'
import axios from 'axios'

const Events = () => (

  <><FetchEvents></FetchEvents></>
)

const FetchEvents = async e => {

  e.PreventDefault()

  axios.request({
    url: "/oauth/token",
    method: "get",
    baseURL: "/https://api.meetup.com/find/groups?zip=33127&radius=10&category=25&order=members",
    auth: {
      username: "vaf7vX0LpsL5",
      password: "pVEosNa5TuK2x7UBG_ZlONonDsgJc3L1"
    },
    data: {
      "grant_type": "client_credentials",
      "scope": "public"
    }
  }).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });

  axios.get('/https://api.meetup.com/find/groups?zip=33127&radius=10&category=25&order=members', {
    params: {
      ID: 12345
    }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}

export default Events
