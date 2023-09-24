const User = require("../models/user.model");

module.exports.createUser = (request, response) => {
    User.create(request.body)
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getAllUsers = (request, response) => {
    User.find({})
    .then((user) => {
      console.log(user);
      response.json(user);
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
};

module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
      .then(updatedUser => response.json(updatedUser))
      .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))
}

