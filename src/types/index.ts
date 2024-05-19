export type IUser = {
    id?: string | null,
    name?: string,
    userName: string,
    email: string
}

export type LinkItem = {
    text: string
    to: string
    onClickAction?: () => void
}