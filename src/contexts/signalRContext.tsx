import React, { ReactElement, useEffect, useState, useMemo } from "react";
import { authHeaderWithoutBearer } from "../services/auth-header";
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";

export type ConnectionContextType = {
    connection: HubConnection;
};

const ConnectContext = React.createContext<ConnectionContextType | null>(null);

export default ConnectContext;

export const ConnectContextProvider = (props: ConnectContextProviderProps) => {
    const SERVER: string = import.meta.env.VITE_SERVER;
    const GAME_HUB: string = import.meta.env.VITE_GAME_HUB;
    const { Authorization } = authHeaderWithoutBearer();
    const hubURL = `${SERVER}${GAME_HUB}?access_token=${Authorization}`;

    const connection = useMemo(() => {
        return new HubConnectionBuilder()
            .withUrl(hubURL)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .withServerTimeout(600000)
            .build();
    }, [hubURL]);

    const [connectionStarted, setConnectionStarted] = useState(false);

    useEffect(() => {
        if (connection.state === HubConnectionState.Disconnected) {
            connection.start().then(() => {
                console.log("Connection started");
                setConnectionStarted(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!connectionStarted) {
        return null;
    }

    return (
        <ConnectContext.Provider value={{ connection }}>
            {props.children}
        </ConnectContext.Provider>
    );
};

interface ConnectContextProviderProps {
    children: ReactElement;
}