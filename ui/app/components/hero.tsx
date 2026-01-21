import { NextPage } from "next";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  return (
    <section className="w-full bg-gray-950 py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column — Personal Introduction */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Hello, I'm
            </div>

            <h1 className="text-6xl font-bold text-white mb-3">GARV THAKRE</h1>

            <p className="text-xl text-gray-300 mb-6">Software Engineer</p>

            <p className="text-gray-400 mb-10 leading-relaxed max-w-lg">
              I design scalable backend systems with a focus on performance,
              reliability, and clean architecture.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-medium text-sm">
                View Projects
              </button>
              <button className="px-6 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-medium text-sm">
                Open API Lab
              </button>
            </div>
          </div>

          {/* Right Column — Swagger-Inspired Info Panel */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-6">
              Profile Summary
            </div>

            {/* Technical Focus Points */}
            <div className="mb-8">
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>APIs & System Design</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Databases & Caching</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">→</span>
                  <span>Real-time & Async Systems</span>
                </div>
              </div>
            </div>

            {/* Base URL */}
            <div className="mb-8 pb-8 border-b border-gray-700">
 
 
            </div>

            {/* Endpoint Buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-mono text-xs justify-center">
                <span className="font-bold">GET</span>
                <span>/profile</span>
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-medium text-xs">
                Open API Lab
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
