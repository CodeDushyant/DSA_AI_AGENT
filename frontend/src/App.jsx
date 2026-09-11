import { useState } from "react";
import "./App.css";

function App() {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("C++");
  const [response, setResponse] = useState("");

  const analyzeProblem = () => {
    if (!problem.trim()) {
      setResponse("Please enter a DSA problem first.");
      return;
    }

    setResponse(
      `AI Analysis\n\nProblem received:\n"${problem}"\n\nApproach:\nI will analyze the problem, identify the optimal data structure and algorithm, and provide a step-by-step solution.\n\nLanguage: ${language}\n\nTime Complexity: O(n)\nSpace Complexity: O(n)\n\n🚀 AI backend will be connected here later.`
    );
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⌬</span>
          AI DSA Agent
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button className="github-btn">GitHub ↗</button>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="badge">
          ✦ AI Powered DSA Assistant
        </div>

        <h1>
          Master <span>DSA</span>
          <br />
          with AI.
        </h1>

        <p className="hero-text">
          Your intelligent coding companion for solving Data Structures
          & Algorithms problems, understanding concepts and writing better code.
        </p>

        {/* Main Card */}
        <div className="agent-card">

          <div className="card-header">
            <div>
              <h2>Ask AI DSA Agent</h2>
              <p>Paste your coding problem below</p>
            </div>

            <div className="status">
              <span></span> Online
            </div>
          </div>

          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Example: Given an array of integers, find two numbers that add up to a target..."
          />

          <div className="controls">

            <div className="language">
              <label>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>C++</option>
                <option>Java</option>
                <option>JavaScript</option>
                <option>Python</option>
              </select>
            </div>

            <button
              className="analyze-btn"
              onClick={analyzeProblem}
            >
              Analyze Problem →
            </button>

          </div>

          {/* Temporary response */}
          {response && (
            <div className="response">
              <div className="response-title">
                🤖 AI Response
              </div>

              <pre>{response}</pre>
            </div>
          )}

        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">

        <h2>Everything you need to crack DSA</h2>

        <p className="section-text">
          Learn smarter. Solve faster. Understand deeper.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Smart Analysis</h3>
            <p>
              Understand the problem and identify the right approach
              before writing code.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Optimal Solutions</h3>
            <p>
              Get optimized algorithms with proper time and space
              complexity analysis.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Learn Concepts</h3>
            <p>
              Get simple explanations, hints and step-by-step
              breakdowns of difficult problems.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Multiple Languages</h3>
            <p>
              Generate solutions in C++, Java, Python and JavaScript.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="about">
        <div className="logo">
          <span className="logo-icon">⌬</span>
          AI DSA Agent
        </div>

        <p>
          Built for developers who want to become better problem solvers.
        </p>

        <p className="copyright">
          © 2026 AI DSA Agent
        </p>
      </footer>

    </div>
  );
}

export default App;