const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(db => {
  console.log('Connected correctly to server');

  Dishes.create({
        name: 'Uthappizza',
        description: 'test'
      })
      .then(dish => {
        console.log(dish);

        return Dishes.findOneAndUpdate(dish._id,
            { $set: { description: 'Updated test' } },
            { new: true }).exec();
      })
      .then(dish => {
        console.log(dish);

        dish.comments.push({
          rating: 5,
          comment: 'I\'m getting a sinking feeling!',
          author: 'Leonardo di Carpaccio'
        });

        return dish.save();
      })
      .then(dish => {
        console.log(dish);

        return Dishes.deleteMany({});
      })
      .then(() => {
        return mongoose.connection.close();
      })
      .catch(err => console.log(err));
});