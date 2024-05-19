import { IUser } from "../../../types"

export enum Suit {
	None = "None",
	Hearts = "Hearts",
	Diamonds = "Diamonds",
	Clovers = "Clovers",
	Spades = "Spades"
}

export enum Rank {
	None = "None",
	Two = "Two",
	Three = "Three",
	Four = "Four",
	Five = "Five",
	Six = "Six",
	Seven = "Seven",
	Eight = "Eight",
	Nine = "Nine",
	Ten = "Ten",
	Jack = "Jack",
	Queen = "Queen",
	King = "King",
	Ace = "Ace"

}

export type Card = {
	suit: Suit
	rank: Rank
}

export type Player = {
	user: IUser
	holeCards: Card[]
	communityCard: Card[]
	cards: Card[]
	isSmallBlind: boolean
	isBigBlind: boolean
	balance: number
	currentBet: number
	validActions: PlayerAction[]
}

export type ITable = {
	players: Player[]
	smallBlind: number
	bigBlind: number
	pot: number
	currentBet: number
	currentPlayer: Player
	communityCards: Card[]
	stage: Stage
  }

export enum PlayerAction {
	Check = "Check",
    Raise = "Bet",
    Call = "Call",
	AllIn = "AllIn",
    Fold = "Fold",
    None = "None"
}

export enum Stage {
	Initial = "Initial",
	Preflop = "Preflop",
	Flop = "Flop",
	Turn = "Turn",
	River = "River",
	Showdown = "Showdown"
}