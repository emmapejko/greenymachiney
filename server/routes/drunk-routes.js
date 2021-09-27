const { Router } = require('express');
const drunkRouter = Router();

const { getRandomCocktail, getCocktailByIngredient, getCocktailByName } = require('../api/getCocktail');
const { User } = require('../database');
// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     //if user not logged in, redirect
//     res.redirect('/');
//   } else {
//     next();
//   }
// }

// drunkRouter.get('/', authCheck, (req, res) => {
//   //res.redirect('/'); //????
//   res.send('logged in ' + req.user);
// })

drunkRouter.get('/randomCocktail', (req, res) => {
  getRandomCocktail()
    .then(response => {
      //console.log(response.data.drinks);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error('error in drunkRouter: ', err);
      res.sendStatus(404);
    })
});

drunkRouter.get('/cocktailByIngredient/:ingredient', (req , res) => {
  const { ingredient } = req.params;
  getCocktailByIngredient(ingredient)
    .then(response => {
      //console.log(response.data);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
});

drunkRouter.get('/cocktailByName/:name', (req, res) => {
  const { name } = req.params;
  getCocktailByName(name)
    .then(response => {
      //console.log(response.data);
      res.status(200).send(response.data.drinks);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

drunkRouter.get('/liquorList', (req, res) => {
  User.findOne({ username: req.cookies.username})
  .then((user) => res.send(user.liquorList))
  .catch(err => console.error(err))
})

drunkRouter.put('/liquorList', (req, res) => {
  console.log()
  User.findOneAndUpdate({username: req.cookies.username}, {$push: {liquorList: req.params.liquorList}})
        .then(() => res.status(200).send())
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
 
});

module.exports = drunkRouter;