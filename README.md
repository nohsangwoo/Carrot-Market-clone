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

## iron-session (serverless Sessions)

- ref: https://github.com/vvo/iron-session
- nextjs에서 session 관리 하는 방법
- npm install iron-session

## withSession HOF로 session관리하기

password generator로 password 만들기

- https://passwordsgenerator.net/

## nextAuth 알아보기

- ref: https://next-auth.js.org/

## router.push & router.replace

- router.push
  뒤로가기 있음(히스토리 있음)
- router.replace
  뒤로가기 없음(히스토리 없음)

## SWR

- ref: https://swr.vercel.app/ko
- react query 같은건데 캐싱이 잘됨.
- npm i swr --legacy-peer-deps
  (Installation method when React 18 version is not yet official)
- SWRConfig라는 프로바이더를 적용하여 gobal value를 적용할 수 있다.

## prisma client 객체가 계속 생성되는 버그 해결

## db에 text 길이제한 옵션

- @db.MediumText
  기본varchar 길이랑 다른 길이 제한을 입력받을 수 있다.

npm i --save-dev prisma@latest
npm i @prisma/client@latest

## SWR cache bound mutation

- 한개의 fetch요청에 한해서 캐시 데이터를 수정함
- ref: https://swr.vercel.app/ko/docs/mutation
  SWR로 refetch 하지않고 내부적으로 cache에 저장된 값을 변경하여 빠른 사용자 경험 제공

- mutate의 첫번째인자는 캐시에 덮어씌울 데이터, 두번째 인자는 재검증 여부임, 캐쉬에 덮어씌운 이후 refetch를 통해 재검증을 할것이냐 OR 캐쉬에 덮어씌운 이후 아무것도 하지 않을 것인가 선택사항(true or false)

## SWR cache unbound mutation

- 현재 요청한 fetch가 아닌 다른 fetch의 캐시 데이터를 수정함
- useSWRConfig에서 mutate를 추출하고
  mutate("캐시대상아이디("api end point",)

## `prisma _count`

- prisma에서 자체적으로 자신에게 연결된 관계가 몇개인지 count해주는 기능이 있다

해당 product에 연결된 favs의 갯수를 구하여라

```
const products = await client.product.findMany({
  include: {
    _count: {
      select: {
        favs: true,
      },
    },
  },
})
```

## 검색 범위 조절

- 사용자의 위치를 기준으로
  0.01 < 사용자의 위치 < +0.01도
  범위내의 post또는 게시물을 가져온다.

```
where: {
  latitude: {
    gte: parsedLatitude - 0.01,
    lte: parsedLatitude + 0.01,
  },
  longitude: {
    gte: parsedLongitue - 0.01,
    lte: parsedLongitue + 0.01,
  },
},
```

## backend api에서도 query string의 값을 추출할수 있다

- api의 endpoint가 src/pages/api/posts/[id]/index

- req.query.params로 접근 가능

## Nextjs에서는 항상 pre generate를 의식해야함

예를 들어 useEffect에서 state의 변경된 값으로
첫번째 실행을 하려고 해도 pre generate로 인하여
미리 state가 특정값으로 변하기전에 useEffect가 실행되는 경우가 있다. 이런 점들을 의식해야함.

## schema에서 enum형식을 지정할 수 도 있다.

Sale, Purchase, Fav 테이블의 구성은 완벽하게 동일하기에
이것을 Record란 테이블로 한데모아서 kind로 종류만 구분하여 기록하는것이 실DB구성 모델에 가깝다.

## react hook form - valueAsNumber option

- number로 형변환 해줌

## prisma suctom command 생성하고 실행하기

- package.json 명령어 생성

```
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

- 명령어 실행문
  npx prisma db seed

-

## 자동으로 stream에 500개정도 쿼리 박아주는 자동 인젝션 파일 생성

- 이때 동시 접속제한을 풀어줘야함
- ref: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool

## todo - react query를 이용하여 infinite scroll 구현하기

## client에서 바로 cloud flare로 direct upload 방법

- ref: https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload/

- 비슷한것으로는 presiged url이라는것이 있다.

## cloud flare setup

client에서 바로 이미지 업로드 가능하게 변경
aws presigned url과 비슷함

- cloud flare accound id와 image token을 생성하고 저장한다.

## resize images

- ref: https://developers.cloudflare.com/images/cloudflare-images/resize-images/

- cloud flare에서 custom variant를 만들고 variant_name에 입력해주면된다
  https://imagedelivery.net/F970tsu1DA6roLNnxFl6kw/<image_id>/<variant_name>

- custom variant setting up ref:
  https://dash.cloudflare.com/6ff51fffdc451e53748cb3ae81b128f0/images/variants
