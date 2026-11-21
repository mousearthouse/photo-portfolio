FROM node:22-alpine

WORKDIR /app

COPY photo-portfolio/package*.json ./

RUN npm ci

COPY photo-portfolio/ .

RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", "build"]