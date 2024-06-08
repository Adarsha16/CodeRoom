FROM node:latest
WORKDIR /home/hackerman/Code/CodeRoom
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm","run","dev" ]