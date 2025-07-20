const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// ✅ Your backend API endpoint
const API_URL = "https://rcrahulkumar--claude-codesigner-backend-docker.hf.space/chat";

// 🧠 Add chat bubble to DOM
function addMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerText = text;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 🎯 Send message to backend
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (data.response) {
      addMessage("assistant", data.response);
    } else {
      addMessage("assistant", "⚠️ No response from AI.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    addMessage("assistant", "❌ Error connecting to backend.");
  }
}

// 🎯 Send on button click
sendButton.addEventListener("click", sendMessage);

// 🎯 Send on Enter key
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
