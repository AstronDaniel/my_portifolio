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
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Sort projects: Featured (stars > 0) first, then by updated date
  const sortedProjects = [...projects].sort((a, b) => {
    const aScore = (a.stars || 0) * 2 + (a.forks || 0);
    const bScore = (b.stars || 0) * 2 + (b.forks || 0);
    return bScore - aScore;
  });

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentProjects.map((project) => (
                  <div key={project.id} className="h-full">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </div>

              {/* Sci-Fi Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-mono text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    &lt; PREV_SECTOR
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-mono border rounded transition-all ${currentPage === i + 1
                          ? "border-blue-400 bg-blue-500/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                          : "border-blue-500/20 text-gray-500 hover:border-blue-500/40 hover:text-blue-400"
                          }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-mono text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    NEXT_SECTOR &gt;
                  </button>
                </div>
              )}
            </>
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
