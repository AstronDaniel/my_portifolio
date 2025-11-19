"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useProjects, Project } from "@/hooks/useProjects";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <span className="text-blue-500">03.</span> Stellar Projects
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-4 border border-red-500/20 rounded-lg bg-red-500/5">
              {error}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="h-full">
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
