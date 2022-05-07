/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectListQuery
// ====================================================

export interface ProjectListQuery_projectCollection_items_thumbnail {
  __typename: "Asset";
  url: string | null;
  width: number | null;
  height: number | null;
}

export interface ProjectListQuery_projectCollection_items_sys {
  __typename: "Sys";
  id: string;
}

export interface ProjectListQuery_projectCollection_items {
  __typename: "Project";
  title: string | null;
  description: string | null;
  thumbnail: ProjectListQuery_projectCollection_items_thumbnail | null;
  sys: ProjectListQuery_projectCollection_items_sys;
}

export interface ProjectListQuery_projectCollection {
  __typename: "ProjectCollection";
  items: (ProjectListQuery_projectCollection_items | null)[];
}

export interface ProjectListQuery {
  projectCollection: ProjectListQuery_projectCollection | null;
}

export interface ProjectListQueryVariables {
  limit?: number | null;
  skip?: number | null;
}
