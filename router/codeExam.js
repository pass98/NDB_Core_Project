const express = require('express')
const router = express.Router();
const db = require("../config/database");
let conn = db.init();

router.get("/index", function(req, res){
    conn.connect();

    let sql = "insert into QUESTION values(?,?,?,?)"

    conn.query(sql, [], function(err, rows){
        
    })
})