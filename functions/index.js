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
            await line.showLoadingAnimation(userId);
            await line.reply(replyToken, [
              template.image("exroom"),
              template.text(
                "PROMOTION\nDouble Room : 2 Person\nPrice (-50%) : 1,000 $ (จาก 2,000 $)"
              ),
            ]);
          } else if (event.message.text.toLowerCase() == "flex") {
            await line.showLoadingAnimation(userId);
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
          } else if (event.message.text.toLowerCase() == "hi") {
            await line.showLoadingAnimation(userId);
            await line.reply(replyToken, [template.text("สวัสดีค่ะ")]);
          } else if (event.message.text.toLowerCase() == "Flex") {
            await line.showLoadingAnimation(userId);
            await line.reply(replyToken, [template.promotion()]);
          } else if (event.message.text === "รูปภาพ") {
            await line.showLoadingAnimation(userId);
            await line.reply(replyToken, [template.imageMapCat()]);
          } else if (event.message.text === "รูปภาพ 2") {
            await line.showLoadingAnimation(userId);
            await line.reply(replyToken, [template.imageMap()]);
          } else if (event.message.text === "ราคา") {
            const response = await axios.get(
              "http://www.thaigold.info/RealTimeDataV2/gtdata_.txt"
            );

            let information = await response.data;
            console.log(information);

            let data = [];
            let name = "";
            let bid = "";

            let item = null;
            //loop information
            for (let i = 0; i < information.length; i++) {
              name = information[i].name;
              bid = information[i].bid;

              if (bid != "") {
                item = {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: name,
                      size: "sm",
                      color: "#555555",
                      flex: 0,
                    },
                    {
                      type: "text",
                      text: bid
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      size: "sm",
                      color: "#111111",
                      align: "end",
                    },
                  ],
                };
                if (name != "Update") {
                  data.push(item);
                }
              }
            }

            data.push({ type: "separator", margin: "xxl" });
            date = new Date().toLocaleString("th-TH", {
              timeZone: "Asia/Bangkok",
            });

            await line.reply(replyToken, [template.flex(date, data)]);
          } else {
            // const message = await gemini.chat(event.message.text);
            // await line.reply(replyToken, [template.text(message)]); ใช้ตอบทุกเรื่อง
            await line.showLoadingAnimation(userId);
            const message = await gemini.chatWithOwnData(event.message.text);
            await line.reply(replyToken, [template.text(message)]);
          }
        } else if (event.message.type === "image") {
          await line.showLoadingAnimation(userId);
          const imageBinary = await line.getImageBinary(event.message.id); //แปลง Binary
          const image = await gemini.multimodal(imageBinary); // เรียกใช้ function และเก็บค่า
          await line.reply(replyToken, [template.text(image)]); // โชว์ผลลัพธ์ของ image
        }
      // else if (event.message.text.toLowerCase() == "สอบถามระบบ") {
      //   const message = await gemini.chatWithOwnData(event.message.text);
      //   console.log(message);
      //   await line.reply(replyToken, [template.text(message)]);
      // } ef สำหรับกรณีเลือกต้องการคุยกับ AI
    }
  }
  return response.end();
});

// type เป็นภาพ if else ใช้ event.message.type === "image"
// type เป็น text แปลงตัวอักษรเป็นพิมพ์เล็ก event.message.text.toLowerCase() == "สอบถามระบบ"
// type เป็น text ตัวอักษรปกติ event.message.text == "สอบถามระบบ"
// var imageURL = "https://wutthipong.info/wp-content/uploads/2024/03/LCC2024.png?v1"
// var imageURL2 = "https://m.media-amazon.com/images/I/51gk0qxOyfL.jpg?w=auto"
