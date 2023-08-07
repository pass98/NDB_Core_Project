const express = require('express')
const router = express.Router();
const db = require("../config/datebase");
let conn = db.init();
const data = require('../public/js/index');


let exam_desc = data.f_text + "\n" + data.apitext;
router.get("/index", function (req, res) {
    
    conn.connect();
    let user_input = req.query.main_searchBar_Name; //사용자 입력 데이터
    let select_language = req.query.main_searchLanguage; //사용자 선택 언어
    let sql = `insert into QUESTION (EXAM_LANGUAGE, SEARCH_WORD, EXAM_CONTENT, EXAM_HTML, EXAM_CSS, EXAM_JS )values(?,?,?,?,?,?)`
    console.log(select_language)
    console.log(user_input)
    console.log(data.f_text)
    console.log(data.htmlCode)
    console.log(data.cssCode)
    console.log(data.jsCode)
    conn.query(sql, [select_language, user_input, exam_desc, data.htmlCode, data.cssCode, data.jsCode], function (err, rows) {
        if (!err) {
            console.log("쿼리문 실행 완료")
        }
        else {
            console.log("DB 쿼리문 실행 실패")
        }
    })
})

module.exports = router;