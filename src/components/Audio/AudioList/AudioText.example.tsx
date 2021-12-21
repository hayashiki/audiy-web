import { AudioFragment, AudiosFragment } from '@/generated/graphql'

export const mockAudioListData: AudioFragment[] = [
  {
    id: '1',
    name: 'audio 1',
    length: 100,
    url: 'https://ice2.somafm.com/thetrip-128-mp3',
    publishedAt: 'hoge',
    likeCount: 100,
    playCount: 10,
    commentCount: 1,
    transcribed: true,
  },
  {
    id: '2',
    name: 'audio 2',
    length: 100,
    url: 'https://ice2.somafm.com/thetrip-128-mp3',
    publishedAt: 'hoge',
    likeCount: 100,
    playCount: 10,
    commentCount: 1,
    transcribed: true,
  },
  {
    id: '3',
    name: 'audio 3',
    length: 100,
    url: 'https://ice2.somafm.com/thetrip-128-mp3',
    publishedAt: 'hoge',
    likeCount: 100,
    playCount: 10,
    commentCount: 1,
    transcribed: false,
  },
]

export const mockAudioData: AudioFragment = {
  id: '1',
  name: 'audio 1',
  length: 100,
  url: 'https://ice2.somafm.com/thetrip-128-mp3',
  publishedAt: 'hoge',
  likeCount: 100,
  playCount: 10,
  commentCount: 1,
  transcribed: false,
}
