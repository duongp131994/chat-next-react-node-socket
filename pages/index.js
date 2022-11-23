import React, {useState, useEffect, useRef, createContext} from "react";


import socket from "components/socket";
import socketIOClient from "socket.io-client";
const host = "http://localhost:3001";

import Login from 'components/Login'

export const UserContextApp = createContext();
function App({Component, pageProps}) {
    const [user, setUser] = useState([]);

    const idSocket = ''

    useEffect(() => {
        const setUserInDb = async () => {
            try {
                //get thong tin user
            } catch (error) {
                console.log('ERROR SETTING USER INFO IN DB', error)
            }
        }
    }, [user])

    if (!user) return <Login/>

    return (<UserContextApp.Provider value={{user, idSocket}}><Component {...pageProps}/></UserContextApp.Provider>)
}

export default App;
