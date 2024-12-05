const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/bookcovers/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect("")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("could not connect to mongodb", error);
  });

const bookSchema = new mongoose.Schema({
  name:String,
  author:String,
  summary:String,
  availability:String,
  cite:String,
  expiration:String,
  image:String
});

const Book = mongoose.model("Book", bookSchema);

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/books", async(req,res)=>{
  const books = await Book.find();
  res.json(books);
});

app.post("/api/books", upload.single("image"), async(req, res)=>{    
  const result = validateBook(req.body);
    
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    console.log("I have an error");
    return;
  }
    
  const book = new Book ({
    name:req.body.name,
    author:req.body.author,
    summary:req.body.summary,
    availability:req.body.availability,
    cite:req.body.cite,
    expiration:req.body.expiration
  });
    
  if(req.file){
    book.image = req.file.filename;
  }
    
  const newBook = await book.save();

  res.status(200).send(newBook);
});
    
app.put("/api/books/:id", upload.single("image"), async(req,res)=>{
  const result = validateBook(req.body);
    
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
    
  const fieldsToUpdate = {
    name:req.body.name,
    author:req.body.author,
    summary:req.body.summary,
    availability:req.body.availability,
    cite:req.body.cite,
    expiration:req.body.expiration
  }
    
  if(req.file){
    fieldsToUpdate.image = req.file.filename;
  }
    
  const wentThrough = await Book.updateOne({_id:req.params.id}, fieldsToUpdate);

  const book = await Book.findOne({_id:req.params.id});

  res.status(200).send(book);
});
    
app.delete("/api/books/:id", async(req,res)=>{
  const book = await Book.findByIdAndDelete(req.params.id);

  res.status(200).send(book);
});

const validateBook = (book)=>{
  const schema = Joi.object({
    name:Joi.string().min(2).required(),
    author:Joi.string().min(2).required(),
    summary:Joi.string().min(2).required(),
    availability:Joi.string().min(2).required(),
    cite:Joi.string().min(2).required(),
    expiration:Joi.string().min(2).required(),
    image:Joi.string()
  });
    
  return schema.validate(book);
};


app.listen(3000, () => {
  console.log("Listening....");
});