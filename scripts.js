const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = chatInput.value;
  appendMessage("You", userMessage);
  chatInput.value = "";

  try {
   const response = await fetch("https://rcrahulkumar--claude-codesigner-backend.hf.space/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: userMessage })
});


    const data = await response.json();
    const botReply = data.response || "No response from backend";
    appendMessage("Claude", botReply);
  } catch (error) {
    appendMessage("Claude", "⚠️ Error: Could not connect
