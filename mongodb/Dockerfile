# DOCKER-VERSION 0.8.1
FROM boxcar/raring
MAINTAINER Lenworth Henry <mboom@nefertitiware.com>

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y



#Install mongodb
RUN	apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
RUN	apt-get update
RUN	apt-get install -y mongodb-10gen


#Create the MongoDB data directory
RUN	mkdir -p /data/db

#Install redis
#RUN apt-get install redis-server

#INSTALL supervisor
#RUN apt-get -y install supervisor

VOLUME ["/data/mongodb"]
EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod"]
CMD ["--port", "27017", "--dbpath", "/data/mongodb", "--smallfiles"]

#Open up mongo port from VM
#EXPOSE	27017

#Open up redis port
#EXPOSE 6379

#Fire it up, Fire it up, Fire it up
#RUN mkdir -p /var/log/supervisor
#ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
#cmd ["supervisord", "-n"]