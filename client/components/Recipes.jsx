import React, { useState } from "react";
import axios from 'axios';
class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drinks: [],
    };
    this.getSavedDrinks = this.getSavedDrinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getSavedDrinks() {
    axios.get('/drunk/drinks')
      .then(({ data }) => data.map(drink => {
       return axios.get(`/drunk/cocktailByName/${drink}`)
        .then(({ data }) => {
          this.setState(prevState => ({
            drinks: [...prevState.drinks, data[0]]
          }))
        })
      }))
  }

  componentDidMount(){
    this.getSavedDrinks();
  }




  handleClick(drink) {
    console.log(drink, 'eeeeeee')
    const { drinks } = this.state
    console.log(drinks, 'bevvys')
    axios.get('/drunk/drinks')
    .then(({ data }) => data.map(drank => {
      console.log(drink, 'hiya')
      console.log(drank, 'draaaank')
      if (drank === drink.strDrink){
      return axios.put('/drunk/drinks', { drinks: drank })
      }
    }))
    // drinks.map(drank => {
    //   console.log(drank, 'beverage')
    //   if (drink.strDrink === drank.strDrink) {
    //     return axios.put('/drunk/drinks', { drinks: drank.strDrink })
    //   }
    // })

      // axios.put('/drunk/drinks', {drinks: drinks})
      // .then(() => this.getSavedDrinks())

    //axios.put('/drunk/drinks', {drinks: drink.strDrink})
  }




  render() {
    const { drinks } = this.state
  return (
    <div className="list-group">
      <h1 className='drinkBookHeader'>Drink Book</h1>
    {
    drinks.map((drink, i) => (
      <a href="#" className="list-group-item list-group-item-action" aria-current="true" key={i} drink={drink}>
      <div className="d-flex w-100 justify-content-between" key={i}>
        <h5 className="mb-1 hey" key={i}>{drink.strDrink}</h5>
        <img src={drink.strDrinkThumb} width="100" height="100"></img>
      </div>
      <p className="mb-1">{drink.strInstructions}</p>
      <small className="drinkCat">{drink.strCategory}</small>
      <br/>
      <br/>
      <button className='btn-buggy' onClick={() => this.handleClick(drink)}>Delete</button>
    </a>
    ))
    }
</div>
  )
  }
}

export default Recipes;