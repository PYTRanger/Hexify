const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config({
  path: "./.env",
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

document.getElementById("btn-send").addEventListener("click", async () => {
  const prompt = document.getElementById("write-message").value;
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const conversationDiv = document.getElementById("conversation");
  conversationDiv.innerHTML += `<p><strong>User:</strong> ${prompt}</p>`;
  conversationDiv.innerHTML += `<p><strong>HEX:</strong> ${text.replace(/\n/g, "<br>")}</p>`;

  document.getElementById("write-message").value = "";
});
