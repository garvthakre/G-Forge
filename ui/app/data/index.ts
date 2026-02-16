 
import { Project } from "@/app/utils/ProjectTypes";
import { collabGPTProject } from "./projects/collabgpt";
import { campusXProject } from "./projects/campusx";
import { booleanAIProject } from "./projects/booleanai";
import { queueFlexProject } from "./projects/queueflex";
import { tribalLandRegistryProject } from "./projects/triballandregistry";
import { gemLedgerProject } from "./projects/gemledger";
import { sheShieldProject } from "./projects/sheshield";

 
export const AI_PROJECTS: Project[] = [
  collabGPTProject,
  booleanAIProject,
];

export const FULL_STACK_PROJECTS: Project[] = [
  campusXProject,
  queueFlexProject,
  sheShieldProject,
];

export const BLOCKCHAIN_PROJECTS: Project[] = [
  tribalLandRegistryProject,
  gemLedgerProject,
];
 
export const ALL_PROJECTS: Project[] = [
  collabGPTProject,
  campusXProject,
  booleanAIProject,
  queueFlexProject,
  tribalLandRegistryProject,
  gemLedgerProject,
  sheShieldProject,
];

 
/**
 * Get a project by its ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return ALL_PROJECTS.find(project => project.id === id);
};

/**
 * Get projects by badge type
 */
export const getProjectsByBadge = (badge: Project["badge"]): Project[] => {
  return ALL_PROJECTS.filter(project => project.badge === badge);
};

/**
 * Get featured projects (those with awards or live URLs)
 */
export const getFeaturedProjects = (): Project[] => {
  return ALL_PROJECTS.filter(project => project.awards || project.liveUrl);
};

/**
 * Get projects with API documentation
 */
export const getProjectsWithAPI = (): Project[] => {
  return ALL_PROJECTS.filter(project => project.apiDocumentation);
};

 
export {
  collabGPTProject,
  campusXProject,
  booleanAIProject,
  queueFlexProject,
  tribalLandRegistryProject,
  gemLedgerProject,
  sheShieldProject,
};

// Default export for convenience
export default ALL_PROJECTS;