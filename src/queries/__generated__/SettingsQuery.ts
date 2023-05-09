/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SettingsQuery
// ====================================================

export interface SettingsQuery_settings_home {
  __typename: "SettingsHome";
  json: any;
}

export interface SettingsQuery_settings_imprint {
  __typename: "SettingsImprint";
  json: any;
}

export interface SettingsQuery_settings {
  __typename: "Settings";
  home: SettingsQuery_settings_home | null;
  imprint: SettingsQuery_settings_imprint | null;
}

export interface SettingsQuery {
  settings: SettingsQuery_settings | null;
}

export interface SettingsQueryVariables {
  settingsId: string;
}
