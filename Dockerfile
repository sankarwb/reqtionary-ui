FROM node:12.7.0 as node

RUN npm install -g npm@6.10.2
# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD npm run build

FROM nginx:1.17.2

COPY --from=node /usr/src/app/dist/reqtionary-ui /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
