/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSnippet = /* GraphQL */ `subscription OnCreateSnippet(
  $createdBy: String
  $filter: ModelSubscriptionSnippetFilterInput
) {
  onCreateSnippet(createdBy: $createdBy, filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSnippetSubscriptionVariables,
  APITypes.OnCreateSnippetSubscription
>;
export const onDeleteSnippet = /* GraphQL */ `subscription OnDeleteSnippet(
  $createdBy: String
  $filter: ModelSubscriptionSnippetFilterInput
) {
  onDeleteSnippet(createdBy: $createdBy, filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSnippetSubscriptionVariables,
  APITypes.OnDeleteSnippetSubscription
>;
export const onUpdateSnippet = /* GraphQL */ `subscription OnUpdateSnippet(
  $createdBy: String
  $filter: ModelSubscriptionSnippetFilterInput
) {
  onUpdateSnippet(createdBy: $createdBy, filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSnippetSubscriptionVariables,
  APITypes.OnUpdateSnippetSubscription
>;
