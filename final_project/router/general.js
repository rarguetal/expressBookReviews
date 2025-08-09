const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function searchBooksByProperty(propertyName,value) {
  let result = [];
  for (let key in books) {
    if (books[key][propertyName] === value) {
      result.push(books[key]);
    }
  } 

  return result;
}

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn], null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  return res.send(JSON.stringify(searchBooksByProperty("author",author), null, 4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  return res.send(JSON.stringify(searchBooksByProperty("title",title), null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn].reviews, null ,4))
});

module.exports.general = public_users;
