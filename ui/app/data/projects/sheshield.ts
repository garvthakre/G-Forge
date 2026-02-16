import { Project } from "../../utils/ProjectTypes";
export const sheShieldProject: Project = {
  id: "sheshield",
  badge: "FULL-STACK",
  title: "SheShield - Woman Safety Platform",
  description:
    "Emergency response application featuring intelligent threat detection through continuous gesture monitoring, location-based safety zones, and instant alert dispatching to emergency contacts.",

  techStack: ["React.js", "Express.js", "MongoDB", "Twilio", "JWT", "Vite"],

  features: [
    "Whiteboard gesture recognition for discrete SOS",
    "Real-time location tracking & safe zone alerts",
    "Timer-based wellness checks with auto-escalation",
    "Twilio-powered emergency SMS broadcasting",
  ],

  image: "/Sheshield/sheshield.png",
};
