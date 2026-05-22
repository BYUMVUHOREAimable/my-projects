import React from "react";
import Card from "../components/Cards";
import achievementsData from "../data/achievementsData";

const Achievements = () => {
  const projects = achievementsData.filter((a) => a.type === "project");
  const certificates = achievementsData.filter((a) => a.type === "certificate");

  return (
    <div className="p-6 space-y-10 pt-20">
      <h1 className="text-3xl font-bold dark:text-white">🏆 Achievements & Projects</h1>

      {/* Projects Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.id} {...p} />
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div>
        <h2 className="text-2xl font-semibold my-6 dark:text-white">📜 Certificates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;