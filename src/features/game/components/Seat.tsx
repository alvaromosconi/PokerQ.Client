import { useState } from "react"
import { Player, Rank, Suit } from "../types";
import { IUser } from "../../../types";
import Card from "./Card";
import { getCurrentUser } from "../../../services/auth-service";

type SeatProps = {
    index: number
    player: Player
}

export function Seat({ index, player }: SeatProps) {
    const [connectedPlayer] = useState<IUser>(getCurrentUser())
    
    return (
        <div
            className={`player-${index}`}
        >
            <div className="">
                <div className="flex h-fit justify-center">
                    {player.holeCards.map((card, index) => (
                        player.user.id === connectedPlayer?.id
                        ? (
                            <div key={index} className={`transform ${index === 0 ? '-rotate-6 translate-x-2' : 'rotate-6'}`}>
                                <Card {...card} />
                            </div>
                        ) 
                        : (
                            <div key={index} className={`transform ${index === 0 ? '-rotate-6 translate-x-2' : 'rotate-6'}`}>
                                <Card key={index} suit={Suit.None} rank={Rank.None} />
                            </div>
                        )
                    ))}
                </div>

                <div className="bg-[#af7575] bg-gradient-to-b from-gray-800 to-gray-600 shadow-sm rounded-lg text-white font-bold text-center text-sm skew-x-12 flex-flex-col p-1 ml-2 mt-1">
                    <p>{player.user.userName} </p>
                    <hr className="mx-auto w-[80%]"></hr>
                    <p className="text-yellow-600">$ {player.balance}</p>
                </div>
            </div>
        </div>
    )
}

