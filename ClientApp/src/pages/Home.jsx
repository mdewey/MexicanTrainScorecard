import React, { useState } from 'react'
import { StickyTable, Row, Cell } from 'react-sticky-table'

import { names } from '../data/names.json'

import { createPlayer } from '../utils/player.factory'

export function Home() {
  const [players, setPlayers] = useState([])
  const [newPlayer, setNewPlayer] = useState('')
  const [rounds, setRounds] = useState(12)

  const addPlayer = name => {
    name = name || names[Math.floor(Math.random() * names.length)]
    setPlayers(prev => {
      return [...prev, createPlayer(name)]
    })
  }

  const submitScore = (e, oldScore, index, i) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      updateScoreForPlayer(e.target.value || oldScore, index, i)
    }
  }

  const updateScoreForPlayer = (score, playerIndex, round) => {
    console.log({ score, playerIndex, round })
    setPlayers(prev => {
      const player = prev[playerIndex]
      player.scores[round] = { score: parseInt(score) }
      player.score = player.scores.reduce((a, i) => a + i.score, 0)
      console.log('updated', prev)
      return [...prev]
    })
  }

  const reEditScore = (playerIndex, round) => {
    console.log('double clicked', playerIndex, round)
    setPlayers(prev => {
      const player = prev[playerIndex]
      player.scores[round] = {
        ...player.scores[round],
        editing: !player.scores[round].editing,
      }
      return [...prev]
    })
  }

  return (
    <div>
      <section>
        <input
          type="text"
          onChange={e => setNewPlayer(e.target.value)}
          value={newPlayer}
        />
        <button onClick={() => addPlayer(newPlayer)}>add player</button>
      </section>
      <section>
        <input
          type="number"
          onChange={e => setRounds(parseInt(e.target.value))}
          value={rounds}
        />
      </section>
      <div style={{ width: '100%', height: '400px' }}>
        <StickyTable>
          <Row>
            <Cell>Player</Cell>
            {rounds &&
              [...new Array(rounds + 1)].map((_, i) => {
                return <Cell key={i}>{rounds - i}</Cell>
              })}
          </Row>
          {players.map((player, index) => (
            <Row key={index}>
              <Cell>
                <div className="player-name"> {player.name}</div>
                <div className="player-score"> {player.score}</div>
              </Cell>
              {[...new Array(rounds + 1)].map((_, i) => {
                return (
                  <Cell key={i}>
                    {player.scores &&
                    player.scores[i] &&
                    !player.scores[i].editing &&
                    (player.scores[i] || player.scores[i].score === 0) ? (
                      <p onDoubleClick={() => reEditScore(index, i)}>
                        {player.scores[i].score}
                      </p>
                    ) : (
                      <input
                        type="number"
                        placeholder={
                          player.scores[i] ? player.scores[i].score : ''
                        }
                        onKeyDown={e =>
                          submitScore(
                            e,
                            player.scores[i] ? player.scores[i].score : 0,
                            index,
                            i
                          )
                        }
                        onBlur={e =>
                          updateScoreForPlayer(e.target.value, index, i)
                        }
                      />
                    )}
                  </Cell>
                )
              })}
            </Row>
          ))}
        </StickyTable>
      </div>
    </div>
  )
}
