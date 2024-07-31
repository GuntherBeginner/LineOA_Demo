exports.text = (text) => {
  return {
    type: "text",
    text: text,
  };
};

exports.sticker = (packageId, stickerId) => {
  return {
    type: "sticker",
    packageId: packageId,
    stickerId: stickerId,
  };
};

//image เอามาจากอาจารย์
exports.image = (originalContentUrl, previewImageUrl) => {
  return {
    type: "image",
    originalContentUrl: originalContentUrl,
    previewImageUrl: previewImageUrl,
  };
};

//location เอามาจากอาจารย์
exports.location = () => {
  return {
    type: "location",
    title: "my location",
    address: "1-3 Kioicho, Chiyoda-ku, Tokyo, 102-8282, Japan",
    latitude: 35.67966,
    longitude: 139.73669,
  };
};

//flex message เอามาจากอาจารย์
exports.flex = (date, data) => {
  return {
    type: "flex",
    altText: "Flex Message",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: date,
            weight: "bold",
            color: "#1DB446",
            size: "sm",
          },
          {
            type: "text",
            text: "Latest Price",
            weight: "bold",
            size: "xxl",
            margin: "md",
          },
          {
            type: "separator",
            margin: "xxl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "xxl",
            spacing: "sm",
            contents: data,
          },
        ],
      },
      styles: {
        footer: {
          separator: true,
        },
      },
    },
  };
};

//mapimage เอามาจากอาจารย์
exports.imageMap = () => {
  return {
    type: "imagemap",
    baseUrl:
      "https://wutthipong.info/wp-content/uploads/2024/03/LCC2024.png?v1",
    altText: "This is an imagemap",
    baseSize: {
      width: 1040,
      height: 1245,
    },
    actions: [
      {
        type: "message",
        area: {
          x: 358,
          y: 93,
          width: 323,
          height: 378,
        },
        text: "face",
      },
      {
        type: "uri",
        area: {
          x: 195,
          y: 515,
          width: 665,
          height: 122,
        },
        linkUri: "https://wutthipong.info",
      },
    ],
  };
};

//mapimage CAT MEME
exports.imageMapCat = () => {
  return {
    type: "imagemap",
    baseUrl: "https://m.media-amazon.com/images/I/51gk0qxOyfL.jpg?w=auto",
    altText: "This is an imagemap",
    baseSize: {
      width: 1040,
      height: 1040,
    },
    actions: [
      {
        type: "message",
        area: {
          x: 105,
          y: 59,
          width: 835,
          height: 716,
        },
        text: "face CAT",
      },
      {
        type: "message",
        area: {
          x: 92,
          y: 809,
          width: 846,
          height: 145,
        },
        text: "Hello",
      },
    ],
  };
};

exports.image = (text) => {
  const exroom =
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/4b/62/5c/loft-room-in-wooden-longhouse.jpg?w=700&h=-1&s=1";
  const showroom =
    "https://pix10.agoda.net/hotelImages/442353/3366645/ecdc387e409f93f1b4f223a53780e365.jpeg?s=414x232";
  if (text === "exroom") {
    return {
      type: "image",
      originalContentUrl: exroom,
      previewImageUrl: exroom,
    };
  } else {
    return {
      type: "image",
      originalContentUrl: showroom,
      previewImageUrl: showroom,
    };
  }
};

exports.checkIn = () => {
  return {
    type: "template",
    altText: "CheckIn",
    template: {
      type: "confirm",
      text: "คุณตรวจสอบรายการ และต้องการ Check In หรือไม",
      actions: [
        {
          type: "message",
          label: "Confirm",
          text: "Confirm",
        },
        {
          type: "message",
          label: "No",
          text: "no",
        },
      ],
    },
  };
};

exports.promotion = () => {
  return {
    type: "template",
    altText: "this is a carousel template",
    template: {
      type: "carousel",
      columns: [
        {
          thumbnailImageUrl:
            "https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/438314373.jpg?k=4ac94a8c05c5eeb593a31119d3dfa587fcc4ba6ab69c5cc4d7c6f0b37369b9ab&o=&s=1024x",
          imageBackgroundColor: "#FFFFFF",
          title: "Double Room",
          text: "ห้องพักสำหรับ 3 ท่าน (ผู้ใหญ่ 2,เด็ก 1 คน)",
          defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.agoda.com/th-th/",
          },
          actions: [
            {
              type: "postback",
              label: "Booking",
              data: "Select Double Room",
            },
            {
              type: "uri",
              label: "View detail",
              uri: "https://www.agoda.com/th-th/",
            },
          ],
        },
        {
          thumbnailImageUrl:
            "https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/480386337.jpg?k=afbcdf093769fec1cbf54b55ebe58155d83f95ffc3a2bad03aa1fea14cf874bd&o=&s=1024x",
          imageBackgroundColor: "#000000",
          title: "Famiry Room",
          text: "ห้องพักสำหรับ 6 ท่าน (ผู้ใหญ่ 4,เด็ก 2 คน)",
          defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.agoda.com/th-th/",
          },
          actions: [
            {
              type: "postback",
              label: "Booking",
              data: "Select Famiry Room",
            },
            {
              type: "uri",
              label: "View detail",
              uri: "https://www.agoda.com/th-th/",
            },
          ],
        },
      ],
      imageAspectRatio: "rectangle",
      imageSize: "cover",
    },
  };
};
