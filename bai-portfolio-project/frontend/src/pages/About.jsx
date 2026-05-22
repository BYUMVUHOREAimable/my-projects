// frontend/src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-gray-700 dark:text-gray-200 leading-relaxed">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        👤 About Me
      </h1>

      {/* Intro */}
      <p className="mb-4">
        I’m <span className="font-semibold">Aimable Byumvuhore</span>, a{" "}
        <span className="font-medium text-blue-600 dark:text-blue-400">
          frontend‑heavy full‑stack developer
        </span>{" "}
        with a strong foundation in{" "}
        <span className="font-medium">embedded systems, cybersecurity, and AI fundamentals</span>.  
        A proud graduate of{" "}
        <span className="font-semibold">Rwanda Coding Academy</span>, I
        specialize in designing secure, scalable, and impactful applications
        that solve real‑world challenges.
      </p>

      <p className="mb-4">
        My expertise spans everything from{" "}
        <span className="font-medium">
          REST APIs, modular backend architectures, and databases
        </span>{" "}
        to building{" "}
        <span className="font-medium">modern responsive frontends</span> with modern technologies.
        I bring together{" "}
        <span className="font-medium">DevOps skills (Docker, CI/CD, AWS/Render)</span>
        with <span className="font-medium">cybersecurity practices (OWASP, TLS/SSL, Kali)</span>{" "}
        to deliver solutions that are both performant and secure.
      </p>

      <p className="mb-4">
        I also explore{" "}
        <span className="font-medium">IoT & embedded systems</span> with Arduino and Raspberry Pi, and
        integrate <span className="font-medium">ML basics</span> into real-world use cases — making
        software smarter and more impactful.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
        🚀 Mission
      </h2>
      <p className="mb-6">
        My mission is to use code as a tool to design{" "}
        <span className="font-semibold">secure, scalable, and high‑performance software</span>{" "}
        that empowers people and drives communities forward.
      </p>

      {/* Education Timeline */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">
        🎓 Education
      </h2>
      <div className="relative border-l border-gray-300 dark:border-gray-600">
        {/* RCA */}
        <div className="mb-10 ml-6">
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white dark:border-gray-800"></div>
          <time className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            2022 – 2025
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rwanda Coding Academy
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Advanced Level: Software Programming & Embedded Systems. Focused on{" "}
            <span className="font-medium">
              full-stack engineering, embedded systems, AI fundamentals, and cybersecurity
            </span>.
          </p>
        </div>

        {/* Christ-Roi */}
        <div className="mb-10 ml-6">
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white dark:border-gray-800"></div>
          <time className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            2019 – 2022
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            College du Christ‑Roi Nyanza
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            O‑Level education emphasizing math, sciences, and logical reasoning.
          </p>
        </div>

        {/* Primary */}
        <div className="mb-10 ml-6">
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white dark:border-gray-800"></div>
          <time className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            2013 – 2018
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            EP Nyakibungo
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Primary education: Early exposure to science, technology curiosity, and teamwork.
          </p>
        </div>
      </div>

      {/* Languages */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">
        🌍 Languages
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded text-center">
          English – <span className="font-semibold">Fluent</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded text-center">
          French – <span className="font-semibold">Intermediate</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded text-center">
          Kinyarwanda – <span className="font-semibold">Native</span>
        </div>
      </div>

      {/* Personal Touch */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
        💡 Personal Touch
      </h2>
      <p>
        Outside of development, you’ll likely find me{" "}
        <span className="italic">
          bike riding, cooking, sewing, video making, or enjoying movies
        </span>
        . I also enjoy contributing to open source, mentoring, and of course —
        powering all this with ☕ coffee.
      </p>
    </div>
  );
};

export default About;