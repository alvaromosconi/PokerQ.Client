import { Card as CardType, Suit } from "../types";

export function Card(card: CardType) {
    const cardToImage = (card: CardType) => {
        const suit = card.suit.toLowerCase();
        const rank = card.rank.toLowerCase();
        const cardImage = `${suit}/${rank}.png`;
        console.log(cardImage)
        return cardImage;
    };

    return (
        <>
            {card.suit === Suit.None ? (
                <img
                    src="../../../src/assets/images/cards/back-black.png"
                    className="sm:w-8 md:w-10 lg:w-20 xl:w-20 "
                    alt="card back"
                />
            ) : (
                <img
                    src={`../../../src/assets/images/cards/${cardToImage(card)}`}
                    className="sm:w-8 md:w-10 lg:w-20 xl:w-20 "
                    alt={`card ${card.rank} of ${card.suit}`}
                />
            )}
        </>
    );
}



export default Card;
