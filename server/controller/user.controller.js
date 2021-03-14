const ObjectId = require('mongodb').ObjectID;

module.exports = {
  create: (req, res) => {
    db = req.app.get('mongoInstance')
    var myobj = req.body;
    db.collection("users").insertOne(myobj, function (err, result) {
      if (err) {
        res.send('ERROR');
      } else {
        res.send({
          success: true,
          message: "User Created"
        });
      }
    });
  },

  login: (req, res) => {
    db = req.app.get('mongoInstance')
    let userData = req.body;
    db.collection("users").findOne({
      'username': req.body.username
    }, function (err, result) {
      if (err) {
        res.send('ERROR');
      } else {
        if (!result) {
          res.send("Couldn't find that username. Register or try again!");
        } else if (userData.password !== result.password) {
          res.send("Password is incorrect");
        } else {
          res.send({
            success: true,
            data: result
          });
        }
      }
    })
  },

  cartAdd: (req, res) => {
    db = req.app.get('mongoInstance')
    var id = {
      '_id': ObjectId(req.body.id)
    }
    var newvalues = {
      $set: {
        cart: req.body.prodList,
        dateAdded: new Date()
      }
    };
    db.collection("users").updateOne(id, newvalues, function (err, result) {
      if (err) {
        res.send('Error adding to cart');
      } else {
        res.send({
          success: true,
          data: result
        });
      }
    });
  },

  getCartProducts: (req, res) => {
    db = req.app.get('mongoInstance')
    let myobj = req.query;
    db.collection("users").findOne({
      '_id': ObjectId(myobj.id)
    }, function (err, result) {
      if (err) {
        res.send('ERROR');
      } else {
        if (!result) {
          res.send("Nothuing Found");
        } else {
          res.send({
            success: true,
            data: result
          });
        }
      }
    })
  },

  postOrder: (req,res) => {
    db = req.app.get('mongoInstance')
    let orderObj = req.body;
    db.collection("orders").insertOne(orderObj, function (err , result) {
      if(err){
        res.send("Error Placing order");
      }else{
        res.send({
          success: true,
          data:result});
      }
    })
  }

}
