import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiMessageSquare } from 'react-icons/fi';

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => {
      setContact(res.data.contact);
    });
  }, []);

  if (!contact) return <p className="p-8">Loading...</p>;

  const contacts = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: contact.email,
      link: `mailto:${contact.email}`,
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: contact.linkedin,
      link: contact.linkedin,
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      value: contact.github,
      link: contact.github,
    },
    {
      icon: <FiMessageSquare />,
      title: contact.whatsapp.label || 'WhatsApp',
      value: contact.whatsapp.number,
      link: `https://wa.me/${contact.whatsapp.number.replace(/\D/g, '')}`,
    },
  ];

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Heading */}
      <h1 className="text-2xl font-bold px-6 py-2 rounded-full border-2 border-orange-500 text-orange-100 bg-[#0f172a] w-fit mx-auto mb-10 shadow-md">
        Contact Me
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {contacts.map((item, idx) => (
          item.value && (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl shadow-md border border-gray-300/30 dark:border-gray-700/40 bg-white/60 dark:bg-white/5 backdrop-blur-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              <div className="text-3xl text-orange-500">{item.icon}</div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{item.value}</p>
              </div>
            </motion.a>
          )
        ))}
      </div>
    </motion.div>
  );
}
