var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shopping', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB!');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});
var products = [
  new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/8/84/Gothic_Logo.png',
    title: 'Gothic Video Game ~~',
    description: 'Awsome Game!!!',
    price: 110
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err,result){
    done++;
    if(done === products.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
  console.log('Saved model');
  console.log('Successfully disconnected to MongoDB!');
}
