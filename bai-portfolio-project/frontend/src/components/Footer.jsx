// frontend/src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  FaHeart, 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaFacebook, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaCode,
  FaRocket
} from "react-icons/fa";
import { SiReact, SiThreedotjs, SiFramer, SiTailwindcss } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 backdrop-blur-md text-gray-300 relative z-10 border-t border-gray-700/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <FaCode className="text-blue-400" />
              </motion.div>
              BYUMVUHORE Aimable
            </motion.h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Full-Stack Developer specializing in secure, scalable, and innovative web solutions. 
              Passionate about creating digital experiences that make a difference.
            </p>
            <motion.div
              className="flex justify-center md:justify-start space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                { icon: FaGithub, href: "https://github.com/BYUMVUHOREAimable", color: "hover:text-white", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/byumvuhore-aimable-55a37b334/", color: "hover:text-blue-400", label: "LinkedIn" },
                { icon: FaFacebook, href: "https://web.facebook.com/byumvuhore.aimable", color: "hover:text-blue-500", label: "Facebook" },
                { icon: FaYoutube, href: "https://www.youtube.com/@BAISHOWS", color: "hover:text-red-500", label: "YouTube" },
                { icon: FaEnvelope, href: "mailto:byumvuhore.aimable@gmail.com", color: "hover:text-green-400", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-full hover:bg-gray-800/50`}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  title={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <FaRocket className="text-purple-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Skills", href: "/skills" },
                { label: "Projects", href: "/achievements" },
                { label: "Contact", href: "/contact" },
                { label: "Resume", href: "/resume" }
              ].map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-green-400" />
              Get in Touch
            </h3>
            <div className="space-y-3">
              <motion.div
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:byumvuhore.aimable@gmail.com" className="hover:text-white transition-colors">
                  byumvuhore.aimable@gmail.com
                </a>
              </motion.div>
              <motion.div
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-green-400" />
                <a href="tel:+250796004898" className="hover:text-white transition-colors">
                  +250 796 004 898
                </a>
              </motion.div>
              <motion.div
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaMapMarkerAlt className="text-red-400" />
                <span>Kigali, Rwanda</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          className="border-t border-gray-700/50 pt-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Built with Modern Technologies
          </h3>
          <div className="flex justify-center items-center space-x-6 flex-wrap">
            {[
              { icon: SiReact, name: "React", color: "text-cyan-400" },
              { icon: SiThreedotjs, name: "Three.js", color: "text-gray-300" },
              { icon: SiFramer, name: "Framer Motion", color: "text-pink-400" },
              { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-blue-400" }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <tech.icon className={`${tech.color} text-xl`} />
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-700/50 pt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm text-gray-400 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            © {currentYear} BYUMVUHORE Aimable. Made with{" "}
            <motion.span
              className="text-red-500 inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaHeart />
            </motion.span>{" "}
            by me.
          </motion.p>
          
          <motion.p 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;