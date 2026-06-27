## Create Book

curl --location 'http://localhost:3000/books' \
--header 'Content-Type: application/json' \
--data '{
  "title":"Harry Potter Series",
  "author":"  J.K. Rowling",
  "isbn": "9780135166671",
  "quantity":10
}'


## Get All Books

curl http://localhost:3000/books

## Get Book By Id

curl http://localhost:3000/books/1

## Update Book

curl -X POST http://localhost:3000/books/1 \
-H "Content-Type: application/json" \
-d '{
  "quantity": 20
}'

## Delete Book

curl -X DELETE http://localhost:3000/books/4


