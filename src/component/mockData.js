import imgElements1 from "../assets/iconsofcards.png";
import imgElements11 from "../assets/iconsofcard1.png";
import imgVideoReview from "../assets/videoimage.png";
const PROBLEMS_DATA = [
  {
    id: "p1",
    text: "Electricity bills keep going up due to unmanaged usage",
    icon: imgElements1,
    opacity: "opacity-100"
  },
  {
    id: "p2",
    text: "No health monitoring leads to higher repair costs",
    icon: imgElements11,
    opacity: "opacity-60"
  },
  {
    id: "p3",
    text: "Hidden electrical faults increase fire and failure risks",
    icon: null,
    opacity: "opacity-60"
  }
];
const INNOVATIONS_DATA = [
  {
    id: "inv1",
    title: "Smart Office Controller",
    category: "Commercial",
    link: "#"
  },
  {
    id: "inv2",
    title: "Centralized HVAC Manager",
    category: "Commercial",
    link: "#"
  },
  {
    id: "inv3",
    title: "Heavy Machinery Monitor",
    category: "Industrial",
    link: "#"
  },
  {
    id: "inv4",
    title: "Factory Power Optimizer",
    category: "Industrial",
    link: "#"
  },
  {
    id: "inv5",
    title: "Warehouse Lighting Automation",
    category: "Industrial",
    link: "#"
  }
];
const TESTIMONIALS_DATA = [
  {
    id: "t1",
    name: "Aman Singh",
    date: "12 Dec 2025",
    content: "I didn't want to replace my appliances, and this was exactly the solution I needed. Setup was simple and now I can control everything from my phone.",
    isVideo: false
  },
  {
    id: "t2",
    name: "Rahul Verma",
    date: "20 Dec 2025",
    content: "NirwanaGrid transformed my home into a smart home without any major renovations. The energy savings have been remarkable!",
    isVideo: false
  },
  {
    id: "t3",
    name: "Priya Sharma",
    date: "15 Jan 2026",
    content: "As a working professional, I love how I can monitor and control my home appliances remotely. It gives me peace of mind.",
    isVideo: false
  },
  {
    id: "t4",
    name: "Vikash Kumar",
    date: "22 Jan 2026",
    content: "The predictive maintenance feature saved me from a potential electrical hazard. Truly a life-saver technology!",
    isVideo: false
  },
  {
    id: "t5",
    name: "Akash Yadav",
    date: "12 Dec 2025",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  },
  {
    id: "t6",
    name: "Neha Gupta",
    date: "25 Jan 2026",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  },
  {
    id: "t7",
    name: "Sanjay Patel",
    date: "28 Jan 2026",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  },
  {
    id: "t8",
    name: "Anita Desai",
    date: "30 Jan 2026",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  },
  {
    id: "t9",
    name: "Rohit Mehta",
    date: "02 Feb 2026",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  },
  {
    id: "t10",
    name: "Kavita Joshi",
    date: "05 Feb 2026",
    content: "",
    videoThumbnail: imgVideoReview,
    isVideo: true
  }
];
export {
  INNOVATIONS_DATA,
  PROBLEMS_DATA,
  TESTIMONIALS_DATA
};
