import React from "react";
import jack from "../assets/images/cards/clovers/jack.png";
import ace from "../assets/images/cards/diamonds/ace.png";
import ten from "../assets/images/cards/spades/ten.png";
import queen from "../assets/images/cards/hearts/queen.png";

export function Dashboard() {
    return (
        <div className="container p-10 h-full min-w-full overflow-auto flex flex-col justify-between">
            <main className="grid grid-cols-1 md:grid-cols-2 place-items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold">Play Poker</h1>
                    <p className="mt-4 text-lg md:text-xl">
                        For fun <br /> With friends or strangers
                    </p>
                </div>
                <div className="flex flex-col items-center md:items-end space-y-4">
                    <div className="flex lg:flex-col  gap-2">
                    <button className="ring-2 ring-violet-600 bg-violet-500 animate-pulse hover:animate-none hover:scale-110 duration-1000 text-white text-xl rounded-lg w-36 h-16">
                                <a href="/lobbies" className="">
                                    Play
                                </a>
                            </button>
                            <button className="ring-2 ring-gray-500 bg-gray-400 hover:scale-105 text-white text-xl rounded-lg w-36 h-16">
                                <a href="/game" className="">
                                    Rules
                                </a>
                            </button>
                    </div>
                    <p className="text-sm md:text-base italic">
                        Texas Hold'em <br />
                        Up to 10 players!
                    </p>
                </div>
            </main>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center w-fit mt-10 mx-auto">
                <img src={ten} alt="Ten of Spades" className="card-img sm:w-32 -rotate-6" />
                <img src={queen} alt="Queen of Hearts" className="card-img sm:w-32 rotate-6" />
                <img src={jack} alt="Jack of Clovers" className="card-img sm:w-32 -rotate-6" />
                <img src={ace} alt="Ace of Diamonds" className="card-img sm:w-32 rotate-6" />
            </div>
            <div className="border-b-2 text-lg md:text-xl font-thin text-green-600 border-gray-300 w-full text-center py-4 mt-8">
                <p>
                    - Play as a guest or Sign up <br />
                    - No downloads required <br />
                    - Totally free!
                </p>
            </div>
            <footer className="text-center">
                <p className="text-sm text-gray-400 italic">
                    DISCLAIMER: This is a free game and no real money is involved. Winning here does not imply winning on other sites.
                </p>
            </footer>
        </div>
    );
}

export default Dashboard;
