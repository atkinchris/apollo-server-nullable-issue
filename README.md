# Reproducible Example for Apollo Server nullable issue

When executing a query that includes multiple mutations, if these mutations have non-nullable payloads, any errors will return `null` for the whole `data` object. If the mutation payloads are nullable, `null` will be confined to the mutation that errored.

## As expected: Nullable Payload Behaviour

Given the example server and the following query

```gql
mutation {
  mutation1: nullable(throwError: false) {
    title
  }
  mutation2: nullable(throwError: true) {
    title
  }
}
```

The returned `data` is as expected:

```json
{
  "mutation1": { "title": "A book" },
  "mutation2": null
}
```

## Not as expected: Non-nullable Payload Behaviour

Given the example server and the following query

```gql
mutation {
  mutation1: nonNullable(throwError: false) {
    title
  }
  mutation2: nonNullable(throwError: true) {
    title
  }
}
```

I would expect the `data` to be:

```json
{
  "mutation1": { "title": "A book" },
  "mutation2": null
}
```

But instead the whole `data` response is `null`.

```json
null
```

## Running this example

```sh
git clone https://github.com/atkinchris/apollo-server-nullable-issue.git
cd apollo-server-nullable-issue
npm install
npm run test
```

Observe that the "non-nullable - with errors" test fails
