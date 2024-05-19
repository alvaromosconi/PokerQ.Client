import { useState } from "react"
import { IUser } from "../../../types"
import { Player, PlayerAction } from "../types"

type ActionButtonsProps = {
    user: IUser
    currentPlayer: Player
    pot: number
    handlePlayerAction: (action: PlayerAction, value?: number) => void
}

export default function ActionButtons({ user, currentPlayer, pot, handlePlayerAction}: ActionButtonsProps) {

    const [isRaiseClicked, setIsRaiseClicked] = useState(false);
    const [raiseValue, setRaiseValue] = useState(0)
    
    const validActions: PlayerAction[] = currentPlayer.validActions

    const handleRaiseClick = () => {
        if (isRaiseClicked) {
            if (raiseValue === currentPlayer.balance)
                handlePlayerAction(PlayerAction.AllIn)
            else
                handlePlayerAction(PlayerAction.Raise, raiseValue)
            setIsRaiseClicked(false)
        } else {
            setIsRaiseClicked(true)
        }
    }

    return (
        <>
            {user.id === user.id ? (
                <div className="text-white font-bold flex flex-col flex-wrap w-fit">
                    {isRaiseClicked && (
                            <div className="flex flex-col flex-wrap">
                                <div className="flex flex-wrap gap-1">
                                    <input
                                        type="range"
                                        min="0"
                                        max={currentPlayer.balance}
                                        value={raiseValue}
                                        step={pot / 8}
                                        onChange={(e) => setRaiseValue(Math.round(Number(e.target.value)))}
                                        className="w-[50%]"
                                    />
                                    <p>{Math.round(raiseValue)}</p>
                                </div>
                      
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <button disabled={currentPlayer.balance < pot / 4} className=" bg-blue-500 text-white text-center rounded shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700" onClick={() => setRaiseValue(pot / 4)}>1/4 pot</button>
                                    <button disabled={currentPlayer.balance < pot / 2} className=" bg-blue-500 text-white text-center rounded shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700" onClick={() => setRaiseValue(pot / 2)}>1/2 pot</button>
                                    <button disabled={currentPlayer.balance < pot} className=" bg-blue-500 text-white text-center rounded shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700" onClick={() => setRaiseValue(pot)}>Pot</button>
                                    <button disabled={currentPlayer.balance < pot * 2} className=" bg-blue-500 text-white text-center rounded shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700" onClick={() => setRaiseValue(pot * 2)}>2x pot</button>
                                    <button className=" bg-blue-500 text-white text-center rounded shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700" onClick={() => {setRaiseValue(currentPlayer.balance); }}>All in</button>
                                </div>
                            </div>
                    )}
                    <div className="flex flex-wrap gap-1 text-xs sm:text-sm md:text-base lg:text-lg text-white">
                        {validActions?.includes(PlayerAction.Fold) && (
                            <button
                                className="bg-red-700 hover:bg-red-800 focus:ring-4 border-2 border-black focus:ring-red-300 rounded-md text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={() => handlePlayerAction(PlayerAction.Fold)}
                                disabled={!validActions?.includes(PlayerAction.Fold)}
                            >
                                <span>
                                    Fold
                                </span>
                            </button>
                        )}
                        {validActions?.includes(PlayerAction.Check) && (
                            <button
                                className="bg-blue-500 hover:bg-green-600 border-2 border-black focus:ring-4 focus:ring-blue-300 rounded-md text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                onClick={() => handlePlayerAction(PlayerAction.Check)}
                                disabled={!validActions?.includes(PlayerAction.Check)}
                            >
                                <span>
                                    Check
                                </span>
                            </button>
                        )}
                        {validActions?.includes(PlayerAction.Call) && (
                            <button
                                className="bg-purple-700 hover:bg-purple-800 border-2 border-black focus:ring-4 focus:ring-purple-300 rounded-md text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                onClick={() => handlePlayerAction(PlayerAction.Call)}
                                disabled={!validActions?.includes(PlayerAction.Call)}
                            >
                                <span className="p-4">
                                    Call
                                </span>
                            </button>
                        )}
                        {validActions?.includes(PlayerAction.Raise) && (
                            <div>
                                <button
                                    className=" bg-orange-400 hover:bg-orange-500 border-2 border-black focus:ring-4 focus:ring-orange-300 rounded-md text-center dark:focus:ring-orange-900"
                                    onClick={handleRaiseClick}
                                    disabled={!validActions?.includes(PlayerAction.Raise)}
                                >
                                    {
                                        <span className="p-4">
                                            {isRaiseClicked ? 'Confirm' : 'Raise'}
                                        </span>
                                    }
                                </button>
                            
                            </div>
                        )}
                        {validActions?.includes(PlayerAction.AllIn) && (
                            <button
                                className="bg-gray-600 hover:bg-gray-800 border-2 border-black focus:ring-4 focus:ring-purple-300 rounded-md text-center dark:bg-gray-400-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                                onClick={() => {setRaiseValue(currentPlayer.balance); handlePlayerAction(PlayerAction.AllIn)}}
                                disabled={!validActions?.includes(PlayerAction.AllIn)}
                            >
                                <span className="p-4">
                                    All In
                                </span>
                            </button>
                        )}
                    </div>
                    
                </div>
    
            ) : <> </>}
        </>
    );
}
