const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({
  region: "asia-southeast1",
});

const crypto = require("crypto"); // เข้ารหัสต่างๆ
const NodeCache = require("node-cache"); // เก็บ cache ชั่วคราว
const cache = new NodeCache({ stdTTL: 600 }); // 600 sec = 10 min ระยะเวลาเก็บ cashe
const template = require("./message/template");
const line = require("./utils/line");
const gemini = require("./utils/gemini");

async function checkSignature(request, response) {
  if (request.method !== "POST") {
    return response.status(200).send("Method Not Allowed");
  } else {
    const signature = crypto
      .createHmac("sha256", process.env.LINE_CHANNEL_SECRET)
      .update(JSON.stringify(request.body))
      .digest("base64");

    if (signature !== request.headers["x-line-signature"]) {
      return response.status(401).send("Unauthorized");
    }
  }
} //ตรวจสอบความปลอดภัย

exports.webhook = onRequest(async (request, response) => {
  await checkSignature(request, response); // เช็คตรวจสอบ ว่าเรียกใช้จาก line จริงๆ หรือเปล่า

  const events = request.body.events;
  console.log(events);

  //ใช้ loop เพื่อนำ events มาใส่ใน array เพื่อได้ทุกๆ events ที่ user ป้อนเข้ามา และตอบให้ครบ
  for (const event of events) {
    var userId = event.source.userId;
    var replyToken = event.replyToken;
    switch (event.type) {
      case "message":
        if (event.message.type === "text") {
          if (event.message.text.toLowerCase() == "promotion") {
            await line.reply(replyToken, [
              template.image("exroom"),
              template.text(
                "PROMOTION\nDouble Room : 2 Person\nPrice (-50%) : 1,000 $ (จาก 2,000 $)"
              ),
            ]);
          } else if (event.message.text.toLowerCase() == "check in") {
            await line.reply(replyToken, [
              template.text("Booking : EX001 (Family Room)"),
              template.image("confirm"),
              template.checkIn(),
            ]);
            // รอทำ set State
            // if (event.message.text.toLowerCase() == "Confirm") {
            //   await line.reply(replyToken, [
            //     template.text("Check In. Successfuly."),
            //   ]);
            // }
          } else if (event.message.text.toLowerCase() == "room") {
            await line.reply(replyToken, [template.promotion()]);
          } else {
            const message = await gemini.chat(event.message.text);
            await line.reply(replyToken, [template.text(message)]);
          }
        } else if (event.message.type === "image") {
          await line.showLoadingAnimation(userId);
          const imageBinary = await line.getImageBinary(event.message.id);
          const image = await gemini.multimodal(imageBinary);
          await line.reply(replyToken, [template.text(image)]);
        }
    }
  }
  return response.end();
});
