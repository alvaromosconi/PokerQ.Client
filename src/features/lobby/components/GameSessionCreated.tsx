import { useEffect } from 'react'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

type GameSessionCreatedProps = {
    code: string
    requiredPlayersAreConnected: boolean
}

export function GameSessionCreated({ code, requiredPlayersAreConnected }: GameSessionCreatedProps) {

    const navigate = useNavigate()

    const urlRef = useRef<HTMLInputElement>(null);

    function copyToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
        if (urlRef.current) {
            urlRef.current.select();
            navigator.clipboard.writeText(urlRef.current.value);
            e.target;
        }
    }

    function goPlay() {
        navigate('/play');
    }

    useEffect(() => {
        if (requiredPlayersAreConnected) {
            goPlay();
        }
    }, [requiredPlayersAreConnected])

    return (
        <div className='w-[400px] h-fit text-gray-500 m-4 overflow-hidden flex flex-col'>
            <header className='border-b-2  border-gray-200'>
                <h1 className='ml-2 font-bold text-gray-700'>
                    Create Session
                </h1>
            </header>
            <main className='flex h-full mt-10'>
                <div className='flex flex-col items-center w-full'>
                    <h1 className='text-2xl'>
                        Session Created
                    </h1>
                    <p>
                        Share this code with others to join:
                    </p>
                    <div className='flex mt-4 m-2'>
                        <input ref={urlRef} className='border-2 border-gray-300 rounded-md p-2' value={"http://localhost:5173/lobbies?code=" + code} readOnly />
                        <button onClick={copyToClipboard} className='ml-2 bg-blue-500 text-white p-2 rounded-md'>Copy</button>
                    </div>
                    <QRCode className='py-10' value={"http://localhost:5173/lobbies?code=" + code} />;
                </div>
            </main>
            <footer className='place-self-end'>
                {!requiredPlayersAreConnected ? <h1>Waiting for players...</h1> : null}
            </footer>
        </div>
    )
}
