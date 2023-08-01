const chatbox = document.getElementById("chatbox");
const inputField = document.getElementById("input");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", sendMessage);

function sendMessage() {
  const user_input = inputField.value.trim();
  if (user_input === "") return;

  // Append user input
  appendMessage("user", user_input);

  fetch("https://all-in-one-rle1.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: user_input }),
  })
    .then((response) => response.json())
    .then((data) => {
      data.completion_text.forEach((response) => {
        if (response.includes("<code>") && response.includes("</code>")) {
          // Append code response wrapped in <code> tags
          appendMessage("assistant", `<code>${response}</code>`);
        } else {
          // Append non-code response
          appendMessage("assistant", response);
        }
      });
    })
    .catch((error) => {
      const errorMessage = "Failed to send message" + error;
      appendMessage("error", errorMessage);
    });

  inputField.value = "";
}
function appendMessage(role, content, userQuery) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(role);
  if (role === "user") {
    messageElement.innerHTML = content;
  } else {
    messageElement.classList.add("assistant", "code");
    messageElement.textContent = content;
  }
  chatbox.appendChild(messageElement);

  // Scroll to the bottom
  chatbox.scrollTop = chatbox.scrollHeight;
}
