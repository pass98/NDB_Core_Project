const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../config/datebase");
const mp_subs_img = {
    'basic' : 'public/img/베이직.png',
    'standard' : 'public/img/스탠다드.png',
    'pro' : 'public/img/BASIC.jpg'
};


// 사용자 프로필 페이지
let conn = db.init()
router.get("/mypage", (req, res) => {
    conn.connect()
    const sql =  "SELECT USER_ID, MEMBER_NAME FROM MEMBER LIMIT 1";
    conn.query(sql, (err, results) => {
        if(!err){
            const data = results[0]
            console.log('사이트 접속 성공!')
            
            res.render("myPage.html", {id: data.USER_ID, name: data.MEMBER_NAME});
            console.log(data)
        }else{
            console.log('사이트 접속 실패!')
        }
       
    });
    
});
  module.exports = router;