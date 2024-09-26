/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Establece el límite de tamaño del cuerpo aquí
    },
  },
};

export default nextConfig;
