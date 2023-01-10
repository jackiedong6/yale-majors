# Base image used
FROM node:alpine
# Installing project dependencies

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000
# Running default command
CMD ["npm", "start"]
