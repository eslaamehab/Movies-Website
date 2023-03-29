const fs = require('fs')

let account = {
    username ,
    password 
}



//console.log(book.author)

let accountsjson = JSON.stringify(account)
//console.log(bookjson)

//let parsedData = JSON.parse(bookjson)
//console.log(parsedData.title)

//fs.writeFileSync('book.json', bookjson)

let data = fs.readFileSync('accounts.json')
let StringData = data.toString()
let parsedData = JSON.parse(StringData)


console.log(parsedData.title)