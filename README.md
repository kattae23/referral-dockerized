

## Description

ReferralApp Referral App full stack with docker

## Running the app

```bash
# development
$ docker-compose up -d --build
or
$ docker compose up -d --build
```

## Installation for development locally

### Backend
```bash
$ cd ./referral-be
$ pnpm install

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
### Frontend
```bash
$ cd ./referral-fe
$ pnpm install

# watch mode
$ ng serve

# production build
$ ng build
```

# API Endpoints Description:

## Register a New User: ✅
```
Method: POST
Route: /api/users/register
Parameters:
username
password
email
date_of_birth / optional
how_did_you_hear
referrer_username / optional
(if how_did_you_hear is "I was Referred by another user", include referrer_username)
```

## Get User Details: ✅
```
Method: GET
Route: /api/users/{userId}
Parameters:
userId
```


## Get List of Referees for a User: ✅
```
Method: GET
Route: /api/users/{userId}/referrals
Parameters:
userId
```


## Register a Referral: ❌ `discarded`
```
Method: POST
Route: /api/referrals
Parameters:
referrer_id
referee_id
```

## Get User Points: ✅
```
Method: GET
Route: /api/users/{userId}/points
Parameters:
userId
```