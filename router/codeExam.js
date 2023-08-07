const express = require('express')
const router = express.Router();
const db = require("../config/datebase");
let conn = db.init();


router.post("/index/save", function (req, res) {
    
    let user_input = '나 형균'; //사용자 입력 데이터
    let select_language = req.body.select_language; //사용자 선택 언어
    let f_text = req.body.f_text;
    let apitext = req.body.apitext;
    let htmlCode = req.body.htmlCode;
    let cssCode = req.body.cssCode;
    let jsCode = req.body.jsCode;
    let cCode = "";
    let javaCode = "";
    let pythonCode = "";
    let exam_id = 2;
    let exam_desc = f_text + "\n" + apitext;

    let sql = `insert into QUESTION (EXAM_ID,EXAM_LANGUAGE, SEARCH_WORD, EXAM_CONTENT, EXAM_HTML, EXAM_CSS, EXAM_JS, EXAM_JAVA, EXAM_C, EXAM_PYTHON )values(?,?,?,?,?,?,?,?,?,?)`;

    conn.query(sql, [exam_id, select_language, user_input, exam_desc, htmlCode, cssCode, jsCode, javaCode, cCode, pythonCode], function (err, rows) {
        if (!err) {
            console.log("쿼리문 실행 완료");
            res.json({success: true});
        } else {
            console.log("DB 쿼리문 실행 실패", err);
            res.json({success: false, error: err});
            console.log(user_input, select_language)
        }
    });
});

module.exports = router;





