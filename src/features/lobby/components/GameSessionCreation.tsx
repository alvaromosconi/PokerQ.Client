import { useState } from 'react';

type GameSessionCreationProps = {
    onCreateSession: (name: string) => void;
}

export function GameSessionCreation({ onCreateSession }: GameSessionCreationProps) {
    const [gameSession, setGameSession] = useState('')

    const handleSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameSession(e.target.value)
    }

    const handleSessionCreation = () => {
        onCreateSession(gameSession)
    }

    return (
        <div className="w-[400px] h-[400px] text-gray-500 m-4 overflow-hidden">
            <header className="border-b-2 border-gray-200">
                <h1 className="ml-2 font-bold text-gray-700">Create Session</h1>
            </header>
            <div className="flex h-full mt-10">
                <div className="flex flex-col items-center w-full">
                    <label>
                        Session Name
                        <input
                            type="text"
                            value={gameSession}
                            className="border-2 border-gray-200 p-1 rounded-md"
                            onChange={handleSessionNameChange}
                        />
                    </label>
                    <button
                        onClick={handleSessionCreation}
                        className="bg-green-500 text-white p-2 rounded-md hover:opacity-80 hover:scale-105"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
