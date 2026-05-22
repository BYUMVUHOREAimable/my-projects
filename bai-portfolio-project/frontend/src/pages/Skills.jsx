// frontend/src/pages/Skills.jsx
import React from "react";
import {
  FaPython,
  FaJsSquare,
  FaJava,
  FaPhp,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLinux,
  FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDjango,
  SiFlask,
  SiSpringboot,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiAdobe,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiUnity,
  SiBlender,
  SiSwagger,
  SiJest,
  SiPostman,
  SiHeroku,
  SiRender,
  SiGitlab,
} from "react-icons/si";

// ========== ICON MAP WITH TOOLTIPS ==========
const iconMap = {
  Python: {
    icon: <FaPython className="text-yellow-500" />,
    tip: "Backend apps | Scripting | AI/ML",
  },
  "JavaScript (Node.js, React.js)": {
    icon: <FaJsSquare className="text-yellow-400" />,
    tip: "Full-stack JS | React + Node.js",
  },
  React: { icon: <FaReact className="text-cyan-400" />, tip: "Frontend UI library" },
  Node: { icon: <FaNodeJs className="text-green-500" />, tip: "Backend JS runtime" },
  "C/C++": { icon: <SiCplusplus className="text-blue-500" />, tip: "Systems & Embedded programming" },
  Java: { icon: <FaJava className="text-red-600" />, tip: "OOP | Spring Boot backend" },
  PHP: { icon: <FaPhp className="text-indigo-600" />, tip: "Server-side scripting" },
  Bash: { icon: <FaLinux className="text-gray-700" />, tip: "Linux shell scripting" },

  Docker: { icon: <FaDocker className="text-blue-500" />, tip: "App containerization" },
  AWS: { icon: <FaAws className="text-yellow-500" />, tip: "Cloud deployments" },
  Heroku: { icon: <SiHeroku className="text-indigo-400" />, tip: "Fast app hosting" },
  Render: { icon: <SiRender className="text-pink-500" />, tip: "App hosting platform" },

  PostgreSQL: { icon: <SiPostgresql className="text-sky-700" />, tip: "Relational DB" },
  MySQL: { icon: <SiMysql className="text-blue-600" />, tip: "Structured DB" },
  MongoDB: { icon: <SiMongodb className="text-green-600" />, tip: "NoSQL document DB" },
  SQLite: { icon: <FaDatabase className="text-gray-600" />, tip: "Embedded DB" },
  Redis: { icon: <SiRedis className="text-red-500" />, tip: "Cache/in-memory DB" },

  Django: { icon: <SiDjango className="text-green-700" />, tip: "Python web framework" },
  Flask: { icon: <SiFlask className="text-gray-500" />, tip: "Lightweight APIs" },
  "Spring Boot": { icon: <SiSpringboot className="text-green-500" />, tip: "Java enterprise apps" },

  "Tailwind CSS": { icon: <SiTailwindcss className="text-cyan-500" />, tip: "Utility-first CSS" },
  Bootstrap: { icon: <SiBootstrap className="text-purple-600" />, tip: "CSS UI components" },
  HTML5: { icon: <SiHtml5 className="text-orange-600" />, tip: "Web markup" },
  CSS3: { icon: <SiCss3 className="text-blue-600" />, tip: "Web styling" },
  Figma: { icon: <SiFigma className="text-pink-500" />, tip: "UI/UX design" },
  "Adobe XD": { icon: <SiAdobe className="text-red-500" />, tip: "UI prototyping" },

  "Kali Linux": { icon: <FaLinux className="text-black" />, tip: "Penetration testing OS" },

  NumPy: { icon: <SiNumpy className="text-blue-500" />, tip: "Numerical computing" },
  Pandas: { icon: <SiPandas className="text-gray-800 dark:text-white" />, tip: "Data analysis" },
  "scikit-learn": { icon: <SiScikitlearn className="text-yellow-500" />, tip: "Machine learning" },

  Unity: { icon: <SiUnity className="text-gray-700" />, tip: "Game development" },
  Blender: { icon: <SiBlender className="text-orange-500" />, tip: "3D Modeling | Animation" },

  Swagger: { icon: <SiSwagger className="text-green-500" />, tip: "API documentation" },
  Jest: { icon: <SiJest className="text-red-600" />, tip: "JS testing" },
  Postman: { icon: <SiPostman className="text-orange-500" />, tip: "API testing" },
  GitHub: { icon: <FaGitAlt className="text-orange-600" />, tip: "Version control" },
  GitLab: { icon: <SiGitlab className="text-red-600" />, tip: "CI/CD pipelines" },
};

// ========== SKILL CATEGORIES ==========
const categories = {
  Languages: ["Python", "JavaScript (Node.js, React.js)", "C/C++", "Java", "PHP", "Bash/Shell"],
  Backend: ["Django", "Flask", "Express.js", "Spring Boot", "REST APIs", "GraphQL", "JWT/OAuth2", "Microservices"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
  Frontend: ["React.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3", "Figma", "Adobe XD"],
  DevOps: ["Git/GitHub", "GitLab", "Docker", "CI/CD", "AWS", "Heroku", "Render"],
  Cybersecurity: ["Kali Linux", "Network Security", "Secure Coding (OWASP)", "TLS/SSL"],
  "Embedded Systems": ["Arduino", "Raspberry Pi", "C/C++ for embedded", "RTOS"],
  "AI & Data Science": ["NumPy", "Pandas", "scikit-learn"],
  "Creative Tech": ["Blender", "Unity", "3D Modeling"],
  "Testing & QA": ["Pytest", "Jest", "Postman", "Swagger"],
};

const Skills = () => {
  return (
    <div className="pt-20 pb-10 max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold dark:text-white mb-8">🧠 Full Skillset</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([category, skills]) => (
          <div
            key={category}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{category}</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {skills.map((skill, i) => {
                const match = Object.keys(iconMap).find((k) =>
                  skill.toLowerCase().includes(k.toLowerCase())
                );
                const entry = match ? iconMap[match] : null;
                return (
                  <li
                    key={i}
                    className="relative flex items-center space-x-2 group"
                  >
                    {/* Icon */}
                    {entry ? (
                      <span className="text-xl">{entry.icon}</span>
                    ) : (
                      <span>💡</span>
                    )}
                    <span>{skill}</span>

                    {/* Tooltip */}
                    {entry?.tip && (
                      <span className="absolute left-8 top-[-2rem] opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition bg-black text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none">
                        {entry.tip}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;