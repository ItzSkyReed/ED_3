FROM node:22-alpine3.19

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

COPY . /app/frontend/
RUN npm install
RUN npm install typescript @types/react @types/react-dom --save-dev
CMD ["npm", "start"]