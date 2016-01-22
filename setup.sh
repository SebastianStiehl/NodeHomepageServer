#!/bin/bash

sudo apt-get -y update
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git
sudo apt-get install -y npm

git clone https://github.com/SebastianStiehl/NodeHomepageServer.git /var/www/NodeHomepageServer
cd  /var/www/NodeHomepageServer
cp ./etc/init/node-homepage-server.conf /etc/init/node-homepage-server.conf
npm install

start node-homepage-server
