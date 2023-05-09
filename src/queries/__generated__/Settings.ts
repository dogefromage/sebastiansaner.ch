/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Settings
// ====================================================

export interface Settings_settings_home {
  __typename: "SettingsHome";
  json: any;
}

export interface Settings_settings_imprint {
  __typename: "SettingsImprint";
  json: any;
}

export interface Settings_settings {
  __typename: "Settings";
  home: Settings_settings_home | null;
  imprint: Settings_settings_imprint | null;
}

export interface Settings {
  settings: Settings_settings | null;
}

export interface SettingsVariables {
  settingsId: string;
}
