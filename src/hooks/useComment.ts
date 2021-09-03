import {
  AudioEdgesFragment,
  AudioFragment,
  AudioOrder,
  AudiosDocument,
  AudiosQuery,
  CommentEdgesFragment,
  CommentFragment,
  CommentsDocument,
  CommentsQuery,
  CommentsQueryVariables,
  CreateCommentInput,
  useCommentsQuery,
  useCreateCommentMutation,
} from '@/generated/graphql'
import { FetchMore } from '@/hooks/useAudioQuery'

export const useCommentsQueryHook = (audio: AudioFragment) => {
  const { data, loading, error } = useCommentsQuery({
    variables: {
      cursor: '',
      limit: 100,
      audioID: audio.id,
    },
  })

  let comments: CommentFragment[] = []
  if (data) {
    comments = data.comments.edges.map((edge) => edge!.node)
  }

  return {
    comments,
  }
}

export const useCommentMutationHook = () => {
  const [createCommentFn] = useCreateCommentMutation()

  const createComment = (values: CreateCommentInput) => {
    return createCommentFn({
      variables: values,
      update: (cache, newComment) => {
        if (newComment.data) {
          const variables = {
            cursor: '',
            limit: 100,
            audioID: newComment.data!.createComment.audio.id,
          }

          const cacheResult = cache.readQuery<CommentsQuery, CommentsQueryVariables>({
            query: CommentsDocument,
            variables,
          })

          const newEdge = {
            __typename: 'CommentEdge',
            node: {
              ...newComment.data!.createComment,
            },
          } as CommentEdgesFragment

          const data = {
            comments: {
              ...cacheResult?.comments,
              edges: [...cacheResult!.comments.edges, newEdge],
            },
          } as CommentsQuery

          console.log('cacheResult3', data)

          cache.writeQuery({
            query: CommentsDocument,
            variables: variables,
            data: data,
          })
        }
      },
    })
  }
  return { createComment }
}
