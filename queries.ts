/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSnippet = /* GraphQL */ `query GetSnippet($id: ID!) {
  getSnippet(id: $id) {
    burnOnRead
    content
    createdAt
    createdBy
    expiration
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSnippetQueryVariables,
  APITypes.GetSnippetQuery
>;
export const listSnippets = /* GraphQL */ `query ListSnippets(
  $filter: ModelSnippetFilterInput
  $limit: Int
  $nextToken: String
) {
  listSnippets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      burnOnRead
      content
      createdAt
      createdBy
      expiration
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSnippetsQueryVariables,
  APITypes.ListSnippetsQuery
>;
