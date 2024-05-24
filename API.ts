/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Snippet = {
  __typename: "Snippet",
  burnOnRead?: boolean | null,
  content?: string | null,
  createdAt: string,
  createdBy?: string | null,
  expiration?: number | null,
  id: string,
  updatedAt: string,
};

export type ModelSnippetFilterInput = {
  and?: Array< ModelSnippetFilterInput | null > | null,
  burnOnRead?: ModelBooleanInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  expiration?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelSnippetFilterInput | null,
  or?: Array< ModelSnippetFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSnippetConnection = {
  __typename: "ModelSnippetConnection",
  items:  Array<Snippet | null >,
  nextToken?: string | null,
};

export type ModelSnippetConditionInput = {
  and?: Array< ModelSnippetConditionInput | null > | null,
  burnOnRead?: ModelBooleanInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  expiration?: ModelIntInput | null,
  not?: ModelSnippetConditionInput | null,
  or?: Array< ModelSnippetConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSnippetInput = {
  burnOnRead?: boolean | null,
  content?: string | null,
  createdBy?: string | null,
  expiration?: number | null,
  id?: string | null,
};

export type DeleteSnippetInput = {
  id: string,
};

export type UpdateSnippetInput = {
  burnOnRead?: boolean | null,
  content?: string | null,
  createdBy?: string | null,
  expiration?: number | null,
  id: string,
};

export type ModelSubscriptionSnippetFilterInput = {
  and?: Array< ModelSubscriptionSnippetFilterInput | null > | null,
  burnOnRead?: ModelSubscriptionBooleanInput | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  createdBy?: ModelStringInput | null,
  expiration?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSnippetFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type GetSnippetQueryVariables = {
  id: string,
};

export type GetSnippetQuery = {
  getSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type ListSnippetsQueryVariables = {
  filter?: ModelSnippetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSnippetsQuery = {
  listSnippets?:  {
    __typename: "ModelSnippetConnection",
    items:  Array< {
      __typename: "Snippet",
      burnOnRead?: boolean | null,
      content?: string | null,
      createdAt: string,
      createdBy?: string | null,
      expiration?: number | null,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateSnippetMutationVariables = {
  condition?: ModelSnippetConditionInput | null,
  input: CreateSnippetInput,
};

export type CreateSnippetMutation = {
  createSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type DeleteSnippetMutationVariables = {
  condition?: ModelSnippetConditionInput | null,
  input: DeleteSnippetInput,
};

export type DeleteSnippetMutation = {
  deleteSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type UpdateSnippetMutationVariables = {
  condition?: ModelSnippetConditionInput | null,
  input: UpdateSnippetInput,
};

export type UpdateSnippetMutation = {
  updateSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSnippetSubscriptionVariables = {
  createdBy?: string | null,
  filter?: ModelSubscriptionSnippetFilterInput | null,
};

export type OnCreateSnippetSubscription = {
  onCreateSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSnippetSubscriptionVariables = {
  createdBy?: string | null,
  filter?: ModelSubscriptionSnippetFilterInput | null,
};

export type OnDeleteSnippetSubscription = {
  onDeleteSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSnippetSubscriptionVariables = {
  createdBy?: string | null,
  filter?: ModelSubscriptionSnippetFilterInput | null,
};

export type OnUpdateSnippetSubscription = {
  onUpdateSnippet?:  {
    __typename: "Snippet",
    burnOnRead?: boolean | null,
    content?: string | null,
    createdAt: string,
    createdBy?: string | null,
    expiration?: number | null,
    id: string,
    updatedAt: string,
  } | null,
};
