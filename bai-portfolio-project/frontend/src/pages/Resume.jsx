import React from "react";

const Resume = () => {
  return (
    <div className="pt-20 pb-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        📄 My Resume
      </h1>

      {/* Embedded Google Docs Resume */}
      <div className="w-full h-[80vh] border-2 border-gray-300 dark:border-gray-700 rounded overflow-hidden shadow">
        <iframe
          src="https://docs.google.com/document/d/13r7vVl8OSt7AtT0v5h5LhjSSjGrNU6ut/preview"
          title="My Resume"
          className="w-full h-full"
        />
      </div>

      {/* CTA link to open new tab */}
      <div className="mt-6 text-center">
        <a
          href="https://docs.google.com/document/d/13r7vVl8OSt7AtT0v5h5LhjSSjGrNU6ut/preview"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Open in New Tab →
        </a>
      </div>
    </div>
  );
};

export default Resume;