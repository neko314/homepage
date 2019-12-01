FROM node:12
WORKDIR /homepage
COPY package.json package-lock.json /homepage/
RUN npm install
COPY . /homepage/
ENTRYPOINT ["npm", "run"]
CMD ["start"]
