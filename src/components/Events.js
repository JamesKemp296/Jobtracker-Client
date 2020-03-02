import React from 'react'
import axios from 'axios'

const Events = () => (

  <><FetchEvents></FetchEvents></>
)

const FetchEvents = async e => {

  e.PreventDefault()

  axios.get('/https://api.meetup.com/find/groups?zip=33127&radius=1&category=25&order=members', {
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
