// import React, { useState } from "react";
// import { UserCircle } from "lucide-react";

// const users = [
//   { id: 1, name: "Keerthi" },
//   { id: 2, name: "Sathya" },
//   { id: 3, name: "Vishnu" },
// ];

// const initialMessages = {
//   1: [
//     { from: "them", text: "Hi! Could you share the latest banner mockup?" },
//     { from: "me", text: "Sure! Uploading it now." },
//   ],
//   2: [{ from: "them", text: "Can we update the logo spacing?" }],
//   3: [],
// };

// const Messages = () => {
//   const [activeUserId, setActiveUserId] = useState(1);
//   const [messages, setMessages] = useState(initialMessages);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;

//     setMessages((prev) => ({
//       ...prev,
//       [activeUserId]: [
//         ...(prev[activeUserId] || []),
//         { from: "me", text: newMessage.trim() },
//       ],
//     }));
//     setNewMessage("");
//     setIsTyping(false);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       <div className="w-72 bg-white border-r p-4">
//         <h2 className="text-xl font-semibold mb-6">Messages</h2>
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setActiveUserId(user.id)}
//               className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
//                 activeUserId === user.id ? "bg-gray-200 font-semibold" : ""
//               }`}
//             >
//               <div className="bg-gray-300 rounded-full p-2">
//                 <UserCircle className="w-5 h-5 text-gray-600" />
//               </div>
//               <span>{user.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div className="p-4 border-b bg-white shadow-sm">
//           <h3 className="text-lg font-medium">
//             Chat with <span className="text-blue-600">{users.find((u) => u.id === activeUserId)?.name}</span>
//           </h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-3">
//           {(messages[activeUserId] || []).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-[60%] p-3 rounded-lg text-sm ${
//                 msg.from === "me"
//                   ? "ml-auto bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {msg.image && (
//                 <img src={msg.image} alt="uploaded" className="rounded mb-2 max-w-full" />
//               )}
//               {msg.text}
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-sm text-gray-500 italic mt-2">
//               {users.find((u) => u.id === activeUserId)?.name} is typing...
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-white">
//           <div className="flex items-center gap-3">
//             {/* File Upload */}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="file-upload"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onload = () => {
//                     setMessages((prev) => ({
//                       ...prev,
//                       [activeUserId]: [
//                         ...(prev[activeUserId] || []),
//                         { from: "me", text: "", image: reader.result },
//                       ],
//                     }));
//                   };
//                   reader.readAsDataURL(file);
//                 }
//               }}
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer text-gray-500 hover:text-gray-700"
//             >
//               📎
//             </label>

//             {/* Message input */}
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => {
//                 setNewMessage(e.target.value);
//                 setIsTyping(true);
//                 clearTimeout(typingTimeout);
//                 const timeout = setTimeout(() => setIsTyping(false), 1000);
//                 setTypingTimeout(timeout);
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


// import React, { useState, useEffect, useRef } from "react";
// import { UserCircle } from "lucide-react";
// import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const users = [
//   { id: 1, name: "Keerthi" },
//   { id: 2, name: "Sathya" },
//   { id: 3, name: "Vishnu" },
// ];

// const Messages = () => {
//   const [activeUserId, setActiveUserId] = useState(1);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Load messages from backend
//   useEffect(() => {
//     axios.get(`/api/messages/${activeUserId}`).then((res) => {
//       setMessages((prev) => ({ ...prev, [activeUserId]: res.data }));
//     });
//   }, [activeUserId]);

//   // Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages[activeUserId]]);

//   // Socket.IO receive messages
//   useEffect(() => {
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => ({
//         ...prev,
//         [msg.userId]: [...(prev[msg.userId] || []), msg],
//       }));
//     });
//     return () => socket.disconnect();
//   }, []);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;
//     const msg = {
//       userId: activeUserId,
//       from: "me",
//       text: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => ({
//       ...prev,
//       [activeUserId]: [...(prev[activeUserId] || []), msg],
//     }));
//     setNewMessage("");
//     setIsTyping(false);
//     setShowEmojiPicker(false);
//     socket.emit("send_message", msg);
//     axios.post("/api/messages", msg);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       <div className="w-72 bg-white border-r p-4">
//         <h2 className="text-xl font-semibold mb-6">Messages</h2>
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setActiveUserId(user.id)}
//               className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
//                 activeUserId === user.id ? "bg-gray-200 font-semibold" : ""
//               }`}
//             >
//               <div className="bg-gray-300 rounded-full p-2">
//                 <UserCircle className="w-5 h-5 text-gray-600" />
//               </div>
//               <span>{user.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex-1 flex flex-col justify-between">
//         <div className="p-4 border-b bg-white shadow-sm">
//           <h3 className="text-lg font-medium">
//             Chat with <span className="text-blue-600">{users.find((u) => u.id === activeUserId)?.name}</span>
//           </h3>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-3">
//           {(messages[activeUserId] || []).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-[60%] p-3 rounded-lg text-sm ${
//                 msg.from === "me"
//                   ? "ml-auto bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {msg.image && (
//                 <img src={msg.image} alt="uploaded" className="rounded mb-2 max-w-full" />
//               )}
//               {msg.text}
//               <div className="text-xs text-gray-300 mt-1 text-right">
//                 {new Date(msg.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-sm text-gray-500 italic mt-2">
//               {users.find((u) => u.id === activeUserId)?.name} is typing...
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="p-4 border-t bg-white">
//           <div className="flex items-center gap-3 relative">
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="file-upload"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
//                   const reader = new FileReader();
//                   reader.onload = () => {
//                     const imgMsg = {
//                       userId: activeUserId,
//                       from: "me",
//                       image: reader.result,
//                       text: "",
//                       timestamp: new Date().toISOString(),
//                     };
//                     setMessages((prev) => ({
//                       ...prev,
//                       [activeUserId]: [...(prev[activeUserId] || []), imgMsg],
//                     }));
//                     socket.emit("send_message", imgMsg);
//                     axios.post("/api/messages", imgMsg);
//                   };
//                   reader.readAsDataURL(file);
//                 } else {
//                   alert("Only image files under 5MB are allowed.");
//                 }
//               }}
//             />
//             <label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-gray-700">📎</label>

//             <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-14 z-50">
//                 <Picker onSelect={(emoji) => setNewMessage((prev) => prev + emoji.native)} theme="light" />
//               </div>
//             )}

//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => {
//                 setNewMessage(e.target.value);
//                 setIsTyping(true);
//                 clearTimeout(typingTimeout);
//                 const timeout = setTimeout(() => setIsTyping(false), 1000);
//                 setTypingTimeout(timeout);
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               disabled={!newMessage.trim()}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


// import React, { useState, useEffect } from "react";
// import { UserCircle } from "lucide-react";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000"); // 🔁 Replace with your backend URL

// const users = [
//   { id: 1, name: "Keerthi" },
//   { id: 2, name: "Sathya" },
//   { id: 3, name: "Vishnu" },
// ];

// const Messages = () => {
//   const [activeUserId, setActiveUserId] = useState(1);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [showEmoji, setShowEmoji] = useState(false);

//   useEffect(() => {
//     socket.on("newMessage", ({ userId, message }) => {
//       setMessages((prev) => ({
//         ...prev,
//         [userId]: [...(prev[userId] || []), message],
//       }));
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, []);

//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     const message = {
//       from: "me",
//       text: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//     };

//     const updated = {
//       ...messages,
//       [activeUserId]: [...(messages[activeUserId] || []), message],
//     };

//     setMessages(updated);
//     setNewMessage("");
//     setIsTyping(false);

//     socket.emit("sendMessage", { userId: activeUserId, message });

//     // Optional: Save to MongoDB
//     try {
//       await axios.post("http://localhost:5000/api/messages", {
//         userId: activeUserId,
//         message,
//       });
//     } catch (err) {
//       console.error("Failed to save message:", err);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Only image files are allowed.");
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert("File size must be under 2MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       const message = {
//         from: "me",
//         text: "",
//         image: reader.result,
//         timestamp: new Date().toISOString(),
//       };

//       const updated = {
//         ...messages,
//         [activeUserId]: [...(messages[activeUserId] || []), message],
//       };

//       setMessages(updated);
//       socket.emit("sendMessage", { userId: activeUserId, message });

//       // Optional: Save to backend
//       axios.post("http://localhost:5000/api/messages", {
//         userId: activeUserId,
//         message,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       <div className="w-72 bg-white border-r p-4">
//         <h2 className="text-xl font-semibold mb-6">Messages</h2>
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setActiveUserId(user.id)}
//               className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
//                 activeUserId === user.id ? "bg-gray-200 font-semibold" : ""
//               }`}
//             >
//               <div className="bg-gray-300 rounded-full p-2">
//                 <UserCircle className="w-5 h-5 text-gray-600" />
//               </div>
//               <span>{user.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div className="p-4 border-b bg-white shadow-sm">
//           <h3 className="text-lg font-medium">
//             Chat with{" "}
//             <span className="text-blue-600">
//               {users.find((u) => u.id === activeUserId)?.name}
//             </span>
//           </h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-3">
//           {(messages[activeUserId] || []).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-[60%] p-3 rounded-lg text-sm ${
//                 msg.from === "me"
//                   ? "ml-auto bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {msg.image && (
//                 <img
//                   src={msg.image}
//                   alt="uploaded"
//                   className="rounded mb-2 max-w-full"
//                 />
//               )}
//               {msg.text}
//               <div className="text-xs mt-1 text-gray-300">
//                 {new Date(msg.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           ))}
//           {isTyping && (
//             <div className="text-sm text-gray-500 italic mt-2">
//               {users.find((u) => u.id === activeUserId)?.name} is typing...
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-white">
//           <div className="flex items-center gap-3">
//             {/* File Upload */}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="file-upload"
//               onChange={handleFileUpload}
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer text-gray-500 hover:text-gray-700"
//             >
//               📎
//             </label>

//             {/* Emoji Picker toggle */}
//             <button
//               onClick={() => setShowEmoji(!showEmoji)}
//               className="text-xl"
//             >
//               😀
//             </button>

//             {/* Message input */}
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => {
//                 setNewMessage(e.target.value);
//                 setIsTyping(true);
//                 clearTimeout(typingTimeout);
//                 const timeout = setTimeout(() => setIsTyping(false), 1000);
//                 setTypingTimeout(timeout);
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             >
//               Send
//             </button>
//           </div>

//           {showEmoji && (
//             <div className="mt-2">
//               <Picker
//                 data={data}
//                 onEmojiSelect={(emoji) =>
//                   setNewMessage((prev) => prev + emoji.native)
//                 }
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;



import React, { useState, useEffect } from "react";
import { UserCircle, Plus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Messages = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Keerthi" },
    { id: 2, name: "Sathya" },
    { id: 3, name: "Vishnu" },
  ]);

  const [newUserName, setNewUserName] = useState("");
  const [activeUserId, setActiveUserId] = useState(1);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    socket.on("newMessage", ({ userId, message }) => {
      setMessages((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), message],
      }));
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleAddUser = () => {
    if (!newUserName.trim()) return;

    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, name: newUserName.trim() };
    setUsers([...users, newUser]);
    setNewUserName("");
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message = {
      from: "me",
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updated = {
      ...messages,
      [activeUserId]: [...(messages[activeUserId] || []), message],
    };

    setMessages(updated);
    setNewMessage("");
    setIsTyping(false);

    socket.emit("sendMessage", { userId: activeUserId, message });

    try {
      await axios.post("http://localhost:5000/api/messages", {
        userId: activeUserId,
        message,
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const message = {
        from: "me",
        text: "",
        image: reader.result,
        timestamp: new Date().toISOString(),
      };

      const updated = {
        ...messages,
        [activeUserId]: [...(messages[activeUserId] || []), message],
      };

      setMessages(updated);
      socket.emit("sendMessage", { userId: activeUserId, message });

      axios.post("http://localhost:5000/api/messages", {
        userId: activeUserId,
        message,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>

        {/* Add new user */}
        <div className="flex items-center mb-4 gap-2">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="New person..."
            className="flex-1 px-2 py-1 border rounded text-sm"
          />
          <button
            onClick={handleAddUser}
            className="p-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
            title="Add"
          >
            <Plus size={16} />
          </button>
        </div>

        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setActiveUserId(user.id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
                activeUserId === user.id ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              <UserCircle className="w-6 h-6 text-gray-600" />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area (same as before) */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4 border-b bg-white shadow-sm">
          <h3 className="text-lg font-medium">
            Chat with{" "}
            <span className="text-blue-600">
              {users.find((u) => u.id === activeUserId)?.name}
            </span>
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {(messages[activeUserId] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[60%] p-3 rounded-lg text-sm ${
                msg.from === "me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="rounded mb-2 max-w-full"
                />
              )}
              {msg.text}
              <div className="text-xs mt-1 text-gray-300">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-sm text-gray-500 italic mt-2">
              {users.find((u) => u.id === activeUserId)?.name} is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              📎
            </label>

            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-xl"
            >
              😀
            </button>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setIsTyping(true);
                clearTimeout(typingTimeout);
                const timeout = setTimeout(() => setIsTyping(false), 1000);
                setTypingTimeout(timeout);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>

          {showEmoji && (
            <div className="mt-2">
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setNewMessage((prev) => prev + emoji.native)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
