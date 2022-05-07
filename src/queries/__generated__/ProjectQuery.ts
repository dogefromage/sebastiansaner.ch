/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectQuery
// ====================================================

export interface ProjectQuery_project_content {
  __typename: "ProjectContent";
  json: any;
}

export interface ProjectQuery_project_sys {
  __typename: "Sys";
  id: string;
}

export interface ProjectQuery_project {
  __typename: "Project";
  title: string | null;
  description: string | null;
  content: ProjectQuery_project_content | null;
  sys: ProjectQuery_project_sys;
}

export interface ProjectQuery {
  project: ProjectQuery_project | null;
}

export interface ProjectQueryVariables {
  id?: string | null;
}
