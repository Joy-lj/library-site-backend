const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");


const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/images/");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
});

const upload = multer({ storage: storage });

const books = [
    {
        id: 1,
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        summary: "To Kill a Mockingbird is a Pulitzer-Prize-winning novel written by Harper Lee and originally published in 1960. The book is widely regarded as an American classic and, until recently, was the only novel Lee had published. To Kill a Mockingbird was inspired by events and observations that took place in Lee's hometown. Set in the Great Depression, from 1932 to 1935, the novel is narrated by a young girl named Scout, whose coming-of-age experiences closely mirror Lee's. To Kill a Mockingbird follows the lives of three children: Scout; her brother, Jem; and their friend, Dill. In the beginning, the novel focuses on the wild imaginations of the three children as they entertain themselves during the summer in Maycomb, Alabama. Maycomb is a quiet town with deep-seated social hierarchies based on race, class, and how long each family has lived there. Within their respective social groups, Maycomb's residents are closely-knit, to the point of being (both metaphorically and literally) incestuous, and gossip runs wild about any person who diverges from social norms (SuperSummary, n.d.).",
        availability: "3 out of 5",
        themes: [
         "Racism and Prejudice",
        "Coming-of-age",
        "Class, courage, and gender roles"
        ],
        image: "tokillamockingbird.jpg",
        cite: "@'To Kill a Mockingbird', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 2,
        name: "Pride and Prejudice",
        author: "Jane Austin",
        summary: "Pride and Prejudice, romantic novel by Jane Austen, published anonymously in three volumes in 1813. A classic of English literature, written with incisive wit and superb character delineation, it centers on the burgeoning relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. Upon publication, Pride and Prejudice was well received by critics and readers. The first edition sold out within the first year, and it never went out of print (Britannica, n.d.).",
        availability: "4 out of 6",
        themes: [
        "Love",
        "Family",
        "Class and gender roles"
        ],
        image: "prideandprejudice.jpg",
        cite: "@'Pride and Prejudice', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 3,
        name: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        summary: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins. From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion. When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom (goodreads, n.d.).",
        availability: "2 out of 8",
        themes: [
        "Death and Immortality",
        "Good and Evil",
        "Fate and Free Will"
        ],
        image: "lordoftherings.jpg",
        cite: "@'The Lord of the Rings', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 4,
        name: "Little Women",
        author: "Louisa May Alcott",
        summary: "Generations of readers young and old, male and female, have fallen in love with the March sisters of Louisa May Alcott's most popular and enduring novel, Little Women. Here are talented tomboy and author-to-be Jo, tragically frail Beth, beautiful Meg, and romantic, spoiled Amy, united in their devotion to each other and their struggles to survive in New England during the Civil War. It is no secret that Alcott based Little Women on her own early life. While her father, the freethinking reformer and abolitionist Bronson Alcott, hobnobbed with such eminent male authors as Emerson, Thoreau, and Hawthorne, Louisa supported herself and her sisters with 'woman's work,' including sewing, doing laundry, and acting as a domestic servant. But she soon discovered she could make more money writing. Little Women brought her lasting fame and fortune, and far from being the girl's book her publisher requested, it explores such timeless themes as love and death, war and peace, the conflict between personal ambition and family responsibilities, and the clash of cultures between Europe and America (goodreads, n.d.).",
        availability: "5 out of 5",
        themes: [
        "Love",
        "Feminism",
        "Sisterhood"
        ],
        image: "littlewomen.jpg",
        cite: "@'Little Women', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 5,
        name: "The Book Thief",
        author: "Markus Zusak",
        summary: "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still. By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor's wife's library, wherever there are books to be found. But these are dangerous times. When Liesel's foster family hides a Jew in their basement, Liesel's world is both opened up, and closed down (goodreads, n.d.).",
        availability: "1 out of 6",
        themes: [
        "Literacy and Power",
        "Death, dying and grief",
        "Innocence"
        ],
        image: "thebookthief.jpg",
        cite: "@'The Book Thief', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 6,
        name: "Anne of Green Gables",
        author: "Lucy Maud Montgomery",
        summary: "This heartwarming story has beckoned generations of readers into the special world of Green Gables, an old-fashioned farm outside a town called Avonlea. Anne Shirley, an eleven-year-old orphan, has arrived in this verdant corner of Prince Edward Island only to discover that the Cuthberts—elderly Matthew and his stern sister, Marilla—want to adopt a boy, not a feisty redheaded girl. But before they can send her back, Anne—who simply must have more scope for her imagination and a real home—wins them over completely. A much-loved classic that explores all the vulnerability, expectations, and dreams of a child growing up, Anne of Green Gables is also a wonderful portrait of a time, a place, a family… and, most of all, love (goodreads, n.d.).",
        availability: "2 out of 8",
        themes: [
        "Coming-of-age",
        "Imagination",
        "Family"
        ],
        image: "anneofgreengables.jpg",
        cite: "@'Anne of Green Gables', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 7,
        name: "The Catcher in the Rye",
        author: "J.D. Salinger",
        summary: "Fleeing the crooks at Pencey Prep, he pinballs around New York City seeking solace in fleeting encounters—shooting the bull with strangers in dive hotels, wandering alone round Central Park, getting beaten up by pimps and cut down by erstwhile girlfriends. The city is beautiful and terrible, in all its neon loneliness and seedy glamour, its mingled sense of possibility and emptiness. Holden passes through it like a ghost, thinking always of his kid sister Phoebe, the only person who really understands him, and his determination to escape the phonies and find a life of true meaning (goodreads, n.d.).",
        availability: "2 out of 5",
        themes: [
        "Coming-of-age",
        "Religion",
        "Innocence and Isolation"
        ],
        image: "thecatcherintherye.jpg",
        cite: "@'The Catcher in the Rye', goodreads, n.d.",
        expiration: "10 days",
  },
  {
        id: 8,
        name: "Don Quixote",
        author: "Miguel de Cervantes",
        summary: "Don Quixote has become so entranced by reading chivalric romances that he determines to become a knight-errant himself. In the company of his faithful squire, Sancho Panza, his exploits blossom in all sorts of wonderful ways. While Quixote's fancy often leads him astray—he tilts at windmills, imagining them to be giants—Sancho acquires cunning and a certain sagacity. Sane madman and wise fool, they roam the world together, and together they have haunted readers' imaginations for nearly four hundred years (goodreads, n.d.).",
        availability: "5 out of 5",
        themes: [
        "Truth and Lies",
        "Madness and Sanity",
        "Intention and Consequence"
        ],
        image: "donquixonte.jpg",
        cite: "@'Don Quixote', goodreads, n.d.",
        expiration: "10 days",
  }];

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/books", (req,res)=>{
    res.json(books);
});

app.post("/api/books", upload.single("image"), (req, res)=>{
      console.log("In a post request");
    
      const result = validateBook(req.body);
    
      if(result.error){
        res.status(400).send(result.error.details[0].message);
        console.error(result.error.details);
        console.log("I have an error");
        return;
      }
    
      const book = {
        id:books.length + 1,
        name:req.body.name,
        author:req.body.author,
        summary:req.body.summary,
        availability:req.body.availability,
        cite:req.body.cite,
        expiration:req.body.expiration
      }
    
      if(req.file){
        book.image = req.file.filename;
      }
    
      books.push(book);
    
      console.log(book);
      res.status(200).send(book);
});
    
const validateBook = (book)=>{
      const schema = Joi.object({
        name:Joi.string().min(2).required(),
        author:Joi.string().min(2).required(),
        summary:Joi.string().min(2).required(),
        availability:Joi.string().min(2).required(),
        cite:Joi.string().min(2).required(),
        expiration:Joi.string().min(2).required()
      });
    
      return schema.validate(book);
};


app.listen(3000, () => {
    console.log("Listening....");
});