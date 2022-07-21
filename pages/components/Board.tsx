import React, { useEffect, useState } from 'react'
import Square from './Square'


export type Player = 'X' | 'O' | 'Both' | null

const calculateWinner = (squares: Player[]) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {

        const [a, b, c] = lines[i]

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[b] === squares[c]
        ) {
            return squares[a]
        }
    }
}

const Board = () => {

    const [squares, setSquares] = useState(Array(9).fill(null))

    const [currentPlayer, setCurrentPlayer] = useState<Player>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    )

    const [winner, setWinner] = useState<Player>(null)

    const setSquareValue = (index: number) => {

        const newData = squares.map((value, i) => {
            if (i === index) {
                return currentPlayer
            }
            return value
        })

        setSquares(newData)
        setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
    }

    const toggleReset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    }

    useEffect(() => {

        const w = calculateWinner(squares)

        if (w) {
            setWinner(w)
        }

        if (!w && !squares.filter((square) => !square).length) {
            setWinner('Both')
        }

    }, [squares])

    return (
        <div className=''>

            {!winner ?

                <p className='instruction'>Hey {currentPlayer}, it's your turn!</p> :

                <p className='instruction'>{winner} Win!</p>

            }


            <div className='board'>
                {Array(9).fill(null).map((_, i) => (
                    <Square
                        winner={winner}
                        key={i}
                        onClick={() => setSquareValue(i)}
                        value={squares[i]}
                    />
                ))}
            </div>

            <button className='reset' onClick={toggleReset}>RESET</button>
        </div>
    )
}

export default Board