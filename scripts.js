const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");
const themeToggle = document.getElementById("themeToggle");

// Backend endpoint (live Hugging Face)
const backendURL = "https://rcrahulkumar--claude-codesigner-backend.hf.space";

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(text, role) {
  const msg = document.createElement("div");
  msg.classList.add("message", role);
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  appendMessage("...", "bot");

  try {
    const res = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const botMsg = data.reply || "No response from AI.";
    
    // Remove placeholder
    const lastBotMsg = chatbox.querySelector(".bot:last-child");
    lastBotMsg.remove();
    appendMessage(botMsg, "bot");

  } catch (err) {
    console.error("Error:", err);
    appendMessage("Error reaching backend!", "bot");
  }
}

// 🌙 Toggle dark/light mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const dark = !document.body.classList.contains("light-mode");
  themeToggle.textContent = dark ? "🌙" : "☀️";
});
