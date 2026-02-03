"use client";
import { NextPage } from "next";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  validity: string;
  skills: string[];
  verificationUrl?: string;
}

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
}

const certificationsData: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    year: "2024",
    validity: "2024 – 2027",
    skills: ["AWS", "Cloud Architecture", "Networking", "IAM"],
    verificationUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "cert-2",
    name: "Kubernetes Application Developer (CKAD)",
    issuer: "Linux Foundation",
    year: "2023",
    validity: "2023 – 2026",
    skills: ["Kubernetes", "Container Orchestration", "DevOps"],
    verificationUrl: "https://www.cncf.io/certification/ckad/",
  },
  {
    id: "cert-3",
    name: "PostgreSQL Certified Associate",
    issuer: "PostgreSQL Association",
    year: "2023",
    validity: "2023 – 2026",
    skills: ["PostgreSQL", "Database Design", "Performance Tuning"],
    verificationUrl: "https://www.postgresqlassociate.com",
  },
  {
    id: "cert-4",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Linux Foundation",
    year: "2022",
    validity: "2022 – 2025",
    skills: ["Kubernetes", "Cluster Management", "Security"],
    verificationUrl: "https://www.cncf.io/certification/cka/",
  },
];

const awardsData: Award[] = [
  {
    id: "award-1",
    title: "Open Source Contributor Award",
    organization: "GitHub Community",
    year: "2024",
    description:
      "Recognition for significant contributions to distributed systems libraries with 5k+ stars and 200+ contributors worldwide.",
  },
  {
    id: "award-2",
    title: "Best Backend Architecture Paper",
    organization: "Systems Conference 2023",
    year: "2023",
    description:
      "Award for research paper on distributed consensus algorithms and their real-world applications in microservices.",
  },
  {
    id: "award-3",
    title: "Engineering Excellence Award",
    organization: "TechCorp Inc.",
    year: "2023",
    description:
      "Internal recognition for leading database migration project that improved system performance by 60% while maintaining zero downtime.",
  },
  {
    id: "award-4",
    title: "Top Contributor Badge",
    organization: "StackOverflow",
    year: "2022",
    description:
      "Recognition for providing comprehensive answers to 1000+ backend engineering questions with 50k+ total reputation points.",
  },
];

const Awards: NextPage = () => {
  return (
    <section className="w-full bg-gray-950 py-12 sm:py-16 md:py-20 px-4 sm:px-5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Awards & Certifications
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Recognitions and certifications validating my technical skills and
            contributions.
          </p>
        </div>

        {/* Certifications Subsection */}
        <div className="mb-16">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Certifications</h3>
            <p className="text-sm text-gray-400 mt-1">
              Industry-recognized certifications and credentials
            </p>
          </div>

          <div className="space-y-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-700"
              >
                {/* Header */}
                <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 border-b border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest border border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10 rounded flex-shrink-0 w-fit">
                      Certification
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white break-words">
                      {cert.name}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Issuer
                      </div>
                      <div className="text-sm text-gray-300">{cert.issuer}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Earned
                      </div>
                      <div className="text-sm text-gray-300">{cert.year}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Validity
                    </div>
                    <div className="text-sm text-gray-300">{cert.validity}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Skills Validated
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs text-gray-300 border border-gray-700 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {cert.verificationUrl && (
                    <div className="pt-4 border-t border-gray-800">
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                      >
                        Verify Credential →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition Subsection */}
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">
              Awards & Recognition
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              External recognition and awards from organizations and communities
            </p>
          </div>

          <div className="space-y-4">
            {awardsData.map((award) => (
              <div
                key={award.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-700"
              >
                {/* Header */}
                <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 border-b border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest border border-green-500 text-green-400 bg-green-500 bg-opacity-10 rounded flex-shrink-0 w-fit">
                      Award
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white break-words">
                      {award.title}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Organization
                      </div>
                      <div className="text-sm text-gray-300">
                        {award.organization}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Year
                      </div>
                      <div className="text-sm text-gray-300">{award.year}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Recognition
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
