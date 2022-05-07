import { gql, useQuery } from "@apollo/client";
import { ProjectQuery, ProjectQueryVariables, ProjectQuery_project } from "./__generated__/ProjectQuery";

const PROJECT_QUERY = gql`

query ProjectQuery($id: String!)
{
  project(id: $id)
  {
    title
    description
    content
    {
      json
    }
    sys
    {
        id
    }
  }
}

`;

export function useProject(id: string): ProjectQuery_project | undefined
{
    const { data, loading, error } = 
        useQuery<ProjectQuery, ProjectQueryVariables>(PROJECT_QUERY, { variables: { id } });

    return data?.project!;
}