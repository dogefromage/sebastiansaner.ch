import { gql, useQuery } from "@apollo/client";
import { ProjectQuery, ProjectQueryVariables, ProjectQuery_project } from "./__generated__/ProjectQuery";

const PROJECT_QUERY = gql`

query SettingsQuery
{
  project(id: $id)
  {
    title
    description
    content
    {
      json
    }
    mainImage
    {
      url
      width
      height
    }
    sys
    {
        id
    }
  }
}

`;

export function useProject(id: string) {
    const { data, loading, error } =
        useQuery<ProjectQuery, ProjectQueryVariables>(PROJECT_QUERY, { variables: { id } });

    return {
        project: data?.project,
        loading,
    }
}