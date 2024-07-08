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
