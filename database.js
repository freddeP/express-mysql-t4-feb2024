const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"node_2024"

});

//createBook({title:"Ödeborgen", author:"Kristina Ohlsson"});
async function createBook(book){

    const con = await  pool.getConnection();
    const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
    const result = await con.query(sql,[book.title, book.author]);
    console.log(result);
    pool.releaseConnection(con);
    return result[0].insertId;

}

async function books(){
    const con = await  pool.getConnection();
    const sql = "SELECT id, title, author FROM books ORDER BY id DESC";
    let data =  await con.query(sql);
    console.log(data);
    pool.releaseConnection(con);
    return data[0];
}


module.exports = {createBook, books};