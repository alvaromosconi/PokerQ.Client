import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { Home,
         Dashboard,
         Login,
         Register } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { Logout } from "../features/auth/routes/Logout"
import { Lobby } from "../features/lobby/routes/Lobby"
import { Play } from "../features/game/routes/Play"
import { ConnectContextProvider } from "../contexts/signalRContext"

export function AppRouter() {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path='dashboard' element={<PrivateRoute>
                    <Dashboard />
                </PrivateRoute>} />
                <Route path='lobbies' element={<PrivateRoute>
                    <ConnectContextProvider>
                    <Lobby />
                    </ConnectContextProvider>
                </PrivateRoute>} />
                <Route path='play' element={<PrivateRoute>
                    <ConnectContextProvider>
                    <Play />
                    </ConnectContextProvider>
                </PrivateRoute>} />

            </Route>

            <Route path='logout' element={<Logout />} />
        </Routes>
    )
}