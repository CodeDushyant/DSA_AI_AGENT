import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

import {
  Plus,
  AudioLines,
  Sparkles,
  Brain,
  Code2,
  User,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_API;

  const askQuestion = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();

    // User message immediately show
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/ask`, {
        question,
      });

      // AI response history me add
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="app-container">
      <main className="main-content">

        {/* ================= HEADER ================= */}
        <header className="main-header">
          <div className="agent-brand">
            <div className="brand-icon">
              <Brain size={18} />
            </div>

            <span>DSA AI Agent</span>
          </div>

          <div className="mode-switcher">
            <button
              onClick={() => setActiveTab("chat")}
              className={`switch-btn ${
                activeTab === "chat" ? "active" : ""
              }`}
            >
              <Sparkles size={15} />
              Chat
            </button>
          </div>

          <div className="header-right">
            <button className="github-btn">
              <span>GitHub</span>
            </button>
          </div>
        </header>

        {/* ================= MAIN AREA ================= */}
        <div className={`center-container ${hasMessages ? "chat-active" : ""}`}>

          {/* ================= WELCOME SCREEN ================= */}
          {!hasMessages && !loading && (
            <div className="welcome-section">

              <div className="welcome-icon">
                <Brain size={32} />
              </div>

              <h1 className="main-title">
                Welcome to <span>DSA AI Agent</span>
              </h1>

              <p className="subtitle">
                Your AI-powered DSA tutor, built by Dushyant.
              </p>

              <p className="description">
                Ask me anything about Data Structures & Algorithms.
              </p>

            </div>
          )}

          {/* ================= CHAT HISTORY ================= */}
          {hasMessages && (
            <div className="chat-history">

              {messages.map((message, index) => {

                /* USER MESSAGE */
                if (message.role === "user") {
                  return (
                    <div
                      className="message user-message"
                      key={index}
                    >
                      <div className="user-bubble">
                        <span>{message.content}</span>
                      </div>

                      <div className="user-avatar">
                        <User size={16} />
                      </div>
                    </div>
                  );
                }

                /* AI MESSAGE */
                return (
                  <div
                    className="message assistant-message"
                    key={index}
                  >
                    <div className="assistant-header">

                      <div className="assistant-avatar">
                        <Brain size={17} />
                      </div>

                      <div>
                        <h3>DSA AI Agent</h3>
                        <span>AI Generated Answer</span>
                      </div>

                    </div>

                    <div className="assistant-content">

                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="md-h1">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="md-h2">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="md-h3">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="md-p">
                              {children}
                            </p>
                          ),

                          ul: ({ children }) => (
                            <ul className="md-ul">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="md-ol">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="md-li">
                              {children}
                            </li>
                          ),

                          code: ({ inline, children, ...props }) => {
                            if (inline) {
                              return (
                                <code
                                  className="inline-code"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <pre className="code-block">
                                <code {...props}>
                                  {children}
                                </code>
                              </pre>
                            );
                          },

                          blockquote: ({ children }) => (
                            <blockquote className="md-blockquote">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>

                    </div>
                  </div>
                );
              })}

              {/* ================= LOADING ================= */}
              {loading && (
                <div className="message assistant-message loading-message">

                  <div className="assistant-header">

                    <div className="assistant-avatar">
                      <Brain size={17} />
                    </div>

                    <div>
                      <h3>DSA AI Agent</h3>
                      <span>Thinking...</span>
                    </div>

                  </div>

                  <div className="loading-container">

                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <span>Thinking...</span>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* ================= INPUT ================= */}
          <div
            className={`input-box-wrapper ${
              hasMessages ? "input-fixed-style" : ""
            }`}
          >
            <div className="input-row">

              <button className="circle-icon-btn">
                <Plus size={20} />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a DSA question..."
                className="chat-input"
              />

              <div className="input-actions">

                <button
                  className={`circle-icon-btn audio-btn ${
                    input.trim() ? "send-btn" : ""
                  }`}
                  onClick={askQuestion}
                  disabled={loading}
                >
                  {input.trim() ? (
                    <Code2 size={17} />
                  ) : (
                    <AudioLines size={17} />
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* ================= SUGGESTIONS ================= */}
          {!hasMessages && !loading && (
            <div className="suggestions">

              <button
                onClick={() =>
                  setInput(
                    "Explain binary search with an example"
                  )
                }
              >
                <Code2 size={15} />
                Binary Search
              </button>

              <button
                onClick={() =>
                  setInput(
                    "Explain time and space complexity"
                  )
                }
              >
                <Brain size={15} />
                Complexity
              </button>

              <button
                onClick={() =>
                  setInput("How does DFS work?")
                }
              >
                <Sparkles size={15} />
                DFS
              </button>

            </div>
          )}

          <p className="bottom-text">
            DSA AI Agent only answers Data Structures & Algorithms
            questions.
          </p>

        </div>
      </main>
    </div>
  );
}