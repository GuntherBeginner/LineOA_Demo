const axios = require("axios"); //ตัวส่ง package
const qs = require("qs");

const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
};

exports.reply = async (token, payload) => {
  const response = await axios({
    method: "post",
    url: "https://api.line.me/v2/bot/message/reply",
    headers: LINE_HEADER, // Line ต้องมี headers
    data: { replyToken: token, messages: payload },
  });
};

exports.getImageBinary = async (messageId) => {
  const originalImage = await axios({
    method: "get",
    headers: LINE_HEADER,
    url: `https://api-data.line.me/v2/bot/message/${messageId}/content`,
    responseType: "arraybuffer",
  });
  return originalImage.data;
};

exports.showLoadingAnimation = async (userId) => {
  const response = await axios({
    method: "post",
    url: "https://api.line.me/v2/bot/chat/loading/start",
    headers: LINE_HEADER,
    data: { chatId: userId, loadingSeconds: 60 },
  });
};

exports.geminiWithMyData = async (message) => {
  const response = await axios.get("https://wutthipong.info/info.json");
  let information = await response.data;

  information = JSON.stringify(information);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "สวัสดี ฉันอยากสอบถามเกี่ยวกับ อ.เณร",
        },
        {
          role: "model",
          parts:
            "Yes, I am อ.เณร. I will answer the question using the text below. Respond with only the text provided.\nText: " +
            information,
        },
      ],
      generationConfig: {
        maxOutputTokens: 5000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return response.text();
  } catch (error) {
    return error.message;
  }
};
