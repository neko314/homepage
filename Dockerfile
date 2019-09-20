FROM node:10
WORKDIR /homepage
COPY package.json package-lock.json /homepage/
RUN npm install
COPY . /homepage/
CMD ["bash"]
