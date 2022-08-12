## nodejs-graphql ##

# Run
```sh
node index.js
```

# Curl Example

```sh
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"query GetProductByIdQuery {\n  product(id: \"1\") {\n    title\n    description\n    anotherId\n    barcode\n    id\n    url\n    prices {\n      id\n      value\n    }\n  }\n}"}'
```

# Get By Grapql Url
http://localhost:4000/

```sh
query GetProductByIdQuery {
  product(id: "1") {
    title
    description
    anotherId
    barcode
    id
    url
    prices {
      id
      value
    }
  }
}
```
