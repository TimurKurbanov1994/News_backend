## Стек:
DB: MySQL и S3
Framework: NestJS 
ORM: TypeORM

## Описание

Реализован CRUD для сущностей User, Tags  и FeedBack.
1) Пароли не хранятся в открытом виде
2) Реализована валидация полей на api запросы с кодами ответов и сообщениями об ошибке в теле ответа.
3) JWT bearer token
4) Модуль AWS для взаимодействия с сервером JS
5) Использованы DTO


### **News:**

| field         | type        |
| ------------- |:-----------:|
| id            | uuid        |
| title         | string(100) |
| status        | string(100) | 
| text          | string(30)  |
| link          | string(30)  |
| date          | datetime    |


### **User:**

| field         | type        |
| ------------- |:-----------:|
| id            | uuid        |
| email         | string(100) |
| password      | string(100) | 
| name          | string(30)  |

### **Feedback:**

| field         | type        |
| ------------- |:-----------:|
| id            | uuid        |
| email         | string(100) |
| text          | string(100) | 


## Список API endpoint

- POST /sign-up

```json
{
  "email": "example@exe.com",
  "password": "example",
  "nickname": "nickname"
}
```
RETURN:

```json
{ 
  "id": 1
  "email": "example@exe.com",
  "password": "123e4567-e89b-12d3-a456-426614174000",
  "nickname": "nickname"
}
```

---
- POST /login

```json
{
  "email": "example@exe.com",
  "password": "example"
}
```

RETURN:
```json
{
  "id": 1
  "email": "example@exe.com",
  "password": "123e4567-e89b-12d3-a456-426614174000",
  "nickname": "nickname"
}
```
---
- GET /users

  HEADER: ```Authorization: Bearer {token}```

RETURN:
```json
[
 {
  "id": 1
  "email": "example@exe.com",
  "password": "123e4567-e89b-12d3-a456-426614174000",
  "nickname": "nickname"
},
{
  "id": 2
  "email": "example@exe.com",
  "password": "123e4567-e89b-12d3-a456-426614174000",
  "nickname": "nickname"
  }
 ] 
```

---
- PATCH /reset
  
  HEADER: ```Authorization: Bearer {token}```

```json
{
  "email": "example@exe.com",
  "password": "example"
}
```
RETURN :

```json
{
  "id": 2
  "email": "example@exe.com",
  "password": "123e4567-e89b-12d3-a456-426614174000",
  "nickname": "nickname"
}
```
---
- POST /news
  

```json
{
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
}
```
```file
file: png/jpeg/jpg
```

RETURN :

```json
{ 
  "id": 1
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
}
```

---
- GET /get


RETURN :
```json
[
 {
   "id": 1,
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
},
{
  "id": 2,
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
}
]
```
---
- PUT /update

```json
{
  "id": 1,
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
}
```
```file
file: png/jpeg/jpg
```

RETURN :

```json
{
  "id": 1,
  "title": "example",
  "description": "example",
  "status": "Publish",
  "text": "text text"
}
```
```file
file: png/jpeg/jpg
```

---

- DELETE /tag/{id}

RETURN :

```json
{
  "post": "Deleted",
}
```
```file
file: png/jpeg/jpg
```

---

---
- POST /user/tag

  HEADER: ```Authorization: Bearer {token}```

```json
{
  "tags": [1, 2]
}
```
