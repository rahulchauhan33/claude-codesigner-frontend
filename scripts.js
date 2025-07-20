const backendUrl = "https://rcrahulkumar--claude-codesigner-backend.hf.space/chat";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Show user message
  const userMsgEl = document.createElement("div");
  userMsgEl.className = "message user";
  userMsgEl.textContent = userMessage;
  chatBox.appendChild(userMsgEl);

  // Clear input
  input.value = "";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Show bot message
    const botMsgEl = document.createElement("div");
    botMsgEl.className = "message bot";
    botMsgEl.textContent = data.reply || "No response";
    chatBox.appendChild(botMsgEl);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    const errorEl = document.createElement("div");
    errorEl.className = "message bot";
    errorEl.textContent = "⚠️ Error: Could not connect to backend.";
    chatBox.appendChild(errorEl);
  }
}
