import { NextPage } from "next";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  return (
    <section className="w-full bg-gray-950 py-16 px-5">
      <div className="max-w-4xl mx-auto">
       
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">
          PORTFOLIO OVERVIEW
        </div>

      
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-100 mb-2">GARV THAKRE</h1>
          <p className="text-lg text-gray-400">Engineer</p>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-12 max-w-2xl leading-relaxed">
          Building scalable APIs, real-time systems, and production-grade
          backend services.
        </p>

        {/* Base URL Block */}
        <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Base URL
          </div>
          <code className="text-green-400 font-mono text-sm">
            https://api.garv.dev
          </code>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-mono text-sm">
            <span className="text-xs font-bold">GET</span>
            <span>/profile</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-mono text-sm">
            <span className="text-xs font-bold">GET</span>
            <span>/projects</span>
          </button>
          <button className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-mono text-sm">
            Open API Lab
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
