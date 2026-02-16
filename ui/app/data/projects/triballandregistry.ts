import { Project } from "../../utils/ProjectTypes";

export const tribalLandRegistryProject: Project = {
  id: "tribal-land-registry",
  badge: "BLOCKCHAIN",
  title: "Decentralized Tribal Land Registry",
  description:
    "Web3 land governance system combining blockchain immutability, AI-powered document analysis, and GPS verification to establish transparent, tamper-proof tribal land ownership records.",

  techStack: [
    "Solidity",
    "React.js",
    "Hardhat",
    "IPFS/Pinata",
    "Express.js",
    "TailwindCSS",
  ],

  features: [
    "Smart contract-based trustless verification workflow",
    "AI-OCR extraction of survey numbers and boundaries",
    "Real-time GPS coordinate tracing for field verification",
    "Automated area tolerance matching algorithm",
    "Decentralized document storage on IPFS",
  ],

  image: "/Landregisteryapp/landregistry.png",
  awards: "IIIT Naya Raipur Hackathon Runner-Up",
  links: {
    demo: "https://youtu.be/m40BFgn-Oqo",
  },
};
