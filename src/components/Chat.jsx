import React, { useState, useEffect } from "react";
import socket from "../utils/websocket";

const Chat = ({user}) => {

    {console.log(user)}
 
    const userId = user?.id.toString();

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState(() => {
   
        const savedChat = localStorage.getItem(`chatHistory_${userId}`);
        return savedChat ? JSON.parse(savedChat) : [];
    });

    useEffect(() => {
        socket.on("message", (msg) => {
            setChat((prev) => {
                const updatedChat = [...prev, { 
                    text: msg, 
                    sender: "server", 
                    timestamp: Date.now() 
                }];
                localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(updatedChat));
                return updatedChat;
            });
        });

        return () => socket.off("message");
    }, [userId]);

    const sendMessage = () => {
        if (message.trim()) {
            const outgoingMessage = { 
                text: message, 
                sender: user.username, 
                timestamp: Date.now() 
            };
            
            setChat((prev) => {
                const updatedChat = [...prev, outgoingMessage];
                localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(updatedChat));
                return updatedChat;
            });

            socket.emit("message", message);
            setMessage("");
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-blue-500 text-white p-4 text-center text-xl font-bold">
              Chat : {user?.email}
            </header>

            <div className="flex-1 p-4 overflow-y-auto bg-white space-y-4">
                {chat.length > 0 ? (
                    chat.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === user.username ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-4 max-w-xs rounded-lg shadow-md ${
                                    msg.sender === user.username
                                        ? "bg-green-500 text-white rounded-tr-none"
                                        : "bg-blue-500 text-white rounded-tl-none"
                                }`}
                            >
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-semibold">{msg.sender}:</p>
                                    <p className="text-base">{msg.text}</p>
                                </div>
                                {msg.timestamp && (
                                    <small className="text-gray-200 text-xs block mt-2 text-right">
                                        {formatTimestamp(msg.timestamp)}
                                    </small>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center mt-10">No messages yet</div>
                )}
            </div>

            <footer className="p-4 border-t bg-gray-50 flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </footer>
        </div>
    );
};

export default Chat;
