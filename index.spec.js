const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");

const server = require("./server");

const runQuery = async (query, expected) => {
  const { mutate } = createTestClient(server);
  return await mutate({ mutation: query });
};

test("nullable - without errors", async () => {
  const { data, errors } = await runQuery(gql`
    mutation {
      mutation1: nullable(throwError: false) {
        title
      }
      mutation2: nullable(throwError: false) {
        title
      }
    }
  `);

  expect(data).toEqual({
    mutation1: { title: "A book" },
    mutation2: { title: "A book" },
  });
  expect(errors).toBe(undefined);
});

test("nullable - with errors", async () => {
  const { data, errors } = await runQuery(gql`
    mutation {
      mutation1: nullable(throwError: false) {
        title
      }
      mutation2: nullable(throwError: true) {
        title
      }
    }
  `);

  expect(data).toEqual({
    mutation1: { title: "A book" },
    mutation2: null,
  });
  expect(errors).toMatchObject([{ message: "Error!!!" }]);
});

test("non-nullable - without errors", async () => {
  const { data, errors } = await runQuery(gql`
    mutation {
      mutation1: nonNullable(throwError: false) {
        title
      }
      mutation2: nonNullable(throwError: false) {
        title
      }
    }
  `);

  expect(data).toEqual({
    mutation1: { title: "A book" },
    mutation2: { title: "A book" },
  });
  expect(errors).toBe(undefined);
});

test("non-nullable - with errors", async () => {
  const { data, errors } = await runQuery(gql`
    mutation {
      mutation1: nonNullable(throwError: false) {
        title
      }
      mutation2: nonNullable(throwError: true) {
        title
      }
    }
  `);

  expect(data).toEqual({
    mutation1: { title: "A book" },
    mutation2: null,
  });
  expect(errors).toMatchObject([{ message: "Error!!!" }]);
});
