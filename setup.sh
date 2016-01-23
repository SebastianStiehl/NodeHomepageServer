#!/bin/bash

sudo apt-get -y update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install git

git clone https://github.com/SebastianStiehl/NodeHomepageServer.git /var/www/NodeHomepageServer
cd  /var/www/NodeHomepageServer
npm install

cp ./etc/init/node-homepage-server.conf /etc/init/node-homepage-server.conf
start node-homepage-server
