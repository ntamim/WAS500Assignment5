const express = require('express');


const mongoose = require("mongoose");

let schemma = require('../models/books' );
  //const url ="mongodb+srv://lab5:lab5@lab5.hcax9nj.mongodb.net/?retryWrites=true&w=majority";
  const username = "lab5";
  const password = "lab5";
  const cluster = "lab5.hcax9nj";
  const dbname = "lab5";
 
      // Connecting to database
      mongoose.connect( `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`).then((ans) => {
          console.log("Connected Successfully")
      }).catch((err) => {
          console.log("Error in the Connection")
      })
      
      // Calling Schema class
      const Schema = mongoose.Schema;
      
      // Creating Structure of the collection
      const collection_structure = new Schema(schemma );
      
      // Creating collection
      const collections = mongoose.model("book", collection_structure );
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser'); 
let resultbooks=[];
const app=express();
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

module.exports = {
    home:(req, res)=>{
        res.render( "../views/index.ejs");
    },
     
    books:(req, res)=>{
          
           var  query= collections.find({}); 
            query.exec(function (err, book) {
                if (err) return handleError(err); 
                console.log( book);
                //res.json(JSON.stringify(book));
                res.render( "../views/books.ejs" , {characters:book});
            });
         //console.log(collections);
          //res.render( "../views/books.ejs" , {toDoList:book});
    },
   
    search_books:async (req, res)=>{ 
        let bname = [req.query.name || []].flat(); 
        //console.log(bname);
        var  query= collections.find({name: bname}); 
           query.exec(function (err, book) {
            if (err) return handleError(err); 
            console.log(book);
            res.render( "../views/search.ejs", {characters:book,bookname:bname});
          }); 
          //res.render( "../views/book.ejs" , {characters:''});
        
    },
    book:async (req, res)=>{ 
        let id = [req.query.id || []].flat(); 
           var  query= collections.find({_id: id}); 
           query.exec(function (err, book) {
            if (err) return handleError(err); 
            //console.log(book);
            res.render( "../views/book.ejs" , {characters:book});
          }); 
          
        
    },
    errorpage:async (req, res)=>{ 
         
            res.render( "../views/404.html"  );
           
    },
    insert:async (req,res)=>{
        try{
      
        const bookmode2 = new  book({

            name:"Test book",
            author_name:"Test Hussein",
            description:"LTest",
            image:"Test.png",
        });
        const result2 = await  bookmode2.save();
    }catch(error){
       
       res.send(error.message);
    }

    }
}