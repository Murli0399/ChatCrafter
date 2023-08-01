const chatbox = document.getElementById("chatbox");
const inputField = document.getElementById("input");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", sendMessage);

async function sendMessage() {
  const user_input = inputField.value.trim();
  if (user_input === "") return;

  const response = await fetch("https://all-in-one-rle1.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: user_input }),
  });

  if (response.ok) {
    const data = await response.json();
    appendMessage("user", user_input);
    appendMessage("assistant", data.completion_text, user_input);
  } else {
    const errorMessage = "Failed to send message";
    appendMessage("error", errorMessage);
  }

  inputField.value = "";
}

function appendMessage(role, content, userQuery) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(role);
  if (role === "user") {
    messageElement.innerHTML = content;
  } else {
    if (content.length > 100) {
      messageElement.classList.add("character-limit");
    }
    if (userQuery && userQuery.toLowerCase().includes("code")) {
      messageElement.classList.add("assistant", "code");
    } else {
      messageElement.classList.add("assistant");
    }
    messageElement.textContent = content;
  }
  chatbox.appendChild(messageElement);

  // Scroll to the bottom
  chatbox.scrollTop = chatbox.scrollHeight;
}
