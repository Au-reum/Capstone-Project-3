import express from "express";
import bodyParser from "body-parser";

let posts = [];
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { posts, page: "home" });
});

app.get("/about", (req, res) => {
    res.render("about", {page: "about"});
})

app.get("/new-post", (req, res) => {
    res.render("index", { page: "new-post" });
});

app.post("/submit", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    posts.push({ title, content });

    res.redirect("/");
});

app.get("/post/:id/edit", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    
    if (post) {
        res.render("index", { post, postId, page: "edit-post" });
    } else {
        res.send("Post not found");
    }
});

app.post("/post/:id/edit", (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    if (posts[postId]) {
        posts[postId] = { title, content };
        res.redirect("/");
    } else {
        res.send("Post not found");
    }
});

app.post("/post/:id/delete", (req, res) => {
    const postId = req.params.id;

    if (posts[postId]) {
        posts.splice(postId, 1);
        res.redirect("/");
    } else {
        res.send("Post not found");
    }
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    
    if (post) {
        res.render("index", { post, postId, page: "view-post" });
    } else {
        res.send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`Server connected to ${port}`);
});