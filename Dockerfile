From node:12.7.0

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]