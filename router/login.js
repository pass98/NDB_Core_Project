const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy; // passport-kakao 모듈을 추가해야 합니다.
const GitHubStrategy = require("passport-github2").Strategy;

const db = require("../config/datebase");
let conn = db.init();

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

/* =======================================
              카카오 로그인 
   ======================================= */

// 카카오 OAuth 2.0 클라이언트 ID 설정
const KAKAO_CLIENT_ID = "accfec57b1b9be32ee75b2c22a044a2b"; // 여기에 발급받은 클라이언트 ID 입력

// Passport 카카오 로그인 전략 설정
passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      callbackURL: "/auth/kakao/callback", // 여기에 콜백 URL 입력
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

// 세션에 저장된 사용자 정보를 복구하여 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 카카오 소셜 로그인 시작
router.get("/auth/kakao", passport.authenticate("kakao"));

// 로그인 콜백 핸들러
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/index" route
    res.render("index.html", { user: req.user });
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.html");
  } else {
    res.render("login.html");
  }
});

/* ======================================
              깃허브 로그인 
   =====================================*/

// 깃허브 OAuth 2.0 클라이언트 ID 및 시크릿 설정
const GITHUB_CLIENT_ID = "cdc134ce6df8f8df71d8"; // 여기에 발급받은 클라이언트 ID 입력
const GITHUB_CLIENT_SECRET = "daab2cd2bd2cc57a5e04e265eadc040abfeb48ce"; // 여기에 발급받은 클라이언트 시크릿 입력

// Passport 깃허브 로그인 전략 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback", // 여기에 콜백 URL 입력
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

// 세션에 저장된 사용자 정보를 복구하여 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 깃허브 소셜 로그인 시작
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// 로그인 콜백 핸들러
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/index" route
    res.redirect("/index");
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.html", { user: req.user });
  } else {
    res.render("login.html");
  }
});

// 로그아웃
router.get("/logout", (req, res) => {
  req.logout();
  res.render("login.html");
});

// 기본 라우트
router.get("/login", (req, res) => {
  res.render("login.html");
});

router.get("/join", (req, res) => {
  res.render("join.html");
});

router.post("/join", (req, res) => {
  let join_name = req.body.name;
  let join_email = req.body.email;
  let join_pass = req.body.pass;

  console.log("Name:", join_name, "Email:", join_email, "Password:", join_pass);

  // DB 연결
  conn.connect(function (err) {
    if (err) {
      console.error("DB Connection Error:", err);
      return;
    }

    let sql =
      "INSERT INTO MEMBER (MEMBER_NAME, SIGN_PLATFORM_TYPE, PW) VALUES (?, ?, ?)";
    conn.query(sql, [join_name, "NDB", join_pass], function (err, result) {
      if (err) {
        console.error("Query Error:", err);
      } else {
        console.log("Data inserted successfully:", result);
      }

      // DB 연결 종료
      conn.end();
    });
  });
});
module.exports = router;
