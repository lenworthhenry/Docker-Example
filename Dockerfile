# DOCKER-VERSION 0.5.3
FROM ubuntu
MAINTAINER Lenworth Henry <lhenry@lawnovo.com>

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y


#Install Ruby:
RUN	apt-get install -y ruby-full

#Install Ruby Gems:
RUN	apt-get install -y rubygems

#Not in default build but needed
RUN	apt-get install -y python-software-properties python g++ make software-properties-common

#Add apt Repository for Node
RUN	add-apt-repository ppa:chris-lea/node.js

RUN apt-get update

#Install node.js
RUN	apt-get install -y nodejs=0.10.18-1chl1~precise1

#Install yo and the generators:
RUN	npm install -g yo
RUN	npm install -g generator-webapp
RUN	npm install -g generator-angular

#Install grunt-contrib system wide
RUN	npm install grunt-contrib -g

#Install compass:
RUN	gem install compass


#Install mongodb
RUN	apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
RUN	apt-get update
RUN	apt-get install -y mongodb-10gen

#Bundle app source
ADD .	/src

# Install app dependencies
RUN cd /src/server; npm install


#Open up service port from VM
EXPOSE  3000

#Run the service
CMD ["node", "/src/server/app.js"]