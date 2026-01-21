"use client"
import { NextPage } from 'next'
import { useState } from 'react'

interface Project {
  id: string
  badge: 'SERVICE' | 'API' | 'SYSTEM'
  title: string
  description: string
  techStack: string[]
  features: string[]
}

const projectsData: Project[] = [
  {
    id: 'queue-system',
    badge: 'SERVICE',
    title: 'Queue Management System',
    description: 'Handles high-concurrency queue operations with atomic locking and real-time updates across distributed services.',
    techStack: ['Node.js', 'Redis', 'PostgreSQL', 'WebSocket', 'Docker'],
    features: [
      'Atomic operations using Redis locks',
      'Event-driven notifications',
      'Cursor-based pagination',
      'Structured logging & metrics'
    ]
  },
  {
    id: 'api-gateway',
    badge: 'API',
    title: 'API Gateway & Rate Limiting',
    description: 'Central entry point for microservices with intelligent routing, rate limiting, and request authentication.',
    techStack: ['Go', 'Redis', 'PostgreSQL', 'gRPC', 'Prometheus'],
    features: [
      'Token bucket rate limiting',
      'JWT authentication & refresh flows',
      'Service discovery integration',
      'Request tracing & observability'
    ]
  },
  {
    id: 'real-time-db',
    badge: 'SYSTEM',
    title: 'Real-time Data Synchronization',
    description: 'Multi-database sync engine ensuring consistency across MySQL, PostgreSQL, and MongoDB with sub-second latency.',
    techStack: ['Rust', 'Kafka', 'PostgreSQL', 'MongoDB', 'MySQL'],
    features: [
      'Change Data Capture (CDC)',
      'Conflict resolution with CRDT',
      'Dead letter queue handling',
      'Exactly-once delivery guarantee'
    ]
  },
  {
    id: 'monitoring-stack',
    badge: 'SYSTEM',
    title: 'Distributed Monitoring & Alerting',
    description: 'Centralized observability platform collecting metrics, logs, and traces from 200+ microservices.',
    techStack: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'Kubernetes'],
    features: [
      'Time-series database optimization',
      'Custom alert rule engine',
      'Log aggregation & retention',
      'Distributed tracing correlation'
    ]
  }
]

const Projects: NextPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'SERVICE':
        return 'border-green-500 text-green-400 bg-green-500 bg-opacity-10'
      case 'API':
        return 'border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10'
      case 'SYSTEM':
        return 'border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10'
      default:
        return 'border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10'
    }
  }

  return (
    <section className="w-full bg-gray-950 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Projects
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Selected Backend Projects
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Systems I've designed and built, focusing on scalability, reliability, and real-world backend problems.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-4">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-lg transition-all duration-200 hover:border-gray-700"
            >
              {/* Project Card Header */}
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full p-6 text-left hover:bg-gray-800 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(project.badge)}`}>
                      {project.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-gray-400 text-lg">
                    {expandedId === project.id ? '−' : '+'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="text-xs text-gray-400">
                  <span className="text-gray-500">Tech:</span>{' '}
                  {project.techStack.join(' · ')}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === project.id && (
                <div className="px-6 pb-6 border-t border-gray-800">
                  {/* Features List */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                      Key Features
                    </div>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start">
                          <span className="text-green-400 mr-3">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-gray-800">
                    <button className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-medium text-xs">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-medium text-xs">
                      API Docs
                    </button>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 transition font-medium text-xs">
                      Architecture
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects