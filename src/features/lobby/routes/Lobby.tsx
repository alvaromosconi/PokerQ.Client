/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import Modal from "../../../components/Modal"
import { GameSessionCreation } from "../components/GameSessionCreation"
import { GameSessionCreated } from "../components/GameSessionCreated"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { GameSession } from "../types"
import ConnectContext, { ConnectionContextType } from "../../../contexts/signalRContext"

export function Lobby() {
	const navigate = useNavigate()
	
	const [gameSessions, setGameSessions] = useState<GameSession[]>([])
	const [modal, setModal] = useState(false)
	const [code, setCode] = useState<string | null>(null)

	const [gameStarted, setGameStarted] = useState(false)

	const { connection } = React.useContext(ConnectContext) as ConnectionContextType;
	
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get('code');
		if (code) {
			joinGameSession(code);
		}
	}, [])

	useEffect(() => {
		getSessions()
	}, [])


	connection?.on("SetSessions", (gameSessions: GameSession[]) => {
		setGameSessions(gameSessions)
	})
	connection?.on("GameSessionUpdated", handleUpdateGameSessions) 
	connection?.on("GameSessionCreated", (gameSession: GameSession) => {
		handleUpdateGameSessions(gameSession)
		setCode(gameSession.code)
	})
	connection?.on("RedirectToGame", () => {
		setGameStarted(true)
		navigate('/play')
	})

	function handleUpdateGameSessions(gameSession: GameSession) {
		const newGameSessions = gameSessions.map((session) => 
			session.id === gameSession.id 
				? gameSession 
				: session
		)	
		setGameSessions(newGameSessions)
	}

	function createGameSession(name: string) {
		connection?.invoke("CreateGameSession", { Name: name })
	}

	function joinGameSession(code: string) {
		connection?.invoke("JoinGameSession", { Code: code })
	}

	function getSessions() {
		connection?.invoke("SendSessions")
	}

	function closeModal() {
		setModal(false)
		setCode(null)
	}

	const GameSessionRow = ({gameSession} : {gameSession : GameSession}) => (
		<tr className="text-center hover:bg-gray-200">
			<td>{gameSession.name}</td>
			<td>{gameSession.connectedPlayers}</td>
			<td>
			<button
				onClick={() => joinGameSession(gameSession.code)}
				className="bg-yellow-500 p-2 rounded-md ring-2 ring-black m-2 hover:opacity-80 hover:scale-105"
			>
				Join
			</button>
			</td>
		</tr>
	)

	return (
		<div className="container w-full h-full items-center justify-center grid">
			<main className="flex flex-col">
				<Modal 
					openModal={modal} 
					closeModal={closeModal}>
					{code
						? <GameSessionCreated code={code} requiredPlayersAreConnected={gameStarted} />
						: <GameSessionCreation onCreateSession={createGameSession} />}
				</Modal>
				<button
						className="self-end bg-green-500 text-white p-2 my-2 rounded-lg hover:opacity-80 hover:scale-105"
						onClick={() => setModal(true)}>
						Create Table
				</button>
				<table className="table-auto shadow-lg">
					<thead>
						<tr className="border">
							<th className="bg-purple-100 border text-left px-8 py-4">Name</th>
							<th className="bg-purple-100 border text-left px-8 py-4">Players in</th>
							<th className="bg-purple-100 border text-left px-8 py-4"></th>
						</tr>
					</thead>
					<tbody>
						{gameSessions?.map((gameSession: GameSession, index) => (
							<GameSessionRow 
								key={index} 
								gameSession={gameSession}/>
						))}
					</tbody>
				</table>
			</main>
		</div>
	)
}