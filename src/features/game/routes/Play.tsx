import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table } from "../components/Table"
import { ITable, PlayerAction } from "../types/index"
import ConnectContext, { ConnectionContextType } from "../../../contexts/signalRContext"

export function Play() {
	const navigate = useNavigate()
	const [table, setTable] = useState<ITable | null>()
	const [winner, setWinner] = useState<string | null>(null)

	const { connection } = React.useContext(ConnectContext) as ConnectionContextType;

	connection?.on("TableUpdated", (table: ITable) => {
		setTable(table)
		console.table(table)
	})

	connection?.on("ResetTable", () => {
		setWinner(null)
	})

	connection?.on("RedirectToLobby", () => {
		navigate('/lobbies')
	})

	connection?.on("PlayerLeft", (table: ITable) => {
		setTable(table);
	});

	connection?.on("WinnerDeclared", (winner: string) => {
		setWinner(winner);
	});

	const handlePlayerAction = (action: PlayerAction, amount?: number) => {
		connection?.invoke("PlayerAction", action, amount ? amount : 0)
			.then(() => console.log('PlayerAction'))
			.catch((error) => console.error(error))
	}

	const getGame = () => {
		connection?.invoke("GetGame")
	}

	useEffect(() => {
		getGame()
	}, [])

	function exitGame() {
		connection?.invoke("LeaveGameSession").then(() => navigate('/lobbies'))
	}

	useEffect(() => {
		if(window.innerHeight > window.innerWidth){
			alert("Please rotate screen!");
		}
	}, [])

	return (
		<div className="play w-full h-full bg-wooden bg-cover">
			<div className="flex w-full h-full">
				<button
					onClick={() => exitGame()} 
					className="absolute text-white text-sm bg-black  w-fit h-fit rounded-full hover:bg-gray-900 p-2 m-1 z-10">
					⬅️Lobby
				</button>
				{table && 
					<Table 
						table={table}
						winner={winner} 
						handlePlayerAction={handlePlayerAction} 
					/>
				}     
			</div>
        </div>
	)
}
