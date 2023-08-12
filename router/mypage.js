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
router.get("/mypage", (req, res) => {
      // res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
      res.render("myPage.html");
  });

 
  
  module.exports = router;