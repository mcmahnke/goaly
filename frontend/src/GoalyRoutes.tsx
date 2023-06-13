import {LogoutButton} from "@/Components/LogoutButton.tsx";
import {LoginButton} from "@/Components/LoginButton.tsx";
import {httpClient} from "@/Services/HttpClient.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "@/Components/HomePage.tsx";
import {Shop} from "@/Components/Shop.tsx";
import {CreateProfile} from "@/Components/CreateProfile.tsx";
import {ProtectedRoute} from "@/Components/ProtectedRoute.tsx";
import {Play} from "@/Components/Play.tsx";


export function GoalyRouter() {
  
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    return (

        <div className={"doggrfancy"}>
                <nav className="bg-blue-800 rounded-b shadow-lg mb-4">
                    <div className="navbar justify-center">
                        <div className={"navbar-center lg:flex"}>

                            <ul className={"menu menu-horizontal"}>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/play">Play</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                {isAuthenticated ? (
                                    <>
                                      <li><Link to="/logout">Logout</Link></li>
                                      <h2>{user.nickname}</h2>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login"> Login</Link></li>
                                        <li><Link to="/create"> Create Account</Link> </li>
                                    </>
                                )}</ul>

                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
                    <Route path="/create" element={<CreateProfile />}/>
                    <Route path="/login" element={<LoginButton />} />
                    <Route path="/logout" element={<LogoutButton />} />
                    <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
                </Routes>
            </div>
    );
}
