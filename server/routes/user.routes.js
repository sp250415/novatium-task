const auth = require('../controller/user.controller');

module.exports = function (express) {

  //user login
  express
    .post('/login', auth.login);

  //user add
  express
    .post('/register', auth.create)

  //Cartupdate
  express
    .post('/postCart', auth.cartAdd);

  //GetCartProducts
  express
    .get('/getCart', auth.getCartProducts)

  //PostOrder
  express
    .post('/postOrder', auth.postOrder)
}
