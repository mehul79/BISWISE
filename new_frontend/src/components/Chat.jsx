import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (!question.trim()) return;

    setConversation((prev) => [...prev, { sender: "user", text: question }]);

    try {
      const response = await axios.post("https://backend.topishukla.xyz/chat", { question });
      const chatbotAnswer = response.data.answer || "No response received.";

      setConversation((prev) => [...prev, { sender: "bot", text: chatbotAnswer }]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to get a response from the chatbot." },
      ]);
    }

    setQuestion("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      {isOpen ? (
        <div className="w-96 h-[30rem] bg-gradient-to-b bg-white text-black shadow-xl rounded-lg overflow-hidden border-2 border-black">
            <div className="biswise-badge bg-white text-black text-xs border-2 border-black px-4 py-2 rounded-full shadow-lg absolute -top-4 left-1/2 transform -translate-x-1/2">
          BISWISE
        </div>
          <div className="p-4 h-1/5 flex justify-between items-center "
          style={{ fontFamily: "Pixelify Sans" }}>
            <div>
              <h1 className="text-xl font-semibold"  >BISWISE CHAT BOT</h1>
              <p className="text-md">You can ask me anything you want</p>
            </div>
            <button
              className="text-black hover:text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              &#x2715;
            </button>
          </div>
          
          <div className="p-4 h-3/5 overflow-y-auto bg-[#DEDCDC] text-gray-800 scrollbar-thin scrollbar-thumb-blue-[#32CD32] scrollbar-track-gray-200 ">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-3 w-1/2 ${
                  message.sender === "user"
                    ? "bg-blue-100 text-blue-800 self-end relative left-[50%] rounded-br-xl rounded-bl-xl rounded-tl-xl"
                    : "bg-gray-100 text-gray-800 rounded-br-xl rounded-tr-xl rounded-bl-xl"
                }`}
                style={{ fontFamily: "Roboto Condensed" }}
              >
                <p className="w-[80%] text-wrap break-words">
                {message.text}

                </p>
              </div>
            ))}
          </div>
          
          <div className="p-4 h-1/5 relative bg-[#C4BABA]">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                style={{ fontFamily: "Roboto Condensed" }}
              />
              <button
                onClick={handleSend}
                className="p-3 bg-[#32CD32] text-white rounded-lg hover:bg-[#39E639] transition-colors"
                style={{ fontFamily: "Pixelify Sans" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-[#32CD32] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#39E639] transition-colors"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chat;
