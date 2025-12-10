import React from "react";
import { motion } from "framer-motion";

const Lanyard = ({
  name = "Your Name",
  title = "Your Title",
  avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  location = "Your Location",
  bio = "Your bio goes here",
  skills = [],
  socialLinks = {},
  theme = "dark"
}) => {
  return (
    <motion.div
      className="lanyard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="lanyard-header">
        <motion.div
          className="lanyard-avatar"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img src={avatar} alt={name} />
        </motion.div>
        <div className="lanyard-info">
          <h3 className="lanyard-name">{name}</h3>
          <p className="lanyard-title">{title}</p>
          <p className="lanyard-location">{location}</p>
        </div>
      </div>

      <div className="lanyard-bio">
        <p>{bio}</p>
      </div>

      {skills.length > 0 && (
        <div className="lanyard-skills">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="lanyard-skill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )}

      {Object.keys(socialLinks).length > 0 && (
        <div className="lanyard-social">
          {Object.entries(socialLinks).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              className="lanyard-social-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              title={platform}
            >
              {platform === 'github' && '🐙'}
              {platform === 'linkedin' && '💼'}
              {platform === 'twitter' && '🐦'}
              {platform === 'email' && '✉️'}
              {!['github', 'linkedin', 'twitter', 'email'].includes(platform) && platform}
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Lanyard;
