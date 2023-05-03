/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env:{
    secret: 'f722820f40920467ada1c915bc260c321adce0142fe96b12e293addf9694faea',
    NEXTAUTH_URL: "http://34.220.205.154:3000",
    basePath: '/',
    
  }
}


module.exports = nextConfig
