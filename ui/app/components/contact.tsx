"use client";
import { NextPage } from "next";
import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Response {
  status: number;
  statusText: string;
  data: {
    status?: string;
    message?: string;
    error?: string;
  };
}

const Contact: NextPage = () => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme];
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        setResponse({
          status: 200,
          statusText: "OK",
          data: {
            status: "received",
            message:
              "Thanks for reaching out. I'll get back to you within 24-48 hours.",
          },
        });
      } else {
        setResponse({
          status: 400,
          statusText: "Bad Request",
          data: {
            error: "All fields are required",
          },
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(false);
    setResponse(null);
  };

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-white";
  const inputBgClass =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-300";
  const buttonClass =
    theme === "dark"
      ? "border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900"
      : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white";

  return (
    <section className={`w-full ${bgClass} py-20 px-5`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Contact
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Contact / API Request
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Send a request to the maintainer of this system.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Request Definition */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Endpoint
              </div>
              <div className="font-mono text-lg mb-2">
                <span className="text-green-400">POST</span>{" "}
                <span className="text-gray-300">/contact</span>
              </div>
              <p className="text-sm text-gray-400">
                Submit a message to initiate professional communication.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-6 mb-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Request Body
              </div>
              <div className="bg-gray-800 rounded p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                <div>
                  <span className="text-blue-400">{"{"}</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="text-green-400">"name"</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-yellow-400">string</span>
                    <span className="text-gray-400">,</span>
                  </div>
                  <div>
                    <span className="text-green-400">"email"</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-yellow-400">string</span>
                    <span className="text-gray-400">,</span>
                  </div>
                  <div>
                    <span className="text-green-400">"message"</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-yellow-400">string</span>
                  </div>
                </div>
                <div>
                  <span className="text-blue-400">{"}"}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Notes
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Used for collaboration, hiring, or technical discussions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Responses typically within 24–48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>All fields are required</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Request Execution */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                Request Execution
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {/* Name Field */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-mono">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={submitted && !response}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition disabled:opacity-50"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-mono">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={submitted && !response}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition disabled:opacity-50"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-mono">
                  message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  disabled={submitted && !response}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition resize-none disabled:opacity-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Executing..." : "Execute"}
                </button>
                {submitted && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2 border border-gray-600 text-gray-300 font-medium text-sm hover:bg-gray-700 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>

            {/* Response Panel */}
            {submitted && response && (
              <div className="border-t border-gray-800 pt-6">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Response
                </div>
                <div className="bg-gray-800 rounded p-4 font-mono text-xs">
                  <div
                    className={
                      response.status === 200
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {response.status} {response.statusText}
                  </div>
                  <div className="mt-3 text-gray-300 overflow-x-auto">
                    <div>
                      <span className="text-blue-400">{"{"}</span>
                    </div>
                    <div className="ml-4">
                      {response.data.status && (
                        <div>
                          <span className="text-green-400">"status"</span>
                          <span className="text-gray-400">:</span>{" "}
                          <span className="text-yellow-400">
                            "{response.data.status}"
                          </span>
                          <span className="text-gray-400">,</span>
                        </div>
                      )}
                      {response.data.message && (
                        <div>
                          <span className="text-green-400">"message"</span>
                          <span className="text-gray-400">:</span>{" "}
                          <span className="text-yellow-400">
                            "{response.data.message}"
                          </span>
                        </div>
                      )}
                      {response.data.error && (
                        <div>
                          <span className="text-red-400">"error"</span>
                          <span className="text-gray-400">:</span>{" "}
                          <span className="text-yellow-400">
                            "{response.data.error}"
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-blue-400">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
