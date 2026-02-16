import { Project } from "../../utils/ProjectTypes";

export const gemLedgerProject: Project = {
  id: "gemledger",
  badge: "BLOCKCHAIN",
  title: "GemLedger: Diamond Supply Chain Tracker",
  description:
    "Blockchain-based supply chain platform providing end-to-end diamond traceability with cryptographic proof of authenticity, enabling transparent ownership transfers across mining, processing, certification, and retail stages.",

  techStack: [
    "Solidity",
    "React.js",
    "Node.js",
    "MongoDB",
    "Ethereum",
    "IPFS",
    "Hardhat",
    "ethers.js v6",
    "Express.js",
    "JWT",
  ],

  features: [
    "Immutable on-chain diamond registry via DiamondTracker smart contract",
    "Role-based access for 5 supply chain actors",
    "IPFS imageHash stored on-chain for tamper-proof document linking",
    "On-chain ownership transfer with new imageHash at every handoff",
    "Verifier role marks diamonds as certified on-chain",
    "Dual-layer persistence: Ethereum + MongoDB",
    "JWT authentication with role embedded in token payload",
  ],

  highlights: [
    "Every createDiamond and transferOwnership call writes to Ethereum",
    "diamondCount auto-increments on-chain as canonical ID source",
    "MongoDB mirrors chain state for fast off-chain querying",
    "Wallet signs all transactions server-side using PRIVATE_KEY",
    "transferOwnership updates both owner AND imageHash",
    "Contract compiled with Solidity 0.8.20, deployed via Hardhat",
  ],

  image: "/gemledger/gemledger.png",
  awards: "IIT Bhilai Fintech Hackathon Winner",
};
