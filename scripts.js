const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const themeToggle = document.getElementById("theme-toggle");

const API_URL = "https://rcrahulkumar--claude-codesigner-backend-docker.hf.space/chat";

// Add message to chat
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send user message
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) throw new Error("Backend error: " + res.status);

    const data = await res.json();
    addMessage("assistant", data.response || "⚠️ Empty response");
  } catch (err) {
    console.error(err);
    addMessage("assistant", "❌ Error connecting to backend");
  }
}

// Events
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
