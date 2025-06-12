// pages/chatbot.js
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ChatbotPage() {
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setTheme(savedTheme);
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [theme, history]);

  const handleAI = async (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (!msg) return;

    const userMessage = { role: "user", content: msg };
    const tempHistory = [...history, userMessage];
    setHistory(tempHistory);
    setAiReply("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/backendchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: tempHistory }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No reply";
      const botMessage = { role: "assistant", content: reply };
      setHistory([...tempHistory, botMessage]);
    } catch (err) {
      setHistory([...tempHistory, { role: "assistant", content: "❌ Error: Failed to connect with AI." }]);
    }

    setAiLoading(false);
    e.target.reset();
  };

  const exportHistory = async (type) => {
    const content = history
      .map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`)
      .join("\n\n");

    if (type === "text") {
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "chat-history.txt";
      a.click();
    } else if (type === "pdf") {
      const jsPDF = (await import("jspdf")).jsPDF;
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 10);
      doc.save("chat-history.pdf");
    }
  };

  return (
    <>
      <Head>
        <title>DonAid AI Chatbot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`container ${theme}`}>
        <div className="top-bar">
          <Link href="/" className="back-link">⬅ Back to Home</Link>
          <div className="title">🤖 DonAid AI Assistant</div>
          <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙 Toggle Mode" : "☀️ Toggle Mode"}
          </button>
        </div>

        <div className="chat-box">
          {history.map((msg, index) => (
            <div key={index} className={`bubble ${msg.role}`}>
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </div>
          ))}
          {aiLoading && (
            <div className="bubble assistant">
              <strong>AI:</strong> <span className="dots"><span>.</span><span>.</span><span>.</span></span>
            </div>
          )}
        </div>

        <form onSubmit={handleAI} className="chat-form">
          <textarea
            name="message"
            placeholder="Ask something like 'How to donate safely?'"
            rows="3"
          />
          <div className="button-row">
            <button type="submit">{aiLoading ? "Thinking..." : "Ask AI"}</button>
          </div>
        </form>

        <div className="extras-row">
          <button className="export-btn" onClick={() => exportHistory("text")}>📄 Export as Text</button>
          <button className="export-btn" onClick={() => exportHistory("pdf")}>🧾 Export as PDF</button>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
          padding: 40px 20px;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          transition: background 0.4s, color 0.4s;
        }
        .container.light {
          background: #f9f9f9;
          color: #222;
        }
        .container.dark {
          background: #1a1a1a;
          color: #e0e0e0;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .back-link {
          text-decoration: none;
          font-weight: bold;
          color: inherit;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .theme-toggle {
          font-size: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
        }

        .chat-box {
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 10px;
          background-color: rgba(200, 200, 200, 0.05);
        }

        .bubble {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 12px;
          white-space: pre-wrap;
          word-wrap: break-word;
          max-width: 90%;
        }

        .bubble.user {
          background: #d4edda;
          color: #155724;
          align-self: flex-end;
          text-align: right;
          margin-left: auto;
        }

        .container.dark .bubble.user {
          background: #2d6a4f;
          color: #b7f4cb;
        }

        .bubble.assistant {
          background: #e2e3e5;
          color: #1c1c1c;
          align-self: flex-start;
          margin-right: auto;
        }

        .container.dark .bubble.assistant {
          background: #333;
          color: #f1f1f1;
        }

        .chat-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          resize: vertical;
          background-color: inherit;
          color: inherit;
        }

        textarea::placeholder {
          color: #888;
        }
        .container.dark textarea::placeholder {
          color: #ccc;
        }

        .button-row {
          display: flex;
          justify-content: flex-end;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #6a994e;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background-color: #588e41;
        }

        .export-btn {
          background-color: #3b7dd8;
        }

        .export-btn:hover {
          background-color: #2d65b3;
        }

        .dots span {
          animation: blink 1.2s infinite;
          font-size: 18px;
        }
        .dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .extras-row {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
