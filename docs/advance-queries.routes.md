

## Include (JOIN)

Returns borrow records with related student and book.

```bash
curl http://localhost:3000/advanced/include
```

---

## Select

Returns only selected columns from the Book table.

```bash
curl http://localhost:3000/advanced/select
```

---

## Include + Select

Returns borrow records with selected fields from related tables.

```bash
curl http://localhost:3000/advanced/include-select
```

---

## Advanced Queries

Runs the following Prisma query examples:

* Comparison (`gte`)
* `contains`
* `startsWith`
* `endsWith`
* `OR`
* `orderBy`
* `take` (LIMIT)
* `skip` (OFFSET)
* Pagination

```bash
curl http://localhost:3000/advanced/queries
```
