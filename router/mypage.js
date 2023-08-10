const express = require("express");
const router = express.Router();
const passport = require("passport");


// 사용자 프로필 페이지
router.get("/myapge", (req, res) => {
      // res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
      res.render("myPage.html");
  });

  module.exports = router;