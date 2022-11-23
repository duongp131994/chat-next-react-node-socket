import React, { useState, useEffect, useRef } from "react";


import socketIOClient from "socket.io-client";
const host = "http://localhost:3001";

import Login from 'components/Login'

function App() {
    const [user, setUser] = useState([]);
    const [id, setId] = useState();

    const socketRef = useRef();
    const messagesEnd = useRef();

    return (
        <div className="box-chat">


        </div>
    );
}

export default App;
