"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

import SkillsSphere from "./SkillsSphere";

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <span className="text-blue-500">02.</span> Tech Universe
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Sphere */}
            <div className="order-2 lg:order-1">
              <SkillsSphere />
            </div>

            {/* List View */}
            <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Object.entries(portfolioData.skills).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-4 capitalize text-blue-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
