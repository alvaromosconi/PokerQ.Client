
import { getCurrentUser } from "../../../services/auth-service";
import { Card as CardType, ITable, PlayerAction } from "../types"
import ActionButtons from "./ActionButtons";
import { Card } from "./Card"
import { Seat } from "./Seat"

interface ITableProps {
    table: ITable;
    winner: string | null;
    handlePlayerAction: (action: PlayerAction, amount?: number) => void;
}

export function Table({ table, winner, handlePlayerAction}: ITableProps) {
    const players = table.players
	const connectedPlayer = getCurrentUser()

    function reOrderPlayers() {
        const index = players.findIndex(player => player.user.id === connectedPlayer?.id)
        const playersCopy = [...players]
        const playersAfter = playersCopy.splice(0, index)
        return playersCopy.concat(playersAfter)
    }

    return (
        <div className="relative grid grid-rows-1 grid-cols-[80%,20%] min-w-full h-full">
            
            <div className="relative left-0 overflow-auto  h-[85%] self-center">
                <img src="../../../src/assets/images/table.svg" alt="table" className="w-full h-full" />
                <CommunityCards communityCards={table.communityCards} />
                {reOrderPlayers().map((player, index) => (
                    <Seat
                        key={index}
                        index={index}
                        player={player}
                    />
                ))}	
            </div>

            <div className="grid grid-rows-2 justify-between">        
                <div className=" relative table-info text-white text-xs  bg-blue-800 rounded-lg shadow-2xl w-fit h-fit m-2">
                    <div className="flex flex-col p-2 w-full sm:text-xs md:text-sm lg:text-xl">
                        {winner && <p className="font-extrabold text-yellow-300 m-2">Winner: {winner}</p>}
                        <p className="text-white">Stage: <span className="font-bold text-white">{table.stage}</span></p>
                        <p className="text-green-400">Pot: <span className="font-bold text-green-400">{table.pot}</span></p>
                        <p className="text-red-500">Round Bet: <span className="font-bold text-red-500">{table.currentBet}</span></p>
                    </div>
                </div>
                {
                    table.currentPlayer.user.id === connectedPlayer?.id 
                    ? (
                        <div className="flex flex-col">

                            <p className="text-lg text-white font-bold">Personal Bet: <span className="text-yellow-500">{table.currentPlayer.currentBet}</span></p>
                
                            <ActionButtons 
                                user={connectedPlayer}
                                currentPlayer={table.currentPlayer} 
                                pot={table?.pot}
                                handlePlayerAction={handlePlayerAction} 
                            />
                        </div>
                    ) 
                    : (<></>)
                }   
            </div>
        </div>
    )
}

interface ICommunityCardsProps {
    communityCards: CardType[];
}

function CommunityCards({ communityCards }: ICommunityCardsProps) {
    return (
        <div className="community-cards absolute flex items-center justify-center gap-4 
                        sm:top-[calc(45%-23.1px)] sm:left-[calc(50%-112px)]
                        md:top-[calc(45%-22.3px)] md:left-[calc(50%-132px)]
                        lg:top-[calc(45%-66px)] lg:left-[calc(50%-232px)]">
            {communityCards.length > 0 &&
                communityCards.map((card, index) => (
                    <Card key={index} {...card} />
            ))}
        </div>
    );
}


