import {
    blackImg,
    blueImg,
    freefireVideo,
    fortniteVideo,
    valorantVideo,
    pubgVideo,
    lolVideo,
    whiteImg,
    yellowImg,
    webImg,
    mobileImg,
    backendImg,
    creatorImg,
    supportImg,
    widegamesImg,
    deliveryImg,
    paymentsImg,
    friendlyUIImg,
    discountImg,
  } from "../utils";
  
  export const navLists = ["", "GiftCards" ,"Games", "Softwares", "Valorant Accounts"];

  export const services = [
    {
      title: "Instant Delivery",
      icon: webImg,
    },
    {
      title: "Secure Payments",
      icon: mobileImg,
    },
    {
      title: "Wide Game Selection",
      icon: backendImg,
    },
    {
      title: "24/7 Support",
      icon: creatorImg,
    },
  ];

  export const aboutus = [
    {
      title: "24/7 Support",
      // company_name: "Starbucks",
      icon: supportImg,
      iconBg: "#383E56",
      points: [
        "Our dedicated customer support team is available around the clock to assist you with any issues or inquiries.",
      ],
    },
    {
      title: "Wide Game Selection",
      // company_name: "Tesla",
      icon: widegamesImg,
      iconBg: "#E6DEDD",
      points: [
        "Purchase points for a variety of popular games, all in one place.",
      ],
    },
    {
      title: "Secure Payments",
      // company_name: "Shopify",
      icon: paymentsImg,
      iconBg: "#383E56",
      date: "Jan 2022 - Jan 2023",
      points: [
        "Enjoy safe and reliable transactions with multiple payment options to suit your needs.",
      ],
    },
    {
      title: "Instant Delivery",
      // company_name: "Meta",
      icon: deliveryImg,
      iconBg: "#E6DEDD",
      points: [
        "Get your in-game points delivered instantly after purchase, ensuring a seamless gaming experience.",
      ],
    },
    {
      title: "Exclusive Discounts",
      // company_name: "Meta",
      icon: discountImg,
      iconBg: "#E6DEDD",
      points: [
        "Take advantage of special promotions and discounts on game points, making your purchases more affordable.",
      ],
    },
    {
      title: "User-Friendly Interface",
      // company_name: "Meta",
      icon: friendlyUIImg,
      iconBg: "#E6DEDD",
      points: [
        "Enjoy a smooth, easy-to-navigate store designed to make your shopping experience quick and hassle-free.",
      ],
    },
  ];

  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Valorant.",
        "Tactical precision.",
        "Clutch or kick.",
      ],
      video: valorantVideo,
      videoDuration: 4,
    },
    {
      id: 2,
      textLists: ["Free Fire.","Survive and fight.",
      "Be the last one standing.",],
      video: freefireVideo,
      videoDuration: 3.5,
    },
    {
      id: 3,
      textLists: [
        "FortNite.",
        "Drop in. Build up.",
      "Victory Royale awaits.",
      ],
      video: fortniteVideo,
      videoDuration: 5.5,
    },
    {
      id: 4,
      textLists: [
        "League of Legends.",
        "Legends will rise.",
      "Push to victory.",],
      video: lolVideo,
      videoDuration: 6.6,
    },
    {
      id: 5,
      textLists: [
        "Pubg Mobile.",
        "Land, loot, survive.",
      "Winner Winner Chicken Dinner.",],
      video: pubgVideo,
      videoDuration: 5,
    },
  ];
  
  export const models = [
    {
      id: 1,
      title: "iPhone 15 Pro in Natural Titanium",
      color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
      img: yellowImg,
    },
    {
      id: 2,
      title: "iPhone 15 Pro in Blue Titanium",
      color: ["#53596E", "#6395ff", "#21242e"],
      img: blueImg,
    },
    {
      id: 3,
      title: "iPhone 15 Pro in White Titanium",
      color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
      img: whiteImg,
    },
    {
      id: 4,
      title: "iPhone 15 Pro in Black Titanium",
      color: ["#454749", "#3b3b3b", "#181819"],
      img: blackImg,
    },
  ];
  
  export const sizes = [
    { label: '6.1"', value: "small" },
    { label: '6.7"', value: "large" },
  ];
  
  export const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
  ];