FROM node:16.10.0-buster

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  chromium \
  ffmpeg \
  wget \
  imagemagick \
  webp \

COPY package.json .
RUN npm install -g npm@8.3.0
RUN npm install -g pm2
RUN npm update
COPY . .
RUN pm2 save
CMD ["npm", "start"]
