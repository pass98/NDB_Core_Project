const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const db = require("../config/datebase");
// let conn = db.init();

// 구글 OAuth 2.0 클라이언트 ID와 시크릿 설정
const GOOGLE_CLIENT_ID =
  "387069556796-pal9i13mtuj16inovquf5h4ucs8s926d.apps.googleusercontent.com"; // 여기에 발급받은 클라이언트 ID 입력
const GOOGLE_CLIENT_SECRET = "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"; // 여기에 발급받은 클라이언트 시크릿 입력

// Passport 구글 로그인 전략 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 여기에서 profile 정보를 확인하고 사용자 데이터베이스에 저장하거나 확인할 수 있습니다.
      return done(null, profile);
    }
  )
);

// 로그인 성공 시 사용자 정보를 세션에 저장
passport.serializeUser(function (user, done) {
  done(null, user);
});

// 세션에 저장된 사용자 정보를 복구하여 사용자 정보를 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 구글 소셜 로그인 시작
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 로그인 콜백 핸들러
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/profile" route

    res.redirect("/index");
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    // res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
    res.render("index.html");
  } else {
    res.render("login.html");
  }
});

// 로그아웃
router.get("/logout", (req, res) => {
  req.logout();
  res.render("/");
});

// 기본 라우트
router.get("/login", (req, res) => {
  res.render("login.html");
});

router.get("/join", (req, res) => {
  res.render("join.html");
});
module.exports = router;
