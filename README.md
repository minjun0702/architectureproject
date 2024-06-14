## 환경변수
+ env.example 파일의 이름을 .env로 변경하고 아래 내용을 채움
```
SERVER_PORT= 서버 포트
DATABASE_URL= mysql://계정이름:비밀번호@주소:포트/DB명
ACCESS_TOKEN_SECRET_KEY= JWT 생성을 위한 비밀키
REFRESH_TOKEN_SECRET = REFRESHTOKEN 생성을 위한 비밀 키
```

## 실행 방법 (with yarn)
+필요한 패키지 설치
```
yarn
```
+DB테이블 생성
```
yarn prisma db push
```
+서버 실행 (개발용)
```
yarn run dev
```

## API 명세서
<https://thundering-philosophy-7ed.notion.site/Node-js-API-855059b2f0b043a097db5e9462a18de6?pvs=4>

## ERD
<https://drawsql.app/teams/team-3527/diagrams/skillproject>


## 서버 주소
<http://52.78.12.63:3000/>

<br>
기본적인 기능(회원가입, 로그인, 내정보 조회, 이력서 전체조회(+role에 따라 조회 권한 부여), 이력서 상세조회, 이력서 생성,수정,삭제 구현 완료
