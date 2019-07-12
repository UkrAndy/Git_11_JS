const mongoose = require("mongoose");

function loadUsers(userTmp){
    mongoose.disconnect();
    mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });    
    const Schema = mongoose.Schema;
    // Створення схеми моделі
    const userScheme = new Schema({
        name: String,
        age: Number
    });
    //Створення моделі
    const User = mongoose.model("User", userScheme);
    User.find({...userTmp}, function(err, docs){
        mongoose.disconnect();
         
        if(err) return console.log(err);
         
        console.log(docs);
        return docs
    });
    
}

function saveUser(user){
    console.log('bd: ',user)
    mongoose.disconnect();
    mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });    
    const Schema = mongoose.Schema;
    // Створення схеми моделі
    const userScheme = new Schema({
        name: String,
        age: Number
    });
    //Створення моделі
    const User = mongoose.model("User", userScheme);

    //Створення об’єкта моделі
    const userBD = new User(user);

    //Збереження моделі і відключення від бази даних
    userBD.save(function(err){
        mongoose.disconnect();  // від’єднання від бази даних
        
        if(err) return console.log(err);
        console.log("Збережено", user);
    });  
}


module.exports={saveUser,loadUsers}