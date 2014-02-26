# DOCKER-VERSION 0.8.1
FROM boxcar/raring
MAINTAINER Lenworth Henry <mboom@nefertitiware.com>

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y


#Install Ruby:
RUN	apt-get install -y ruby-full

#Install Ruby Gems:
RUN	apt-get install -y rubygems

#Not in default build but needed
RUN	apt-get install -y python-software-properties python g++ make #software-properties-common

#Add apt Repository for Node
RUN	add-apt-repository ppa:chris-lea/node.js

RUN apt-get update

#Install node.js
RUN	apt-get install -y nodejs

#Install yo and the generators:
RUN	npm install -g yo
RUN	npm install -g generator-webapp
RUN	npm install -g generator-angular

#Install grunt-contrib system wide
RUN	npm install grunt-contrib -g

#Install compass:
RUN	gem install compass


#INSTALL supervisor
#RUN apt-get -y install supervisor

#Bundle app source
ADD . /src
ADD start.sh /src/start.sh
RUN chmod 755 /src/start.sh

# Install app dependencies
RUN cd /src/server; npm install
RUN cd /src; npm install open
RUN cd /src; npm install

#Build app
RUN cd /src; grunt build

#Open up service port from VM
EXPOSE  3000


#Fire it up, Fire it up, Fire it up
#RUN mkdir -p /var/log/supervisor
#ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
#cmd ["supervisord", "-n"]
cmd ["node" , "/src/server/app.js"]