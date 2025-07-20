const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  userInput.disabled = true;

  try {
    const response = await fetch("https://rcrahulkumar--claude-codesigner-backend.hf.space/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessage("assistant", data.response || "No reply");
  } catch (err) {
    console.error(err);
    appendMessage("assistant", "Error: Could not connect to backend.");
  }

  userInput.disabled = false;
}

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = `${sender === "user" ? "👤" : "🤖"}: ${text}`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}
