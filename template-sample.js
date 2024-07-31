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

exports.image = (originalContentUrl, previewImageUrl) => {
  return {
    type: "image",
    originalContentUrl: originalContentUrl,
    previewImageUrl: previewImageUrl,
  };
};

exports.location = () => {
  return {
    type: "location",
    title: "my location",
    address: "1-3 Kioicho, Chiyoda-ku, Tokyo, 102-8282, Japan",
    latitude: 35.67966,
    longitude: 139.73669,
  };
};

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
