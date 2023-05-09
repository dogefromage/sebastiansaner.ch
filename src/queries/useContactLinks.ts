import { useCallback, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ProjectListQuery, ProjectListQueryVariables } from "./__generated__/ProjectListQuery";
import { ContactLinksQuery } from "./__generated__/ContactLinksQuery";

const CONTACT_LINKS_QUERY = gql`
query ContactLinksQuery {
  contactLinksCollection {
    items {
      title
      link
      icon
    }
  }
}
`;

export function useContactLinks() {
    const res = useQuery<ContactLinksQuery>(CONTACT_LINKS_QUERY);
    const { data, loading, error, fetchMore } = res;

    return {
        contactLinks: data?.contactLinksCollection?.items,
        loading,
    }
}