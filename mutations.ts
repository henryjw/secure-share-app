/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createSnippet = /* GraphQL */ `mutation CreateSnippet(
  $condition: ModelSnippetConditionInput
  $input: CreateSnippetInput!
) {
  createSnippet(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSnippetMutationVariables,
  APITypes.CreateSnippetMutation
>;
export const deleteSnippet = /* GraphQL */ `mutation DeleteSnippet(
  $condition: ModelSnippetConditionInput
  $input: DeleteSnippetInput!
) {
  deleteSnippet(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSnippetMutationVariables,
  APITypes.DeleteSnippetMutation
>;
export const updateSnippet = /* GraphQL */ `mutation UpdateSnippet(
  $condition: ModelSnippetConditionInput
  $input: UpdateSnippetInput!
) {
  updateSnippet(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSnippetMutationVariables,
  APITypes.UpdateSnippetMutation
>;
