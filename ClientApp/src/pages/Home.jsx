import React from 'react'
import { StickyTable, Row, Cell } from 'react-sticky-table'

import fakeData from '../data/fake.json'

export function Home() {
  return (
    <div>
      <div style={{ width: '100%', height: '400px' }}>
        <StickyTable>
          <Row>
            <Cell>Player</Cell>
            {[...new Array(fakeData.rounds)].map((_, i) => {
              return <Cell>round {fakeData.rounds - i}</Cell>
            })}
          </Row>
          {fakeData.players.map(player => (
            <Row>
              <Cell>
                <div className="player-name"> {player.name}</div>
                <div className="player-score"> {player.score}</div>
              </Cell>
              {player.scores.map(score => {
                return <Cell>{score}</Cell>
              })}
            </Row>
          ))}
        </StickyTable>
      </div>
    </div>
  )
}
