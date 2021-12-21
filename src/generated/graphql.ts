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
  DateTime: any;
  Time: any;
  Upload: any;
};

export type Audio = Node & {
  __typename?: 'Audio';
  id: Scalars['ID'];
  name: Scalars['String'];
  length: Scalars['Float'];
  likeCount: Scalars['Int'];
  playCount: Scalars['Int'];
  commentCount: Scalars['Int'];
  url: Scalars['String'];
  mimetype: Scalars['String'];
  publishedAt: Scalars['Time'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  transcribed: Scalars['Boolean'];
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

export type AudioFilter = {
  played?: Maybe<Scalars['Boolean']>;
  stared?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['Boolean']>;
};

export enum AudioOrder {
  PublishedAtAsc = 'PUBLISHED_AT_ASC',
  PublishedAtDesc = 'PUBLISHED_AT_DESC'
}

export type AudiosInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Comment = Node & {
  __typename?: 'Comment';
  id: Scalars['ID'];
  user: User;
  body: Scalars['String'];
  audio: Audio;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CommentEdge>>;
};

export type CommentEdge = Edge & {
  __typename?: 'CommentEdge';
  cursor: Scalars['Cursor'];
  node: Comment;
};

export type CommentOrder = {
  field?: Maybe<CommentOrderField>;
  direction?: Maybe<SortDirection>;
};

export enum CommentOrderField {
  Id = 'ID'
}

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Maybe<Edge>>;
};

export type CreateAudioInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  mimetype: Scalars['String'];
  length: Scalars['Float'];
};

export type CreateCommentInput = {
  audioID: Scalars['ID'];
  body: Scalars['String'];
};

export type CreateFeedInput = {
  audioID: Scalars['ID'];
};

export type CreateTranscriptInput = {
  audioID: Scalars['ID'];
};

export type CreateUserInput = {
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  photoURL: Scalars['String'];
};



export type DeleteCommentResult = {
  __typename?: 'DeleteCommentResult';
  success: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type DeleteFeedResult = {
  __typename?: 'DeleteFeedResult';
  success: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type Edge = {
  cursor: Scalars['Cursor'];
  node: Node;
};

export type Feed = Node & {
  __typename?: 'Feed';
  id: Scalars['ID'];
  audio: Audio;
  user: User;
  publishedAt: Scalars['Time'];
  played: Scalars['Boolean'];
  liked: Scalars['Boolean'];
  stared: Scalars['Boolean'];
  startTime?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type FeedConnection = Connection & {
  __typename?: 'FeedConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<FeedEdge>>;
};

export type FeedEdge = Edge & {
  __typename?: 'FeedEdge';
  cursor: Scalars['Cursor'];
  node: Feed;
};

export enum FeedEvent {
  Played = 'PLAYED',
  Unplayed = 'UNPLAYED',
  Stared = 'STARED',
  Unstared = 'UNSTARED',
  Liked = 'LIKED',
  Unliked = 'UNLIKED',
  All = 'ALL'
}

export type FeedFilter = {
  state?: Maybe<FeedEvent>;
};

export type File = {
  __typename?: 'File';
  id: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Monologue = {
  __typename?: 'Monologue';
  elements?: Maybe<Array<Maybe<MonologueElement>>>;
};

export type MonologueElement = {
  __typename?: 'MonologueElement';
  confidence: Scalars['String'];
  word: Scalars['String'];
  wordKana: Scalars['String'];
  startTime: Scalars['Float'];
  endTime: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createAudio: Audio;
  uploadAudio: Audio;
  createComment: Comment;
  updateComment: Comment;
  deleteComment: DeleteCommentResult;
  createFeed: Feed;
  updateFeed: Feed;
  deleteFeed: DeleteFeedResult;
  createTranscript: Transcript;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateAudioArgs = {
  input?: Maybe<CreateAudioInput>;
};


export type MutationUploadAudioArgs = {
  input?: Maybe<UploadAudioInput>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationCreateFeedArgs = {
  input: CreateFeedInput;
};


export type MutationUpdateFeedArgs = {
  input: UpdateFeedInput;
};


export type MutationDeleteFeedArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTranscriptArgs = {
  input: CreateTranscriptInput;
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
  version: Version;
  comments: CommentConnection;
  audio?: Maybe<Audio>;
  audios: AudioConnection;
  feeds: FeedConnection;
};


export type QueryCommentsArgs = {
  audioID: Scalars['ID'];
  cursor?: Maybe<Scalars['Cursor']>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<Scalars['String']>>;
};


export type QueryAudioArgs = {
  id: Scalars['ID'];
};


export type QueryAudiosArgs = {
  cursor?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<AudioFilter>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<AudioOrder>;
};


export type QueryFeedsArgs = {
  cursor?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<FeedEvent>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<AudioOrder>;
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

export enum State {
  Played = 'PLAYED',
  Unplayed = 'UNPLAYED'
}


export type Transcript = {
  __typename?: 'Transcript';
  id: Scalars['ID'];
  body: Scalars['String'];
  audio: Audio;
  monologues?: Maybe<Array<Maybe<Monologue>>>;
};

export type UpdateCommentInput = {
  id: Scalars['ID'];
};

export type UpdateFeedInput = {
  id: Scalars['ID'];
  event: FeedEvent;
};


export type UploadAudioFileInput = {
  file: Scalars['Upload'];
};

export type UploadAudioInput = {
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type UploadFileInput = {
  id: Scalars['Int'];
  file: Scalars['Upload'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  photoURL: Scalars['String'];
};

export type Version = {
  __typename?: 'Version';
  hash: Scalars['String'];
  version: Scalars['String'];
  buildTime: Scalars['String'];
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

export type GetAudioFragment = (
  { __typename?: 'Query' }
  & { audio?: Maybe<(
    { __typename?: 'Audio' }
    & AudioFragment
  )> }
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
  & Pick<Audio, 'id' | 'name' | 'length' | 'url' | 'playCount' | 'likeCount' | 'commentCount' | 'publishedAt' | 'transcribed'>
);

export type AudiosQueryVariables = Exact<{
  cursor: Scalars['Cursor'];
  filter?: Maybe<AudioFilter>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<AudioOrder>;
}>;


export type AudiosQuery = (
  { __typename?: 'Query' }
  & AudiosFragment
);

export type GetAudioQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAudioQuery = (
  { __typename?: 'Query' }
  & GetAudioFragment
);

export type UploadAudioFragment = (
  { __typename?: 'Mutation' }
  & { uploadAudio: (
    { __typename?: 'Audio' }
    & AudioFragment
  ) }
);

export type CreateAudioMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  mimetype: Scalars['String'];
  length: Scalars['Float'];
}>;


export type CreateAudioMutation = (
  { __typename?: 'Mutation' }
  & { createAudio: (
    { __typename?: 'Audio' }
    & AudioFragment
  ) }
);

export type UploadAudioMutationVariables = Exact<{
  file: Scalars['Upload'];
  description: Scalars['String'];
}>;


export type UploadAudioMutation = (
  { __typename?: 'Mutation' }
  & UploadAudioFragment
);

export type CreateTranscriptMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CreateTranscriptMutation = (
  { __typename?: 'Mutation' }
  & { createTranscript: (
    { __typename?: 'Transcript' }
    & Pick<Transcript, 'id'>
  ) }
);

export type CommentsFragment = (
  { __typename?: 'Query' }
  & { comments: (
    { __typename?: 'CommentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<Maybe<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & CommentFragment
      ) }
      & CommentEdgesFragment
    )>> }
  ) }
);

export type CommentEdgesFragment = (
  { __typename?: 'CommentEdge' }
  & { node: (
    { __typename?: 'Comment' }
    & CommentFragment
  ) }
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'body' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'User' }
    & UserFragment
  ), audio: (
    { __typename?: 'Audio' }
    & Pick<Audio, 'id'>
  ) }
);

export type CreateCommentFragment = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & CommentFragment
  ) }
);

export type CommentsQueryVariables = Exact<{
  audioID: Scalars['ID'];
  cursor: Scalars['Cursor'];
  limit?: Maybe<Scalars['Int']>;
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & CommentsFragment
);

export type CreateCommentMutationVariables = Exact<{
  audioID: Scalars['ID'];
  body: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & CreateCommentFragment
);

export type FeedsFragment = (
  { __typename?: 'Query' }
  & { feeds: (
    { __typename?: 'FeedConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<Maybe<(
      { __typename?: 'FeedEdge' }
      & { node: (
        { __typename?: 'Feed' }
        & FeedFragment
      ) }
      & FeedEdgesFragment
    )>> }
  ) }
);

export type FeedEdgesFragment = (
  { __typename?: 'FeedEdge' }
  & { node: (
    { __typename?: 'Feed' }
    & FeedFragment
  ) }
);

export type FeedFragment = (
  { __typename?: 'Feed' }
  & Pick<Feed, 'id' | 'played' | 'liked' | 'stared' | 'publishedAt'>
  & { audio: (
    { __typename?: 'Audio' }
    & AudioFragment
  ) }
);

export type UpdateFeedFragment = (
  { __typename?: 'Mutation' }
  & { updateFeed: (
    { __typename?: 'Feed' }
    & FeedFragment
  ) }
);

export type UpdateFeedMutationVariables = Exact<{
  id: Scalars['ID'];
  event: FeedEvent;
}>;


export type UpdateFeedMutation = (
  { __typename?: 'Mutation' }
  & UpdateFeedFragment
);

export type FeedsQueryVariables = Exact<{
  cursor: Scalars['Cursor'];
  filter?: Maybe<FeedEvent>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<AudioOrder>;
}>;


export type FeedsQuery = (
  { __typename?: 'Query' }
  & FeedsFragment
);

export type PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'hasMore' | 'cursor'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'photoURL'>
);

export type CreateUserFragment = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type CreateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  photoURL: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & CreateUserFragment
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
  playCount
  likeCount
  commentCount
  publishedAt
  transcribed
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
  audios(cursor: $cursor, filter: $filter, limit: $limit, order: $order) {
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
export const GetAudioFragmentDoc = gql`
    fragment GetAudio on Query {
  audio(id: $id) {
    ...Audio
  }
}
    ${AudioFragmentDoc}`;
export const UploadAudioFragmentDoc = gql`
    fragment UploadAudio on Mutation {
  uploadAudio(input: {file: $file, description: $description}) {
    ...Audio
  }
}
    ${AudioFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
  photoURL
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  user {
    ...User
  }
  body
  audio {
    id
  }
  createdAt
  updatedAt
}
    ${UserFragmentDoc}`;
export const CommentEdgesFragmentDoc = gql`
    fragment CommentEdges on CommentEdge {
  node {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export const CommentsFragmentDoc = gql`
    fragment Comments on Query {
  comments(audioID: $audioID, cursor: $cursor, limit: $limit) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...Comment
      }
      ...CommentEdges
    }
  }
}
    ${PageInfoFragmentDoc}
${CommentFragmentDoc}
${CommentEdgesFragmentDoc}`;
export const CreateCommentFragmentDoc = gql`
    fragment CreateComment on Mutation {
  createComment(input: {audioID: $audioID, body: $body}) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export const FeedFragmentDoc = gql`
    fragment Feed on Feed {
  id
  played
  liked
  stared
  publishedAt
  audio {
    ...Audio
  }
}
    ${AudioFragmentDoc}`;
export const FeedEdgesFragmentDoc = gql`
    fragment FeedEdges on FeedEdge {
  node {
    ...Feed
  }
}
    ${FeedFragmentDoc}`;
export const FeedsFragmentDoc = gql`
    fragment Feeds on Query {
  feeds(cursor: $cursor, filter: $filter, limit: $limit, order: $order) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...Feed
      }
      ...FeedEdges
    }
  }
}
    ${PageInfoFragmentDoc}
${FeedFragmentDoc}
${FeedEdgesFragmentDoc}`;
export const UpdateFeedFragmentDoc = gql`
    fragment UpdateFeed on Mutation {
  updateFeed(input: {id: $id, event: $event}) {
    ...Feed
  }
}
    ${FeedFragmentDoc}`;
export const CreateUserFragmentDoc = gql`
    fragment CreateUser on Mutation {
  createUser(input: {id: $id, email: $email, name: $name, photoURL: $photoURL}) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const AudiosDocument = gql`
    query Audios($cursor: Cursor!, $filter: AudioFilter, $limit: Int, $order: AudioOrder) {
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
 *      filter: // value for 'filter'
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
export const GetAudioDocument = gql`
    query GetAudio($id: ID!) {
  ...GetAudio
}
    ${GetAudioFragmentDoc}`;

/**
 * __useGetAudioQuery__
 *
 * To run a query within a React component, call `useGetAudioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAudioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAudioQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAudioQuery(baseOptions: Apollo.QueryHookOptions<GetAudioQuery, GetAudioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAudioQuery, GetAudioQueryVariables>(GetAudioDocument, options);
      }
export function useGetAudioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAudioQuery, GetAudioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAudioQuery, GetAudioQueryVariables>(GetAudioDocument, options);
        }
export type GetAudioQueryHookResult = ReturnType<typeof useGetAudioQuery>;
export type GetAudioLazyQueryHookResult = ReturnType<typeof useGetAudioLazyQuery>;
export type GetAudioQueryResult = Apollo.QueryResult<GetAudioQuery, GetAudioQueryVariables>;
export const CreateAudioDocument = gql`
    mutation CreateAudio($id: ID!, $name: String!, $url: String!, $mimetype: String!, $length: Float!) {
  createAudio(
    input: {id: $id, name: $name, url: $url, mimetype: $mimetype, length: $length}
  ) {
    ...Audio
  }
}
    ${AudioFragmentDoc}`;
export type CreateAudioMutationFn = Apollo.MutationFunction<CreateAudioMutation, CreateAudioMutationVariables>;

/**
 * __useCreateAudioMutation__
 *
 * To run a mutation, you first call `useCreateAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAudioMutation, { data, loading, error }] = useCreateAudioMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      mimetype: // value for 'mimetype'
 *      length: // value for 'length'
 *   },
 * });
 */
export function useCreateAudioMutation(baseOptions?: Apollo.MutationHookOptions<CreateAudioMutation, CreateAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAudioMutation, CreateAudioMutationVariables>(CreateAudioDocument, options);
      }
export type CreateAudioMutationHookResult = ReturnType<typeof useCreateAudioMutation>;
export type CreateAudioMutationResult = Apollo.MutationResult<CreateAudioMutation>;
export type CreateAudioMutationOptions = Apollo.BaseMutationOptions<CreateAudioMutation, CreateAudioMutationVariables>;
export const UploadAudioDocument = gql`
    mutation UploadAudio($file: Upload!, $description: String!) {
  ...UploadAudio
}
    ${UploadAudioFragmentDoc}`;
export type UploadAudioMutationFn = Apollo.MutationFunction<UploadAudioMutation, UploadAudioMutationVariables>;

/**
 * __useUploadAudioMutation__
 *
 * To run a mutation, you first call `useUploadAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAudioMutation, { data, loading, error }] = useUploadAudioMutation({
 *   variables: {
 *      file: // value for 'file'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUploadAudioMutation(baseOptions?: Apollo.MutationHookOptions<UploadAudioMutation, UploadAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAudioMutation, UploadAudioMutationVariables>(UploadAudioDocument, options);
      }
export type UploadAudioMutationHookResult = ReturnType<typeof useUploadAudioMutation>;
export type UploadAudioMutationResult = Apollo.MutationResult<UploadAudioMutation>;
export type UploadAudioMutationOptions = Apollo.BaseMutationOptions<UploadAudioMutation, UploadAudioMutationVariables>;
export const CreateTranscriptDocument = gql`
    mutation CreateTranscript($id: ID!) {
  createTranscript(input: {audioID: $id}) {
    id
  }
}
    `;
export type CreateTranscriptMutationFn = Apollo.MutationFunction<CreateTranscriptMutation, CreateTranscriptMutationVariables>;

/**
 * __useCreateTranscriptMutation__
 *
 * To run a mutation, you first call `useCreateTranscriptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTranscriptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTranscriptMutation, { data, loading, error }] = useCreateTranscriptMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateTranscriptMutation(baseOptions?: Apollo.MutationHookOptions<CreateTranscriptMutation, CreateTranscriptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTranscriptMutation, CreateTranscriptMutationVariables>(CreateTranscriptDocument, options);
      }
export type CreateTranscriptMutationHookResult = ReturnType<typeof useCreateTranscriptMutation>;
export type CreateTranscriptMutationResult = Apollo.MutationResult<CreateTranscriptMutation>;
export type CreateTranscriptMutationOptions = Apollo.BaseMutationOptions<CreateTranscriptMutation, CreateTranscriptMutationVariables>;
export const CommentsDocument = gql`
    query Comments($audioID: ID!, $cursor: Cursor!, $limit: Int) {
  ...Comments
}
    ${CommentsFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      audioID: // value for 'audioID'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($audioID: ID!, $body: String!) {
  ...CreateComment
}
    ${CreateCommentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateFeedDocument = gql`
    mutation UpdateFeed($id: ID!, $event: FeedEvent!) {
  ...UpdateFeed
}
    ${UpdateFeedFragmentDoc}`;
export type UpdateFeedMutationFn = Apollo.MutationFunction<UpdateFeedMutation, UpdateFeedMutationVariables>;

/**
 * __useUpdateFeedMutation__
 *
 * To run a mutation, you first call `useUpdateFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedMutation, { data, loading, error }] = useUpdateFeedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useUpdateFeedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedMutation, UpdateFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedMutation, UpdateFeedMutationVariables>(UpdateFeedDocument, options);
      }
export type UpdateFeedMutationHookResult = ReturnType<typeof useUpdateFeedMutation>;
export type UpdateFeedMutationResult = Apollo.MutationResult<UpdateFeedMutation>;
export type UpdateFeedMutationOptions = Apollo.BaseMutationOptions<UpdateFeedMutation, UpdateFeedMutationVariables>;
export const FeedsDocument = gql`
    query Feeds($cursor: Cursor!, $filter: FeedEvent, $limit: Int, $order: AudioOrder) {
  ...Feeds
}
    ${FeedsFragmentDoc}`;

/**
 * __useFeedsQuery__
 *
 * To run a query within a React component, call `useFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useFeedsQuery(baseOptions: Apollo.QueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
      }
export function useFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
        }
export type FeedsQueryHookResult = ReturnType<typeof useFeedsQuery>;
export type FeedsLazyQueryHookResult = ReturnType<typeof useFeedsLazyQuery>;
export type FeedsQueryResult = Apollo.QueryResult<FeedsQuery, FeedsQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($id: ID!, $email: String!, $name: String!, $photoURL: String!) {
  ...CreateUser
}
    ${CreateUserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      photoURL: // value for 'photoURL'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;