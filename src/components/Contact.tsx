"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-blue-500 font-mono mb-4">04. What's Next?</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h3>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities to contribute to the cosmos of technology. 
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-md font-medium transition-all duration-300"
          >
            <Mail size={20} />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
