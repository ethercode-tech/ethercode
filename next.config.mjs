const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isDev
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=300, must-revalidate', // 5 minutos
                },
              ],
            },
          ];
        },
      }),

  // Opcional: para evitar recargas por archivos no relevantes
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: ['**/.next/**', '**/node_modules/**', '**/data/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
