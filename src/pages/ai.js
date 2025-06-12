import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function AIPage() {
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAI = async (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (!msg) return;

    setAiReply("Thinking...");
    setAiLoading(true);

    try {
      const res = await fetch("/api/backendchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: msg }] }),
      });
      const data = await res.json();
      setAiReply(data.choices?.[0]?.message?.content || "No reply");
    } catch (err) {
      setAiReply("❌ Error: Failed to connect with AI.");
    }

    setAiLoading(false);
  };

  return (
    <>
      <Head>
        <title>AI Chatbot | DonAid</title>
      </Head>

      <div style={{
        padding: "40px 20px",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "'Inter', sans-serif",
      }}>
        <Link href="/">
          <a style={{
            display: "inline-block",
            marginBottom: "20px",
            color: "#6a994e",
            fontWeight: "bold",
            textDecoration: "underline",
          }}>
            ← Back to Home
          </a>
        </Link>

        <h1 style={{ fontSize: "32px", color: "#6a994e", textAlign: "center" }}>🤖 DonAid AI Chatbot</h1>

        <form onSubmit={handleAI}>
          <textarea
            name="message"
            placeholder="Ask something like 'How to donate safely?'"
            rows="5"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              fontFamily: "inherit",
              resize: "vertical",
              marginBottom: "10px"
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              backgroundColor: "#6a994e",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            {aiLoading ? "Thinking..." : "Ask AI"}
          </button>
        </form>

        {aiReply && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f0f8f4",
              borderRadius: "8px",
              border: "1px solid #b7e4c7",
              color: "#1a4d2e",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>AI:</strong> {aiReply}
          </div>
        )}
      </div>
    </>
  );
}
