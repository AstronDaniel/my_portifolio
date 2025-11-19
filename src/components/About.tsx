"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-20 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500">01.</span> About Me
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {portfolioData.personal.bio}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in building robust applications that solve real-world problems. 
              Whether it's analyzing cosmic data or optimizing network traffic, I bring a 
              scientific approach to software engineering.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm border border-gray-800 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span> <span className="text-gray-500">{`{`}</span></p>
              <p className="pl-4">
                <span className="text-blue-400">constructor</span>() <span className="text-gray-500">{`{`}</span>
              </p>
              <p className="pl-8">
                <span className="text-red-400">this</span>.name = <span className="text-green-400">"{portfolioData.personal.name}"</span>;
              </p>
              <p className="pl-8">
                <span className="text-red-400">this</span>.role = <span className="text-green-400">"{portfolioData.personal.role}"</span>;
              </p>
              <p className="pl-8">
                <span className="text-red-400">this</span>.focus = <span className="text-green-400">"Connecting Astronomy & Technology"</span>;
              </p>
              <p className="pl-4"><span className="text-gray-500">{`}`}</span></p>
              <p className="pl-4">
                <span className="text-blue-400">sayHello</span>() <span className="text-gray-500">{`{`}</span>
              </p>
              <p className="pl-8">
                <span className="text-purple-400">return</span> <span className="text-green-400">"Let's explore the cosmos through code!"</span>;
              </p>
              <p className="pl-4"><span className="text-gray-500">{`}`}</span></p>
              <p><span className="text-gray-500">{`}`}</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
