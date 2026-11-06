const path = require('path');
const { coursesPaused } = require('./config/course-access.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer }) {
    // Keep data available to generate existing URLs on the server, but never
    // include titles, descriptions, or lessons in downloadable browser bundles.
    if (coursesPaused && !isServer) {
      config.resolve.alias[path.resolve(__dirname, 'data/courses')] =
        path.resolve(__dirname, 'lib/pausedCourses.js');
      config.resolve.alias[path.resolve(__dirname, 'data/courses.js')] =
        path.resolve(__dirname, 'lib/pausedCourses.js');
    }
    return config;
  },
};

module.exports = nextConfig;
