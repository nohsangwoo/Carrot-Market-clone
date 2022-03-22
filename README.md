# Serverless Carrot Market Clone

- using: NextJS, TailWind, Prisma, PlanetScale and cloudflare

# 3 SETUP

## Nextjs install with typescript

- ref: https://nextjs.org/docs/getting-started
- npx create-next-app@latest --typescript

## If the official version wasn't released,

- npm install next@latest react@rc react-dom@rc

## TailwindCSS Setup

- npm install -D tailwindcss postcss autoprefixer
  (and then,)
- npx tailwindcss init
<!-- follow this install and config)-->
- ref: https://tailwindcss.com/docs/guides/nextjs

## Automatic Class Sorting with Prettier

- prettier를 이용하여 코드 정리시 class의 이름을 자동 정렬해주는 기능(코드 통일화 기능)
- ref: https://tailwindcss.com/blog/automatic-class-sorting-with-prettier

## tailwindCSS plugin사용법

@tailwindcss/forms

- ref: https://tailwindcss.com/docs/plugins

## heroicons.dev

- ref: https://heroicons.dev/

## tailwindCSS

- pointer-events-none
  글자 드래그 방지
- space-y-8
  하위 태그들의 y축 margin 사이값을 변경
- space-x-8
  하위 태그들의 x축 margin 사이값을 변경

- divide-y-[1px]
  하위 태그들 사이 y축 사이사이 선을 그어준다
- aspect-video
  화면 비율을 자동으로 지정해준다

## Prisma

- ref: https://www.prisma.io/
- npm install prisma --save-dev

## prisma usage

- npx prisma ...whatever things..

## prisma init

- 기존에 존재하는 프로젝트에 prisma를 추가할때
- ref: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres
- npx prisma init

```
// prisma init시 나타나는 안내문
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver or mongodb (Preview).
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

## planetScale

1. preview

- db와 관련된 각종 작업(scale, 보안 등)을 planetScale에서 대신해줌
- ref: https://planetscale.com/

2. planetScale installation

- ref: https://github.com/planetscale/cli

* brew install planetscale/tap/pscale
* brew install mysql-client

3. install시 나타나는 에러 핸들링 방법

```
Error: Your Command Line Tools are too outdated.
Update them from Software Update in System Preferences or run:
  softwareupdate --all --install --force

If that doesn't show you any updates, run:
  sudo rm -rf /Library/Developer/CommandLineTools
  sudo xcode-select --install

Alternatively, manually download them from:
  https://developer.apple.com/download/all/.
You should download the Command Line Tools for Xcode 13.2.1.

```

4. planet scale cli가 설치된 이후

- pscale auth login(cli 로그인 해줘야함)
- psclae region list(사용가능한 위치 확인)

```
  NAME (6)                      SLUG           ENABLED
 ----------------------------- -------------- ---------
  US East - Northern Virginia   us-east        Yes
  US West - Oregon              us-west        Yes
  EU West - Dublin              eu-west        Yes
  Asia Pacific - Mumbai         ap-south       Yes
  Asia Pacific - Singapore      ap-southeast   Yes
  Asia Pacific - Tokyo          ap-northeast   Yes // 이곳이 제일 가까움
```

5. pscale database

- Usage:
  pscale database [command]

- Aliases:
  database, db

- Available Commands:
  create Create a database instance
  delete Delete a database instance
  dump Backup and dump your database
  list List databases
  restore-dump Restore your database from a local dump directory
  show Retrieve information about a database

6. pscale database 생성

- pscale database create carrot-market --region ap-northeast
  (또는 web에서 gui환경에서 클릭몇번으로 만들수도 있음.)

7. 만들어진 psclae database에 prisma랑 연동하기

- pscale connect carrot-market(만들어진 데이터 베이스를 연결해주는 역할)
  (여기서 제공하는 applicaton 주소를 schema.prisma파일의 datasource부분에 연결된 .env 내용을 찾아 해당 url을 추가해준다 )
  (이때pscale과 연결을 끊으면 안됨)

```
// 아래와 같이 해당주소를
DATABASE_URL="mysql://[제공된주소]//[database명칭]"
// 즉 아래와 같은 패턴이다
DATABASE_URL="mysql://xxx.x.x.x:xxxx//carrot-market"
```

8. prisma 와 planet scale 연동시 설정해줘야 하는 부분

- foreign key 설정

* ref: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-integrity

9. prisma scheme model을 planet scale에 연동하기

- npx prisma db push

### @prisma/client

- ref: https://www.prisma.io/docs/concepts/components/prisma-client
  prisma를 제어하기위한 tools
- npm install @prisma/client

### prisma가 스키마를 확인해서 타입스크립트로 타입을 만들어주기

- npx prisma generate

### nextjs에서 api만들기(api route 만들기)

- pages/api 디렉토리 안에 파일을 생성하면 그 파일명이 endpoint가된다

### react hook form v7

- ref: https://react-hook-form.com/

### fetch하는 방법은 일반적인 fetch방법과 완벽히 동일하다.

## upsert

Database에서 무엇인가를 가져오려고 할때 유효성 검사하는 행위를 말한다.

```
  const { phone, email } = req.body

  const payload = phone ? { phone: +phone } : { email }

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    // user를 찾지 못했다면 새로 생성
    create: {
      name: 'Anonymous',
      ...payload,
    },
    // user를 찾았다면 수정
    update: {},
  })

  console.log('user: ', user)
```

## prisma schema.prisma 자동완성 안되는 이슈

- referentialIntegrity = "prisma" 옵션을 주석처리하면 임시로 자동완성 동작한다.

## prisma - connectOrCreate

- ref: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-or-create-a-record

## twilio

- ref: https://console.twilio.com/
- 해외의 유명한 서비스이고 국내 서비스를 이용해도된다.
- sms 전화번호 email정도 사용할꺼임. 나머지는 너무 이용료가 비싸다.
- 현재 trial version이라서 지정된 한개의 번호로 밖에 보낼수 없다.(내 폰번호로 설정함)

## twilio cli install

- ref: https://www.npmjs.com/package/twilio

## sendgrid - by twilio

- ref: https://sendgrid.com/
- twilio가 sendgrid 사버렸음.

## or nodemailer로 대체해서 사용해도됨

- node에서 메일 보내는 모듈
- gmail과 naver등 SMTP설정 후 사용할수 있다.

1. sendgrid 모듈 설치

- npm install --save @sendgrid/mail
