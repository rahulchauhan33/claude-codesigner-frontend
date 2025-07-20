const backendURL = "https://rcrahulkumar--claude-codesigner-backend.hf.space"; // Replace with your Space URL

async function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const message = inputBox.value.trim();
  if (!message) return;

  appendMessage("user", message);
  inputBox.value = "";

  appendMessage("ai", "Thinking...");

  try {
    const response = await fetch(`${backendURL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }),
    });

    const result = await response.json();
    document.querySelectorAll(".ai-msg").forEach(e => e.remove());
    appendMessage("ai", result.response);
  } catch (err) {
    document.querySelectorAll(".ai-msg").forEach(e => e.remove());
    appendMessage("ai", "Error connecting to backend.");
    console.error(err);
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `${sender}-msg`;
  div.textContent = `${sender === "user" ? "🧑 You" : "🤖 Claude"}: ${text}`;
  if (sender === "ai") div.classList.add("ai-msg");
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
