import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Time: any;
};

export type Audio = Node & {
  __typename?: 'Audio';
  id: Scalars['ID'];
  name: Scalars['String'];
  length: Scalars['Int'];
  likeCount: Scalars['Int'];
  playCount: Scalars['Int'];
  url: Scalars['String'];
  minetype: Scalars['String'];
  publishedAt: Scalars['Time'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type AudioConnection = Connection & {
  __typename?: 'AudioConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<AudioEdge>>;
};

export type AudioEdge = Edge & {
  __typename?: 'AudioEdge';
  cursor: Scalars['Cursor'];
  node: Audio;
};

export type AudioOrder = {
  field?: Maybe<AudioOrderField>;
  direction?: Maybe<SortDirection>;
};

export enum AudioOrderField {
  Id = 'ID',
  Name = 'NAME',
  PublishedAt = 'PUBLISHED_AT',
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type AudiosInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Maybe<Edge>>;
};


export type Edge = {
  cursor: Scalars['Cursor'];
  node: Node;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAudio?: Maybe<Audio>;
};


export type MutationCreateAudioArgs = {
  input: AudiosInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['String'];
  totalPage: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  audio?: Maybe<Audio>;
  audios: AudioConnection;
  version: Version;
};


export type QueryAudioArgs = {
  id: Scalars['ID'];
};


export type QueryAudiosArgs = {
  cursor?: Maybe<Scalars['Cursor']>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<Scalars['String']>>;
};

export type QuerySpec = {
  order?: Maybe<Array<AudioOrder>>;
  cursor: Scalars['Cursor'];
  limit?: Maybe<Scalars['Int']>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}


export type Version = {
  __typename?: 'Version';
  hash: Scalars['String'];
  version: Scalars['String'];
};

export type AudiosFragment = (
  { __typename?: 'Query' }
  & { audios: (
    { __typename?: 'AudioConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<Maybe<(
      { __typename?: 'AudioEdge' }
      & { node: (
        { __typename?: 'Audio' }
        & AudioFragment
      ) }
      & AudioEdgesFragment
    )>> }
  ) }
);

export type AudioEdgesFragment = (
  { __typename?: 'AudioEdge' }
  & { node: (
    { __typename?: 'Audio' }
    & AudioFragment
  ) }
);

export type AudioFragment = (
  { __typename?: 'Audio' }
  & Pick<Audio, 'id' | 'name' | 'length' | 'url' | 'publishedAt' | 'likeCount'>
);

export type AudiosQueryVariables = Exact<{
  cursor: Scalars['Cursor'];
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type AudiosQuery = (
  { __typename?: 'Query' }
  & AudiosFragment
);

export type PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'hasMore' | 'cursor'>
);

export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasMore
  cursor
}
    `;
export const AudioFragmentDoc = gql`
    fragment Audio on Audio {
  id
  name
  length
  url
  publishedAt
  likeCount
}
    `;
export const AudioEdgesFragmentDoc = gql`
    fragment AudioEdges on AudioEdge {
  node {
    ...Audio
  }
}
    ${AudioFragmentDoc}`;
export const AudiosFragmentDoc = gql`
    fragment Audios on Query {
  audios(cursor: $cursor, limit: $limit, order: $order) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...Audio
      }
      ...AudioEdges
    }
  }
}
    ${PageInfoFragmentDoc}
${AudioFragmentDoc}
${AudioEdgesFragmentDoc}`;
export const AudiosDocument = gql`
    query Audios($cursor: Cursor!, $limit: Int, $order: [String!]) {
  ...Audios
}
    ${AudiosFragmentDoc}`;

/**
 * __useAudiosQuery__
 *
 * To run a query within a React component, call `useAudiosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAudiosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAudiosQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useAudiosQuery(baseOptions: Apollo.QueryHookOptions<AudiosQuery, AudiosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AudiosQuery, AudiosQueryVariables>(AudiosDocument, options);
      }
export function useAudiosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AudiosQuery, AudiosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AudiosQuery, AudiosQueryVariables>(AudiosDocument, options);
        }
export type AudiosQueryHookResult = ReturnType<typeof useAudiosQuery>;
export type AudiosLazyQueryHookResult = ReturnType<typeof useAudiosLazyQuery>;
export type AudiosQueryResult = Apollo.QueryResult<AudiosQuery, AudiosQueryVariables>;