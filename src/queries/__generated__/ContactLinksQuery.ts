/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactLinksQuery
// ====================================================

export interface ContactLinksQuery_contactLinksCollection_items {
  __typename: "ContactLinks";
  title: string | null;
  link: string | null;
  icon: string | null;
}

export interface ContactLinksQuery_contactLinksCollection {
  __typename: "ContactLinksCollection";
  items: (ContactLinksQuery_contactLinksCollection_items | null)[];
}

export interface ContactLinksQuery {
  contactLinksCollection: ContactLinksQuery_contactLinksCollection | null;
}
