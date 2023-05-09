import { gql, useQuery } from "@apollo/client";
import { SettingsQuery, SettingsQueryVariables } from "./__generated__/SettingsQuery";

const SETTINGS_QUERY = gql`
query SettingsQuery($settingsId: String!) {
  settings(id: $settingsId) {
    home {
      json
    }
    imprint {
      json
    }
  }
}
`;

const SETTINGS_SINGLETON = "2ISXn50zX7TdzKbxu7s3JO";

export function useSettings() {
    const { data, loading, error } =
        useQuery<SettingsQuery, SettingsQueryVariables>(SETTINGS_QUERY, { variables: { settingsId: SETTINGS_SINGLETON } });

    return {
        settings: data?.settings,
        loading,
    }
}