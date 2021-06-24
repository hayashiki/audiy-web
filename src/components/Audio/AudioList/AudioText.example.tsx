import { AudioFragment, AudiosFragment } from '@/generated/graphql'

export const mockAudioListData: AudioFragment[] = [
  {
    id: '1',
    name: 'audio 1',
    length: 100,
    url: 'hoge',
    publishedAt: 'hoge',
    likeCount: 100,
  },
  {
    id: '2',
    name: 'audio 2',
    length: 100,
    url: 'hoge',
    publishedAt: 'hoge',
    likeCount: 100,
  },
  {
    id: '3',
    name: 'audio 3',
    length: 100,
    url: 'hoge',
    publishedAt: 'hoge',
    likeCount: 100,
  },
]

export const mockAudioData: AudioFragment = {
  id: '1',
  name: 'audio 1',
  length: 100,
  url: 'hoge',
  publishedAt: 'hoge',
  likeCount: 100,
}
