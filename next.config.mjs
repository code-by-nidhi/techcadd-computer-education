/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Founder content moved into the /about/[slug] system (lib/aboutData.ts); this keeps the old URL working.
    return [{ source: "/founder", destination: "/about/founder", permanent: true }];
  },
};

export default nextConfig;
