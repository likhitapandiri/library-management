# Borrow Records API

## Create Borrow Record

```bash
curl -X POST http://localhost:3000/records \
-H "Content-Type: application/json" \
-d '{
  "studentId": 1,
  "bookId": 1
}'
```

## Get All Records

```bash
curl http://localhost:3000/records
```

## Get Record By ID

```bash
curl http://localhost:3000/records/1
```

## Get Record With Related Student And Book

```bash
curl http://localhost:3000/records/include/1
```

## Return Book

```bash
curl -X POST http://localhost:3000/records/1
```

## Sample Response

```json
{
  "id": 1,
  "studentId": 1,
  "bookId": 1,
  "borrowDate": "2026-08-08T10:00:00.000Z",
  "returnDate": null,
  "student": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "book": {
    "id": 1,
    "title": "Java Fundamentals",
    "author": "James Gosling"
  }
}
```
