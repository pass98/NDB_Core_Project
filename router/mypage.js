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
// 사용자 프로필 페이지
let conn = db.init();

router.get("/mypage", (req, res) => {
    conn.connect(err => {
        if (err) {
            console.error('데이터베이스 연결 오류:', err);
            res.status(500).send('Internal Server Error'); // 서버 내부 오류 응답
            return;
        }
// 우선 별명은 USER_ID로 가져와서 넣음,  MEMBER_LV 데이터까지 가져와서 member_lv로 함, 아직 주소창 세션 정보 없어서 limit 1으로 함
        const sql = "SELECT USER_ID, MEMBER_NAME, PW, MEMBER_LV FROM MEMBER LIMIT 1"; 
        conn.query(sql, (err, results) => {
            if (err) {
                console.error('쿼리 수행 오류:', err);
                res.status(500).send('Internal Server Error'); // 서버 내부 오류 응답
                return;
            }

            if (results.length > 0) {
                const data = results[0];
                console.log('사이트 접속 성공!');
                res.render("myPage.html", {
                    id: data.USER_ID, 
                    name: data.MEMBER_NAME, 
                    password: data.PW, 
                    member_lv: data.MEMBER_LV
                });
                console.log(data);
            } else {
                console.log('사이트 접속 실패! 결과 없음.');
                res.status(404).send('Not Found'); // 결과 없음 응답
            }
        });
    });
});





  module.exports = router;