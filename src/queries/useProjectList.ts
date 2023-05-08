import { useCallback, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ProjectListQuery, ProjectListQueryVariables } from "./__generated__/ProjectListQuery";

const PROJECT_LIST_QUERY = gql`

query ProjectListQuery($limit: Int, $skip: Int)
{
  projectCollection(limit: $limit, skip: $skip)
  {
    items
    {
      title
      description
      thumbnail
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
}
`;

const LIMIT = 10;

export function useProjectList() {
    const res = useQuery<ProjectListQuery, ProjectListQueryVariables>(PROJECT_LIST_QUERY);
    const { data, loading, error, fetchMore } = res;

    const more = useCallback(() => {
        // fetchMore()
    }, [fetchMore]);

    return {
        projects: data?.projectCollection?.items,
        more,
    }
}