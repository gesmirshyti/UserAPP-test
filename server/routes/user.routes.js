const UserController = require("../controllers/user.controller");

module.exports =(app) =>{
    app.post("/users", UserController.createUser);
    app.get("/users", UserController.getAllUsers);
    app.get("/users/:id", UserController.getUser);
    app.patch("/users/edit/:id", UserController.updateUser);
    app.delete("/users/:id", UserController.deleteUser);
}