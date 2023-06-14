import {useAuth0} from "@auth0/auth0-react";
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "@/Components/HomePage.tsx";
import {Shop} from "@/Components/Shop.tsx";
import {ProtectedRoute} from "@/Components/ProtectedRoute.tsx";
import {Play} from "@/Components/Play.tsx";
import {Leaderboard} from "@/Components/Leaderboard.tsx";


export function GoalyRouter() {
  
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
    
    return (

        <div className="goalyfancy">
                <nav className="bg-sky-600 rounded-b-lg shadow-lg mb-4">
                    <div className="navbar justify-center">
                        <div className={"navbar-center lg:flex"}>

                            <ul className={"menu menu-horizontal p-0 text-xl"}>
                                <li><Link to="/" className="no-underline text-orange-200">Home</Link></li>
                                <li><Link to="/play" className="no-underline text-orange-200">Play</Link></li>
                                <li><Link to="/shop" className="no-underline text-orange-200">Shop</Link></li>
                                <li><Link to="/leaderboard" className="no-underline text-orange-200">Leaderboard</Link></li>
                                {isAuthenticated ? (
                                    <>
                                      <li><Link to="/logout" className="no-underline text-orange-200" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } } ) }>Logout</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login" className="no-underline text-orange-200" onClick={() => loginWithRedirect()}> Login</Link></li>
                                    </>
                                )}</ul>

                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
                    <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
                </Routes>
            </div>
    );
}
