FROM node:20-alpine
WORKDIR /app
RUN npm install -g @angular/cli@17
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/vplus/server/server.mjs"]