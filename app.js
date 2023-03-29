const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const session = require('express-session');


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


app.listen(3000, ()=>{
    console.log('server is running')
})



//=====================================================(app.get)=========================================================================                                                                 

app.get('/', function(req,res){
    res.render('login',{
    })
})

app.get("/register", function(req, res) {
    res.render("registration");
})
app.get("/login", function(req, res) {
    res.render("login");
})
app.get("/registration", function(req, res) {
    res.render("registration");
})
app.get("/home", function(req, res) {
    res.render("home");
})


app.get("/drama", function(req, res) {
    res.render("drama");
})
app.get("/godfather", function(req, res) {
    res.render("godfather");
})
app.get("/godfather2", function(req, res) {
    res.render("godfather2");
})


app.get("/horror", function(req, res) {
    res.render("horror");
})
app.get("/scream", function(req, res) {
    res.render("scream");
})
app.get("/conjuring", function(req, res) {
    res.render("conjuring");
})


app.get("/action", function(req, res) {
    res.render("action");
})
app.get("/fightclub", function(req, res) {
    res.render("fightclub");
})
app.get("/darkknight", function(req, res) {
    res.render("darkknight");
})


app.get("/watchlist", function(req, res) {
    var sess = req.session;
    watchlist = loadWatchlist()
    for(let i=0; i<watchlist.length; i++){
        if(sess.user == watchlist[i][0]){
            usersWatchList = watchlist[i].shift()
            res.render("watchlist", {watchlist:usersWatchList})
        }
    }
    res.render("watchlist");
})

app.get("/searchresults", function(req, res){
    res.render("/searchresults", {Results:[]})
})




//=====================================================(app.post)=========================================================================                                                                 

app.post("/register", function(req, res){
    let account = {
        username: req.body.username, 
        password: req.body.password
    }
    if(checkUsername(account)==true){
    addNewAcc(account);
    res.send("Account has been registered successfully")
    }
    else{
        res.send("Error: This Username already exists, please enter a different Username");
    }


})
app.post("/", function(req, res){
    let account = {
        username: req.body.username, 
        password: req.body.password    
    }
    if(checkAccount(account) == true){
    var sess = req.session;
    sess.user = req.body.username;
    res.render("home");
    }
    else{
        res.send("Error: This Username has not been registered OR The password is Incorrect");
    }


})

app.post("/search", function(req, res){
    var listOfMovies = ["The GodFather", "The GodFather 2", "Fight Club", "The Conjuring", "The Dark Knight", "Scream" ]
    currentString = req.body.Search.toLowerCase()
    Results = []
    for(let i=0; i<listOfMovies.length; i++){
        if(listOfMovies[i].toLowerCase().includes(currentString)){
            switch(listOfMovies[i]){
                case "The GodFather":
                    Results.push(listOfMovies[i].link("/godfather"))
                    break
                case "The GodFather 2":
                     Results.push(listOfMovies[i].link("/godfather2"))
                     break
                case "Fight Club":
                     Results.push(listOfMovies[i].link("/fightclub"))
                    break
                case "The Conjuring":
                    Results.push(listOfMovies[i].link("/conjuring"))
                    break
                case "The Dark Knight":
                    Results.push(listOfMovies[i].link("/darkknight"))
                    break
                case "Scream":
                    Results.push(listOfMovies[i].link("/scream"))
                   break
                    } 
         }
    }
    if(Results.length==0){
        res.send("This Movie was not found")
    }
    else{
        res.render('searchresults', {Results:Results})  
    }


})

app.post("/godfather", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="The GodFather"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("The GodFather")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"The GodFather"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})
app.post("/godfather2", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="The GodFather 2"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("The GodFather 2")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"The GodFather 2"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})
app.post("/conjuring", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="The Conjuring"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("The Conjuring")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"The Conjuring"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})
app.post("/darkknight", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="The Dark Kight"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("The Dark Knight")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"The Dark Knight"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})
app.post("/fightclub", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="Fight Club"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("Fight Club ")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"Fight Club"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})
app.post("/scream", function(req, res){
    watchlistArray = loadWatchlist()
    var sess = req.session
    var flagUsers= false
    var index = 0
    for(let i=0; i<watchlistArray.length; i++){
        if(sess.user == watchlistArray[i][0]){
            flagUsers = true
            index = i 
        }
     }
     var flagMovies= false
     if(flagUsers == true){
         for(let i=1; i<watchlistArray[index].length; i++){
             if(watchlistArray[index][i]=="Scream"){
                 flagMovies = true
             }
         }
         if(flagMovies == false){
             watchlistArray[index].push("Scream")
         }
         else{
             res.send("This movie already exists")
         }
     }
     else{
         watchlistArray.push([sess.user,"Scream"])
     }

     fs.writeFileSync('watchlist.json', JSON.stringify(watchlistArray))

})





//=====================================================(Funtions)=========================================================================                                                                 

//load tasks array from a file
let loadNewAcc = function(){
    try {
        let bufferedData = fs.readFileSync('accounts.json')
        let dataString = bufferedData.toString()
        let datasArray = JSON.parse(dataString)
        return datasArray
    } catch (error) {
        return []
    }
   
}

let loadWatchlist = function(){
    try {
        let bufferedData = fs.readFileSync('watchlist.json')
        let dataString = bufferedData.toString()
        let datasArray = JSON.parse(dataString)
        return datasArray
    } catch (error) {
        return []
    }
   
}



//add a new task to tasks array
let addNewAcc = function(account){
    //load tasks array
    let accountArray = loadNewAcc()
        //push new task in array
         accountArray.push(account)
             //save array back in file
             fs.writeFileSync('accounts.json', JSON.stringify(accountArray))
}  



let checkUsername = function(account){
    let checkArray = loadNewAcc()
    for(let i=0; i<checkArray.length; i++){
        if(account.username == checkArray[i].username){
            return false;
    }
}
    return true;
}

let checkAccount = function(account){
    let checkArray = loadNewAcc()
    for(let i=0; i<checkArray.length; i++){
        if(account.username == checkArray[i].username && account.password == checkArray[i].password){
            
                return true;
    }
}
    return false;
}














    








