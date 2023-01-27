# Base image used
FROM --platform=linux/amd64 node:lts-alpine


# Installing project dependencies

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000
ENV ECS_AVAILABLE_LOGGING_DRIVERS='["json-file","awslogs"]'

ENV app_environment=FARGATE

EXPOSE 5000
# Running default command
CMD ["npm", "start"]
