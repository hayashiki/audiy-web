import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Cursor: any
  Time: any
}

export type Audio = Node & {
  __typename?: 'Audio'
  id: Scalars['ID']
  name: Scalars['String']
  length: Scalars['Int']
  likeCount: Scalars['Int']
  playCount: Scalars['Int']
  commentCount: Scalars['Int']
  url: Scalars['String']
  mimetype: Scalars['String']
  played: Scalars['Boolean']
  liked: Scalars['Boolean']
  stared: Scalars['Boolean']
  publishedAt: Scalars['Time']
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export type AudioConnection = Connection & {
  __typename?: 'AudioConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<AudioEdge>>
}

export type AudioEdge = Edge & {
  __typename?: 'AudioEdge'
  cursor: Scalars['Cursor']
  node: Audio
}

export type AudioFilter = {
  played?: Maybe<Scalars['Boolean']>
  stared?: Maybe<Scalars['Boolean']>
  liked?: Maybe<Scalars['Boolean']>
}

export enum AudioOrder {
  PublishedAtAsc = 'PUBLISHED_AT_ASC',
  PublishedAtDesc = 'PUBLISHED_AT_DESC',
}

export type AudiosInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type Comment = Node & {
  __typename?: 'Comment'
  id: Scalars['ID']
  user: User
  body: Scalars['String']
  audio: Audio
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<CommentEdge>>
}

export type CommentEdge = Edge & {
  __typename?: 'CommentEdge'
  cursor: Scalars['Cursor']
  node: Comment
}

export type CommentOrder = {
  field?: Maybe<CommentOrderField>
  direction?: Maybe<SortDirection>
}

export enum CommentOrderField {
  Id = 'ID',
}

export type Connection = {
  pageInfo: PageInfo
  edges: Array<Maybe<Edge>>
}

export type CreateCommentInput = {
  audioID: Scalars['ID']
  body: Scalars['String']
}

export type CreateFeedInput = {
  audioID: Scalars['ID']
}

export type CreatePlayPayload = {
  __typename?: 'CreatePlayPayload'
  result: Scalars['Boolean']
  play: Play
}

export type CreateUserInput = {
  id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
}

export type DeleteCommentResult = {
  __typename?: 'DeleteCommentResult'
  success: Scalars['Boolean']
  id: Scalars['ID']
}

export type DeleteFeedResult = {
  __typename?: 'DeleteFeedResult'
  success: Scalars['Boolean']
  id: Scalars['ID']
}

export type DeleteLikeInput = {
  id: Scalars['ID']
}

export type DeleteStarInput = {
  id: Scalars['ID']
}

export type Edge = {
  cursor: Scalars['Cursor']
  node: Node
}

export type Feed = Node & {
  __typename?: 'Feed'
  id: Scalars['ID']
  audio: Audio
  user: User
  publishedAt: Scalars['Time']
  played: Scalars['Boolean']
  liked: Scalars['Boolean']
  stared: Scalars['Boolean']
  startTime?: Maybe<Scalars['Float']>
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export type FeedConnection = Connection & {
  __typename?: 'FeedConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<FeedEdge>>
}

export type FeedEdge = Edge & {
  __typename?: 'FeedEdge'
  cursor: Scalars['Cursor']
  node: Feed
}

export enum FeedEvent {
  Played = 'PLAYED',
  Unplayed = 'UNPLAYED',
  Stared = 'STARED',
  Unstared = 'UNSTARED',
  Liked = 'LIKED',
  Unliked = 'UNLIKED',
}

export type FeedFilter = {
  state?: Maybe<FeedEvent>
}

export type Like = Node & {
  __typename?: 'Like'
  id: Scalars['ID']
  user: User
  audio: Audio
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  createAudio?: Maybe<Audio>
  createPlay?: Maybe<Play>
  createComment: Comment
  updateComment: Comment
  deleteComment: DeleteCommentResult
  createFeed: Feed
  updateFeed: Feed
  deleteFeed: DeleteFeedResult
  createLike?: Maybe<Like>
  deleteLike?: Maybe<Like>
  createStar?: Maybe<Star>
  deleteStar?: Maybe<Star>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationCreateAudioArgs = {
  input: AudiosInput
}

export type MutationCreatePlayArgs = {
  input: UpdateAudioInput
}

export type MutationCreateCommentArgs = {
  input: CreateCommentInput
}

export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
}

export type MutationCreateFeedArgs = {
  input: CreateFeedInput
}

export type MutationUpdateFeedArgs = {
  input: UpdateFeedInput
}

export type MutationDeleteFeedArgs = {
  id: Scalars['ID']
}

export type MutationCreateLikeArgs = {
  input: UpdateAudioInput
}

export type MutationDeleteLikeArgs = {
  input: UpdateAudioInput
}

export type MutationCreateStarArgs = {
  input: UpdateAudioInput
}

export type MutationDeleteStarArgs = {
  input: UpdateAudioInput
}

export type Node = {
  id: Scalars['ID']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  cursor: Scalars['String']
  totalPage: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export type Play = Node & {
  __typename?: 'Play'
  id: Scalars['ID']
  user: User
  audio: Audio
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export type Query = {
  __typename?: 'Query'
  version: Version
  comments: CommentConnection
  audio?: Maybe<Audio>
  audios: AudioConnection
  feeds: FeedConnection
}

export type QueryCommentsArgs = {
  audioID: Scalars['ID']
  cursor?: Maybe<Scalars['Cursor']>
  limit?: Maybe<Scalars['Int']>
  order?: Maybe<Array<Scalars['String']>>
}

export type QueryAudioArgs = {
  id: Scalars['ID']
}

export type QueryAudiosArgs = {
  cursor?: Maybe<Scalars['Cursor']>
  filter?: Maybe<AudioFilter>
  limit?: Maybe<Scalars['Int']>
  order?: Maybe<AudioOrder>
}

export type QueryFeedsArgs = {
  cursor?: Maybe<Scalars['Cursor']>
  filter?: Maybe<FeedEvent>
  limit?: Maybe<Scalars['Int']>
  order?: Maybe<AudioOrder>
}

export type QuerySpec = {
  order?: Maybe<Array<AudioOrder>>
  cursor: Scalars['Cursor']
  limit?: Maybe<Scalars['Int']>
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Star = Node & {
  __typename?: 'Star'
  id: Scalars['ID']
  user: User
  audio: Audio
  createdAt: Scalars['Time']
  updatedAt: Scalars['Time']
}

export enum State {
  Played = 'Played',
  Unplayed = 'Unplayed',
}

export type UpdateAudioInput = {
  audioID: Scalars['ID']
}

export type UpdateCommentInput = {
  id: Scalars['ID']
}

export type UpdateFeedInput = {
  id: Scalars['ID']
  event: FeedEvent
}

export type User = Node & {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
  photoURL: Scalars['String']
}

export type Version = {
  __typename?: 'Version'
  hash: Scalars['String']
  version: Scalars['String']
}

export type AudiosFragment = { __typename?: 'Query' } & {
  audios: { __typename?: 'AudioConnection' } & {
    pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment
    edges: Array<
      Maybe<
        { __typename?: 'AudioEdge' } & {
          node: { __typename?: 'Audio' } & AudioFragment
        } & AudioEdgesFragment
      >
    >
  }
}

export type AudioEdgesFragment = { __typename?: 'AudioEdge' } & {
  node: { __typename?: 'Audio' } & AudioFragment
}

export type AudioFragment = { __typename?: 'Audio' } & Pick<
  Audio,
  'id' | 'name' | 'length' | 'url' | 'playCount' | 'likeCount' | 'commentCount' | 'publishedAt'
>

export type AudiosQueryVariables = Exact<{
  cursor: Scalars['Cursor']
  filter?: Maybe<AudioFilter>
  limit?: Maybe<Scalars['Int']>
  order?: Maybe<AudioOrder>
}>

export type AudiosQuery = { __typename?: 'Query' } & AudiosFragment

export type CommentsFragment = { __typename?: 'Query' } & {
  comments: { __typename?: 'CommentConnection' } & {
    pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment
    edges: Array<
      Maybe<
        { __typename?: 'CommentEdge' } & {
          node: { __typename?: 'Comment' } & CommentFragment
        } & CommentEdgesFragment
      >
    >
  }
}

export type CommentEdgesFragment = { __typename?: 'CommentEdge' } & {
  node: { __typename?: 'Comment' } & CommentFragment
}

export type CommentFragment = { __typename?: 'Comment' } & Pick<
  Comment,
  'id' | 'body' | 'createdAt' | 'updatedAt'
> & {
    user: { __typename?: 'User' } & UserFragment
    audio: { __typename?: 'Audio' } & Pick<Audio, 'id'>
  }

export type CreateCommentFragment = { __typename?: 'Mutation' } & {
  createComment: { __typename?: 'Comment' } & CommentFragment
}

export type CommentsQueryVariables = Exact<{
  audioID: Scalars['ID']
  cursor: Scalars['Cursor']
  limit?: Maybe<Scalars['Int']>
}>

export type CommentsQuery = { __typename?: 'Query' } & CommentsFragment

export type CreateCommentMutationVariables = Exact<{
  audioID: Scalars['ID']
  body: Scalars['String']
}>

export type CreateCommentMutation = { __typename?: 'Mutation' } & CreateCommentFragment

export type FeedsFragment = { __typename?: 'Query' } & {
  feeds: { __typename?: 'FeedConnection' } & {
    pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment
    edges: Array<
      Maybe<
        { __typename?: 'FeedEdge' } & {
          node: { __typename?: 'Feed' } & FeedFragment
        } & FeedEdgesFragment
      >
    >
  }
}

export type FeedEdgesFragment = { __typename?: 'FeedEdge' } & {
  node: { __typename?: 'Feed' } & FeedFragment
}

export type FeedFragment = { __typename?: 'Feed' } & Pick<
  Feed,
  'id' | 'played' | 'liked' | 'stared' | 'publishedAt'
> & { audio: { __typename?: 'Audio' } & AudioFragment }

export type UpdateFeedFragment = { __typename?: 'Mutation' } & {
  updateFeed: { __typename?: 'Feed' } & FeedFragment
}

export type UpdateFeedMutationVariables = Exact<{
  id: Scalars['ID']
  event: FeedEvent
}>

export type UpdateFeedMutation = { __typename?: 'Mutation' } & UpdateFeedFragment

export type FeedsQueryVariables = Exact<{
  cursor: Scalars['Cursor']
  filter?: Maybe<FeedEvent>
  limit?: Maybe<Scalars['Int']>
  order?: Maybe<AudioOrder>
}>

export type FeedsQuery = { __typename?: 'Query' } & FeedsFragment

export type LikeFragment = { __typename?: 'Like' } & Pick<
  Like,
  'id' | 'createdAt' | 'updatedAt'
> & {
    user: { __typename?: 'User' } & UserFragment
    audio: { __typename?: 'Audio' } & AudioFragment
  }

export type CreateLikeFragment = { __typename?: 'Mutation' } & {
  createLike?: Maybe<{ __typename?: 'Like' } & LikeFragment>
}

export type DeleteLikeFragment = { __typename?: 'Mutation' } & {
  deleteLike?: Maybe<{ __typename?: 'Like' } & LikeFragment>
}

export type CreateLikeMutationVariables = Exact<{
  audioID: Scalars['ID']
}>

export type CreateLikeMutation = { __typename?: 'Mutation' } & CreateLikeFragment

export type DeleteLikeMutationVariables = Exact<{
  audioID: Scalars['ID']
}>

export type DeleteLikeMutation = { __typename?: 'Mutation' } & DeleteLikeFragment

export type PageInfoFragment = { __typename?: 'PageInfo' } & Pick<PageInfo, 'hasMore' | 'cursor'>

export type PlayFragment = { __typename?: 'Play' } & Pick<
  Play,
  'id' | 'createdAt' | 'updatedAt'
> & {
    user: { __typename?: 'User' } & UserFragment
    audio: { __typename?: 'Audio' } & AudioFragment
  }

export type CreatePlayFragment = { __typename?: 'Mutation' } & {
  createPlay?: Maybe<{ __typename?: 'Play' } & PlayFragment>
}

export type CreatePlayMutationVariables = Exact<{
  audioID: Scalars['ID']
}>

export type CreatePlayMutation = { __typename?: 'Mutation' } & CreatePlayFragment

export type StarFragment = { __typename?: 'Star' } & Pick<
  Star,
  'id' | 'createdAt' | 'updatedAt'
> & {
    user: { __typename?: 'User' } & UserFragment
    audio: { __typename?: 'Audio' } & AudioFragment
  }

export type CreateStarFragment = { __typename?: 'Mutation' } & {
  createStar?: Maybe<{ __typename?: 'Star' } & StarFragment>
}

export type DeleteStarFragment = { __typename?: 'Mutation' } & {
  deleteStar?: Maybe<{ __typename?: 'Star' } & StarFragment>
}

export type CreateStarMutationVariables = Exact<{
  audioID: Scalars['ID']
}>

export type CreateStarMutation = { __typename?: 'Mutation' } & CreateStarFragment

export type DeleteStarMutationVariables = Exact<{
  audioID: Scalars['ID']
}>

export type DeleteStarMutation = { __typename?: 'Mutation' } & DeleteStarFragment

export type UserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'email' | 'photoURL'
>

export type CreateUserFragment = { __typename?: 'Mutation' } & {
  createUser?: Maybe<{ __typename?: 'User' } & UserFragment>
}

export type CreateUserMutationVariables = Exact<{
  id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['String']
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & CreateUserFragment

export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    hasMore
    cursor
  }
`
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
    likeCount
  }
`
export const AudioEdgesFragmentDoc = gql`
  fragment AudioEdges on AudioEdge {
    node {
      ...Audio
    }
  }
  ${AudioFragmentDoc}
`
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
  ${AudioEdgesFragmentDoc}
`
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    email
    photoURL
  }
`
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
  ${UserFragmentDoc}
`
export const CommentEdgesFragmentDoc = gql`
  fragment CommentEdges on CommentEdge {
    node {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`
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
  ${CommentEdgesFragmentDoc}
`
export const CreateCommentFragmentDoc = gql`
  fragment CreateComment on Mutation {
    createComment(input: { audioID: $audioID, body: $body }) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`
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
  ${AudioFragmentDoc}
`
export const FeedEdgesFragmentDoc = gql`
  fragment FeedEdges on FeedEdge {
    node {
      ...Feed
    }
  }
  ${FeedFragmentDoc}
`
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
  ${FeedEdgesFragmentDoc}
`
export const UpdateFeedFragmentDoc = gql`
  fragment UpdateFeed on Mutation {
    updateFeed(input: { id: $id, event: $event }) {
      ...Feed
    }
  }
  ${FeedFragmentDoc}
`
export const LikeFragmentDoc = gql`
  fragment Like on Like {
    id
    user {
      ...User
    }
    audio {
      ...Audio
    }
    createdAt
    updatedAt
  }
  ${UserFragmentDoc}
  ${AudioFragmentDoc}
`
export const CreateLikeFragmentDoc = gql`
  fragment CreateLike on Mutation {
    createLike(input: { audioID: $audioID }) {
      ...Like
    }
  }
  ${LikeFragmentDoc}
`
export const DeleteLikeFragmentDoc = gql`
  fragment DeleteLike on Mutation {
    deleteLike(input: { audioID: $audioID }) {
      ...Like
    }
  }
  ${LikeFragmentDoc}
`
export const PlayFragmentDoc = gql`
  fragment Play on Play {
    id
    user {
      ...User
    }
    audio {
      ...Audio
    }
    createdAt
    updatedAt
  }
  ${UserFragmentDoc}
  ${AudioFragmentDoc}
`
export const CreatePlayFragmentDoc = gql`
  fragment CreatePlay on Mutation {
    createPlay(input: { audioID: $audioID }) {
      ...Play
    }
  }
  ${PlayFragmentDoc}
`
export const StarFragmentDoc = gql`
  fragment Star on Star {
    id
    user {
      ...User
    }
    audio {
      ...Audio
    }
    createdAt
    updatedAt
  }
  ${UserFragmentDoc}
  ${AudioFragmentDoc}
`
export const CreateStarFragmentDoc = gql`
  fragment CreateStar on Mutation {
    createStar(input: { audioID: $audioID }) {
      ...Star
    }
  }
  ${StarFragmentDoc}
`
export const DeleteStarFragmentDoc = gql`
  fragment DeleteStar on Mutation {
    deleteStar(input: { audioID: $audioID }) {
      ...Star
    }
  }
  ${StarFragmentDoc}
`
export const CreateUserFragmentDoc = gql`
  fragment CreateUser on Mutation {
    createUser(input: { id: $id, name: $name, email: $email }) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export const AudiosDocument = gql`
  query Audios($cursor: Cursor!, $filter: AudioFilter, $limit: Int, $order: AudioOrder) {
    ...Audios
  }
  ${AudiosFragmentDoc}
`

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
export function useAudiosQuery(
  baseOptions: Apollo.QueryHookOptions<AudiosQuery, AudiosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AudiosQuery, AudiosQueryVariables>(AudiosDocument, options)
}
export function useAudiosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AudiosQuery, AudiosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AudiosQuery, AudiosQueryVariables>(AudiosDocument, options)
}
export type AudiosQueryHookResult = ReturnType<typeof useAudiosQuery>
export type AudiosLazyQueryHookResult = ReturnType<typeof useAudiosLazyQuery>
export type AudiosQueryResult = Apollo.QueryResult<AudiosQuery, AudiosQueryVariables>
export const CommentsDocument = gql`
  query Comments($audioID: ID!, $cursor: Cursor!, $limit: Int) {
    ...Comments
  }
  ${CommentsFragmentDoc}
`

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
export function useCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>
export const CreateCommentDocument = gql`
  mutation CreateComment($audioID: ID!, $body: String!) {
    ...CreateComment
  }
  ${CreateCommentFragmentDoc}
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

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
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const UpdateFeedDocument = gql`
  mutation UpdateFeed($id: ID!, $event: FeedEvent!) {
    ...UpdateFeed
  }
  ${UpdateFeedFragmentDoc}
`
export type UpdateFeedMutationFn = Apollo.MutationFunction<
  UpdateFeedMutation,
  UpdateFeedMutationVariables
>

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
export function useUpdateFeedMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateFeedMutation, UpdateFeedMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateFeedMutation, UpdateFeedMutationVariables>(
    UpdateFeedDocument,
    options,
  )
}
export type UpdateFeedMutationHookResult = ReturnType<typeof useUpdateFeedMutation>
export type UpdateFeedMutationResult = Apollo.MutationResult<UpdateFeedMutation>
export type UpdateFeedMutationOptions = Apollo.BaseMutationOptions<
  UpdateFeedMutation,
  UpdateFeedMutationVariables
>
export const FeedsDocument = gql`
  query Feeds($cursor: Cursor!, $filter: FeedEvent, $limit: Int, $order: AudioOrder) {
    ...Feeds
  }
  ${FeedsFragmentDoc}
`

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
export function useFeedsQuery(
  baseOptions: Apollo.QueryHookOptions<FeedsQuery, FeedsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options)
}
export function useFeedsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedsQuery, FeedsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options)
}
export type FeedsQueryHookResult = ReturnType<typeof useFeedsQuery>
export type FeedsLazyQueryHookResult = ReturnType<typeof useFeedsLazyQuery>
export type FeedsQueryResult = Apollo.QueryResult<FeedsQuery, FeedsQueryVariables>
export const CreateLikeDocument = gql`
  mutation CreateLike($audioID: ID!) {
    ...CreateLike
  }
  ${CreateLikeFragmentDoc}
`
export type CreateLikeMutationFn = Apollo.MutationFunction<
  CreateLikeMutation,
  CreateLikeMutationVariables
>

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *   },
 * });
 */
export function useCreateLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(
    CreateLikeDocument,
    options,
  )
}
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<
  CreateLikeMutation,
  CreateLikeMutationVariables
>
export const DeleteLikeDocument = gql`
  mutation DeleteLike($audioID: ID!) {
    ...DeleteLike
  }
  ${DeleteLikeFragmentDoc}
`
export type DeleteLikeMutationFn = Apollo.MutationFunction<
  DeleteLikeMutation,
  DeleteLikeMutationVariables
>

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *   },
 * });
 */
export function useDeleteLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(
    DeleteLikeDocument,
    options,
  )
}
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<
  DeleteLikeMutation,
  DeleteLikeMutationVariables
>
export const CreatePlayDocument = gql`
  mutation CreatePlay($audioID: ID!) {
    ...CreatePlay
  }
  ${CreatePlayFragmentDoc}
`
export type CreatePlayMutationFn = Apollo.MutationFunction<
  CreatePlayMutation,
  CreatePlayMutationVariables
>

/**
 * __useCreatePlayMutation__
 *
 * To run a mutation, you first call `useCreatePlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayMutation, { data, loading, error }] = useCreatePlayMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *   },
 * });
 */
export function useCreatePlayMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePlayMutation, CreatePlayMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePlayMutation, CreatePlayMutationVariables>(
    CreatePlayDocument,
    options,
  )
}
export type CreatePlayMutationHookResult = ReturnType<typeof useCreatePlayMutation>
export type CreatePlayMutationResult = Apollo.MutationResult<CreatePlayMutation>
export type CreatePlayMutationOptions = Apollo.BaseMutationOptions<
  CreatePlayMutation,
  CreatePlayMutationVariables
>
export const CreateStarDocument = gql`
  mutation CreateStar($audioID: ID!) {
    ...CreateStar
  }
  ${CreateStarFragmentDoc}
`
export type CreateStarMutationFn = Apollo.MutationFunction<
  CreateStarMutation,
  CreateStarMutationVariables
>

/**
 * __useCreateStarMutation__
 *
 * To run a mutation, you first call `useCreateStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStarMutation, { data, loading, error }] = useCreateStarMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *   },
 * });
 */
export function useCreateStarMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateStarMutation, CreateStarMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateStarMutation, CreateStarMutationVariables>(
    CreateStarDocument,
    options,
  )
}
export type CreateStarMutationHookResult = ReturnType<typeof useCreateStarMutation>
export type CreateStarMutationResult = Apollo.MutationResult<CreateStarMutation>
export type CreateStarMutationOptions = Apollo.BaseMutationOptions<
  CreateStarMutation,
  CreateStarMutationVariables
>
export const DeleteStarDocument = gql`
  mutation DeleteStar($audioID: ID!) {
    ...DeleteStar
  }
  ${DeleteStarFragmentDoc}
`
export type DeleteStarMutationFn = Apollo.MutationFunction<
  DeleteStarMutation,
  DeleteStarMutationVariables
>

/**
 * __useDeleteStarMutation__
 *
 * To run a mutation, you first call `useDeleteStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStarMutation, { data, loading, error }] = useDeleteStarMutation({
 *   variables: {
 *      audioID: // value for 'audioID'
 *   },
 * });
 */
export function useDeleteStarMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteStarMutation, DeleteStarMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteStarMutation, DeleteStarMutationVariables>(
    DeleteStarDocument,
    options,
  )
}
export type DeleteStarMutationHookResult = ReturnType<typeof useDeleteStarMutation>
export type DeleteStarMutationResult = Apollo.MutationResult<DeleteStarMutation>
export type DeleteStarMutationOptions = Apollo.BaseMutationOptions<
  DeleteStarMutation,
  DeleteStarMutationVariables
>
export const CreateUserDocument = gql`
  mutation CreateUser($id: ID!, $name: String!, $email: String!) {
    ...CreateUser
  }
  ${CreateUserFragmentDoc}
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

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
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
