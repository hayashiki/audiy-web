import React, { FunctionComponent } from 'react'
import { AudioFragment } from '@/generated/graphql'
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { AudioDetail } from '@/components/Audio/AudioDetail/AudioDetail'

export type AudioListProps = {
  audios: AudioFragment[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1236,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 2),
    },
  },
  fullWidth: {
    maxWidth: '100%',
  },
  disablePadding: {
    padding: 0,
  },
  narrow: {
    maxWidth: 800,
  },
}))

export const AudioList: FunctionComponent<AudioListProps> = ({ audios }) => {
  const classes = useStyles()

  const sortedData = audios.sort((a: AudioFragment, b: AudioFragment) =>
    a.publishedAt > b.publishedAt ? 1 : -1,
  )
  return (
    <div>
      <section className={classes.root}>
        <TableContainer>
          <Table aria-label="task list">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>state</b>
                </TableCell>
                <TableCell>
                  <b>title</b>
                </TableCell>
                <TableCell>
                  <b>published</b>
                </TableCell>
                <TableCell>
                  <b>stats</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <AudioDetail row={row} selectedId={'1'} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {sortedData.map((audio, index) => audio.name)}
      </section>
    </div>
  )
}
