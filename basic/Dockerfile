# DOCKER-VERSION 0.8.1
FROM boxcar/raring
MAINTAINER Lenworth Henry <lenworth.henry@gmail.com>

#Add apt Repository for Node
RUN	add-apt-repository ppa:chris-lea/node.js

RUN apt-get update

#Install node.js
RUN	apt-get install -y nodejs

# Bundle app source
ADD . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE  8080
CMD ["node", "/src/index.js"]