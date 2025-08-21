// const express = require("express");
// const multer = require("multer");
// const app = express();

// const bodyParser = require("body-parser");

// const Post = require("./models/post");
// const path = require('path');


// app.use("/images", express.static(path.join(__dirname, "images")));


// const MIME_TYPE_MAP = {
//     'image/png':'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg' : 'jpg'
// };
// const storge = multer.diskStorage({

//     destination: (req, file, cb) => {
//         const isValid =MIME_TYPE_MAP[file.mimetype];
//         let error = new Error("Invalid mime type");
//         if(isValid){
//             error=null;
//         }
//         cb(null, path.join(__dirname, "images"));

//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + '-' + Date.now() + '.' + ext);
//     }
// });

// const mongoose = require("mongoose");
// mongoose
//   .connect(
//     "mongodb+srv://Rana:XTZb4JVM9TFA7vBu@cluster0.odgpbnl.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS, PUT"
//   );
//   next();
// });

// app.use(bodyParser.json());

// app.post("/api/posts", multer({ storage: storge }).single("image"), (req, res, next) => {
//   const url = req.protocol + '://' + req.get('host'); // ✅ Fix here

//   if (!req.file) {
//     return res.status(400).json({ message: "No image uploaded." });
//   }

//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//     imagePath: url + "/images/" + req.file.filename
//   });

//   post.save().then((result) => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: result._id
//     });
//   }).catch((err) => {
//     console.error('Error saving post:', err);
//     res.status(500).json({ message: "Failed to save post", error: err });
//   });
// });


// app.get("/api/posts", (req, res, next) => {
//   Post.find().then((documents) => {
//     console.log(documents);
//     res.status(200).json({
//       messages: "posts fetched successfuly!",
//       posts: documents,
//     });
//   });
// });

// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id })
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({ message: "Post Deleted" });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: "Deleting post failed", error });
//     });
// });

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//   });
//   Post.updateOne({ _id: req.params.id }, post).then((result) => {
//     console.log(result);
//     res.status(200).json({ message: "update successful" });
//   });
// });

// app.get("/api/posts/:id", (req, res, next) => {
//   Post.findById(req.params.id).then((post) => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   });
// });

// module.exports = app;

//XTZb4JVM9TFA7vBu

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user")
const app = express();

mongoose
  .connect(
    "mongodb+srv://Rana:XTZb4JVM9TFA7vBu@cluster0.odgpbnl.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
