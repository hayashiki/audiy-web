import { MockedProvider } from '@apollo/client/testing'
import { render, cleanup, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { AudioOrder, AudiosDocument, useAudiosQuery } from '@/generated/graphql'
import { useMoreAudio } from '@/hooks/useAudioQuery'

describe('useQuery Hook', () => {
  const AUDIOS_RESULT_DATA = {
    data: {
      audios: {
        pageInfo: {
          hasMore: true,
          cursor:
            'CksKGQoMcHVibGlzaGVkX2F0EgkIwNvhmKn28AISKmoPc35hdmVsYWRpby1wcm9kchcLEgZSYWRpb3MiC0YwMjNFSjU1UjJBDBgAIAE',
          __typename: 'PageInfo',
        },
        edges: [
          {
            node: {
              id: 'dummy2',
              name: 'dummy2',
              length: 100,
              url: 'url',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-07-21T04:32:58Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'dummy1',
              name: 'dummy1',
              length: 100,
              url: 'url',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-07-21T04:32:58Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F024RM86X1A',
              name: 'サンプルオーディオ第89回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F024RM86X1A.m4a?authuser=1',
              played: true,
              liked: true,
              stared: true,
              publishedAt: '2021-06-09T21:23:40Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F024MAJ1804',
              name: 'サンプルオーディオ第88回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F024MAJ1804.m4a?authuser=1',
              played: true,
              liked: true,
              stared: true,
              publishedAt: '2021-06-09T00:30:27Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F02474Q1DFF',
              name: 'サンプルオーディオ第87回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F02474Q1DFF.m4a?authuser=1',
              played: true,
              liked: false,
              stared: false,
              publishedAt: '2021-06-07T23:35:08Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F024JB7BLTB',
              name: 'サンプルオーディオ第86回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F024JB7BLTB.m4a?authuser=1',
              played: true,
              liked: false,
              stared: false,
              publishedAt: '2021-06-07T00:11:36Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F0245UN1N4C',
              name: 'サンプルオーディオ第85回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F0245UN1N4C.m4a?authuser=1',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-06-04T01:22:03Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F0241TFGT0C',
              name: 'サンプルオーディオ第84回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F0241TFGT0C.m4a?authuser=0',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-06-03T06:05:32Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F023Y8N1A76',
              name: 'サンプルオーディオ第83回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F023Y8N1A76.m4a?authuser=0',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-06-02T11:48:05Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
          {
            node: {
              id: 'F023EJ55R2A',
              name: 'サンプルオーディオ第82回.m4a',
              length: 100,
              url: 'https://storage.cloud.google.com/aveladio-audio-input/F023EJ55R2A.m4a?authuser=1',
              played: false,
              liked: false,
              stared: false,
              publishedAt: '2021-06-01T11:23:43Z',
              likeCount: 0,
              __typename: 'Audio',
            },
            __typename: 'AudioEdge',
          },
        ],
        __typename: 'AudioConnection',
      },
      __typename: 'Query',
    },
  }

  const AUDIOS_MOCKS = [
    {
      request: {
        query: AudiosDocument,
        variables: { cursor: '', order: AudioOrder.PublishedAtDesc },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
      },
      result: AUDIOS_RESULT_DATA,
    },
  ]

  afterEach(cleanup)

  it('should keep data as undefined until data is actually returned', async () => {
    expect(1).toEqual(1)

    const Component = () => {
      const { data, loading } = useAudiosQuery({
        variables: { cursor: '' },
      })
      console.log(data, loading)
      if (!loading) {
        expect(data).toEqual(AUDIOS_RESULT_DATA)
      }
      return null
    }

    console.log(100)
    render(
      <MockedProvider mocks={AUDIOS_MOCKS}>
        <Component />
      </MockedProvider>,
    )
  })

  it('should renderHook', async () => {
    const wrapper = ({ children }: { children: any }) => (
      <MockedProvider mocks={AUDIOS_MOCKS}>{children}</MockedProvider>
    )

    const { result, waitForNextUpdate } = renderHook(
      () => useMoreAudio(AudioOrder.PublishedAtDesc),
      { wrapper },
    )

    await waitForNextUpdate()
    // Test the initial state of the request
    // expect(result.current.loading).toBeTruthy()
    // expect(result.current.error).toBeUndefined()
    expect(result.current.audios).toBeUndefined()
  })
})
