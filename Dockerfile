FROM node:12.7.0

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

RUN mkdir -p /home/angular/app/node_modules && chown -R node:node /home/angular/app

WORKDIR /home/angular/app

COPY package*.json ./

RUN npm install -g @angular/cli@7.3.9

RUN npm install

COPY --chown=node:node . .

EXPOSE 4200

CMD ng serve --host 0.0.0.0