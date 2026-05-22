// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Cards";
import logo from "../assets/logo.png";
import achievementsData from "../data/achievementsData.js";
import {
  FaGithub,
  FaFacebook,
  FaPython,
  FaReact,
  FaDocker,
  FaShieldAlt,
  FaMicrochip,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import {
  SiMongodb,
  SiPostgresql,
  SiJavascript,
  SiDjango,
  SiFlask,
  SiTailwindcss,
} from "react-icons/si";

export default function Home() {
  const projects = achievementsData.filter((a) => a.type === "project");
  const certificates = achievementsData.filter((a) => a.type === "certificate");

  return (
    <div className="mt-20 space-y-24">
      {/* 🌟 Hero Section */}
      <section
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6"
        data-aos="fade-up"
      >
        {/* Intro */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white">
            Hi, I’m{" "}
            <span className="text-blue-600 dark:text-blue-400">
              BYUMVUHORE Aimable
            </span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl text-lg leading-relaxed">
            Frontend-heavy Full-Stack Developer skilled in{" "}
            <span className="font-semibold">Cybersecurity</span>,{" "}
            <span className="font-semibold">Embedded Systems</span>, and{" "}
            <span className="font-semibold">AI Fundamentals</span>. Graduate of
            Rwanda Coding Academy — building{" "}
            <strong>secure & scalable software solutions</strong>.
          </p>

          {/* Buttons with Logos */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6 flex-wrap">
            <a
              href="https://github.com/BYUMVUHOREAimable"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-5 py-2 bg-gray-800 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-gray-900"
            >
              <FaGithub /> <span>GitHub</span>
            </a>
            <a
              href="https://web.facebook.com/byumvuhore.aimable"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-5 py-2 bg-blue-600 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-blue-700"
            >
              <FaFacebook /> <span>Facebook</span>
            </a>
            <a
              href="https://www.youtube.com/@BAISHOWS"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-5 py-2 bg-red-800 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-gray-400"
            >
              <FaYoutube /> <span>Youtube</span>
            </a>
            <a
              href="https://www.linkedin.com/in/byumvuhore-aimable-55a37b334/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-5 py-2 bg-gray-600 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-blue-700"
            >
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2 bg-green-600 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-green-700"
            >
              Hire Me
            </Link>
            <Link
              to="/resume"
              className="px-5 py-2 bg-purple-600 text-white rounded shadow transition transform duration-300 hover:scale-105 hover:bg-purple-700"
            >
              📄 Resume
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-10 md:mt-0" data-aos="zoom-in">
          <img
            src={logo}
            alt="Developer Logo"
            className="w-40 h-40 md:w-52 md:h-52 mx-auto md:mx-0 animate-pulse"
          />
        </div>
      </section>

      {/* 🌟 About Preview */}
      <section
        className="max-w-7xl mx-auto px-6 text-center md:text-left"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold mb-4 dark:text-white">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed">
          A developer blending{" "}
          <span className="font-medium">software engineering</span>,{" "}
          <span className="font-medium">embedded systems</span>,{" "}
          <span className="font-medium">cybersecurity</span>, and{" "}
          <span className="font-medium">AI fundamentals</span>. I thrive in
          dynamic environments and love building impactful, performance-driven
          applications.
        </p>
        <Link
          to="/about"
          className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded shadow transition hover:scale-105 hover:bg-blue-600"
        >
          Learn More →
        </Link>
      </section>

      {/* 🌟 Skills Highlights */}
      <section className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left dark:text-white">
          Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <FaPython className="text-yellow-500 text-3xl mb-2" /> Python
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <SiJavascript className="text-yellow-400 text-3xl mb-2" />{" "}
            JavaScript / Node.js
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <FaReact className="text-cyan-400 text-3xl mb-2" /> React + Tailwind
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <SiDjango className="text-green-700 text-3xl mb-2" /> Django / Flask
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <SiMongodb className="text-green-600 text-3xl mb-2" /> MongoDB /
            PostgreSQL
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <FaDocker className="text-blue-500 text-3xl mb-2" /> Docker & CI/CD
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-red-500 text-3xl mb-2" /> Cybersecurity
          </div>
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <FaMicrochip className="text-gray-600 text-3xl mb-2" /> Embedded
            Systems
          </div>
        </div>
        <div className="text-center md:text-left">
          <Link
            to="/skills"
            className="inline-block mt-6 px-6 py-2 bg-indigo-500 text-white rounded shadow transition hover:scale-105 hover:bg-indigo-600"
          >
            View All Skills →
          </Link>
        </div>
      </section>

      {/* 🌟 Projects Preview */}
      <section className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left dark:text-white">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p, index) => (
            <div key={p.id} data-aos="zoom-in-up" data-aos-delay={index * 200}>
              <Card {...p} />
            </div>
          ))}
        </div>
        <div className="text-center md:text-left">
          <Link
            to="/achievements"
            className="inline-block mt-8 px-6 py-2 bg-blue-500 text-white rounded shadow transition hover:scale-105 hover:bg-blue-600"
          >
            See More Projects →
          </Link>
        </div>
      </section>

      {/* 🌟 Certificates Preview */}
      <section className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left dark:text-white">
          Certificates
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.slice(0, 3).map((c, index) => (
            <div key={c.id} data-aos="fade-up" data-aos-delay={index * 200}>
              <Card {...c} />
            </div>
          ))}
        </div>
        <div className="text-center md:text-left">
          <Link
            to="/achievements"
            className="inline-block mt-8 px-6 py-2 bg-yellow-500 text-white rounded shadow transition hover:scale-105 hover:bg-yellow-600"
          >
            See More Certificates →
          </Link>
        </div>
      </section>

      {/* 🌟 Contact CTA */}
      <section
        className="max-w-7xl mx-auto px-6 text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold dark:text-white">
          Let’s work together 🤝
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
          Have a project idea or need a passionate developer on your team? I’m
          always excited to collaborate and bring secure, scalable, and elegant
          solutions to life.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded shadow transition transform duration-300 hover:scale-105 hover:bg-green-700"
        >
          Contact Me
        </Link>
      </section>
    </div>
  );
}
