import React from 'react'
import { Player } from './Board'

interface SquareProps {
    value: Player
    winner: Player
    onClick: () => void
}

const Square = ({ value, onClick, winner }: SquareProps) => {

    if (!value) {
        return (
            <button className='square' onClick={onClick} disabled={Boolean(winner)} />
        )
    }

    return (
        <button className={`square square_${value.toLocaleLowerCase()}`} disabled>{value}</button>
    )
}

export default Square