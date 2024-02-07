const express = require("express");
const db = require("./database");

const app = express();

app.listen(3000);

app.use(express.json());


app.get("/books", async(req, res)=>{
    try {
        res.send(await db.books());
    } catch (error) {
        res.send(error);
    }
});
app.get("/books/:title/:author", async (req, res)=>{

    const {title, author} = req.params;
    let id = await db.createBook({title, author});
    res.send({id, title, author });

});