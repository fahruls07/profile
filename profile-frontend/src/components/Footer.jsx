import React from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { logInfo } from "@/utils/logger";

export default function Footer() {
  logInfo("[FOOTER] Render Footer with social links");

  const socials = [
    { href: "mailto:fahrulsidik07@gmail.com", icon: <FaEnvelope />, label: "Email" },
    { href: "https://www.linkedin.com/in/fahrul-sidik-1433a3b7/", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://github.com/fahruls07", icon: <FaGithub />, label: "GitHub" },
    { href: "https://wa.me/6281234567890", icon: <FaWhatsapp />, label: "WhatsApp" },
  ];

  logInfo("[FOOTER] Available socials:", socials.map(s => s.label).join(", "));

  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-3">Fahrul Sidik</h3>
          <p className="text-gray-400 text-sm">
            DevOps Engineer passionate about automation, cloud infrastructure, and continuous delivery. Let's build reliable systems!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-orange-400 font-medium text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="/experience" className="hover:text-orange-400 transition">Experience</a></li>
            <li><a href="/education" className="hover:text-orange-400 transition">Education</a></li>
            <li><a href="/contact" className="hover:text-orange-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-orange-400 font-medium text-lg mb-3">Connect</h4>
          <div className="flex gap-4 text-xl">
            {socials.map((s, idx) => (
              <a key={idx} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Fahrul Sidik. All rights reserved.
      </div>
    </footer>
  );
}
