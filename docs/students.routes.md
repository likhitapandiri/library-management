# Students API

## Create Student

```bash
curl -X POST http://localhost:3000/students \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210"
}'
```

## Get All Students

```bash
curl http://localhost:3000/students
```

## Get Student By ID

```bash
curl http://localhost:3000/students/1
```

## Update Student

```bash
curl -X PATCH http://localhost:3000/students/1 \
-H "Content-Type: application/json" \
-d '{
  "phone": "9999999999"
}'
```

## Delete Student

```bash
curl -X DELETE http://localhost:3000/students/1
```

## Sample Student Object

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "createdAt": "2026-08-08T10:00:00.000Z"
}
```
