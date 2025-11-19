import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Star, GitFork, Calendar, Code2, Info, Layers } from "lucide-react";
import { useState } from "react";
import { Project } from "@/hooks/useProjects";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "tech" | "stats">("overview");

    if (!project) return null;

    const tabs = [
        { id: "overview", label: "Overview", icon: Info },
        { id: "tech", label: "Tech Stack", icon: Layers },
        { id: "stats", label: "Stats", icon: Star },
    ] as const;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-gray-900/90 border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                    >
                        {/* Holographic/Cyber Border Effect */}
                        <div className="absolute inset-0 pointer-events-none border border-blue-400/20 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]" />

                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                                    {project.name}
                                    {project.homepage && (
                                        <a
                                            href={project.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 hover:bg-green-500/30 transition-colors"
                                        >
                                            Live
                                        </a>
                                    )}
                                </h3>
                                <p className="text-blue-400 text-sm font-mono">
                                    {project.github?.replace("https://github.com/", "")}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-white/10 bg-black/20">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === tab.id
                                            ? "text-blue-400 bg-blue-500/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === "overview" && (
                                        <div className="space-y-4">
                                            <p className="text-gray-300 leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-3 mt-6">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:border-blue-500/50 text-sm"
                                                    >
                                                        <Github size={18} />
                                                        View Source
                                                    </a>
                                                )}
                                                {project.homepage && (
                                                    <a
                                                        href={project.homepage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-900/20 text-sm"
                                                    >
                                                        <ExternalLink size={18} />
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "tech" && (
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md text-sm flex items-center gap-2"
                                                    >
                                                        <Code2 size={14} />
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "stats" && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center justify-center text-center">
                                                <Star className="text-yellow-400 mb-2" size={24} />
                                                <span className="text-2xl font-bold text-white">{project.stars || 0}</span>
                                                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Stars</span>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center justify-center text-center">
                                                <GitFork className="text-purple-400 mb-2" size={24} />
                                                <span className="text-2xl font-bold text-white">{project.forks || 0}</span>
                                                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Forks</span>
                                            </div>
                                            <div className="col-span-2 bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-4">
                                                <Calendar className="text-blue-400" size={24} />
                                                <div className="text-left">
                                                    <div className="text-sm text-gray-400">Last Updated</div>
                                                    <div className="text-white font-medium">
                                                        {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }) : 'Unknown'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
