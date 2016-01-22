#!/bin/bash

sudo apt-get -y update
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git
sudo apt-get install -y npm

git clone https://github.com/SebastianStiehl/NodeHomepageServer.git /var/www/NodeHomepageServer
cp /var/www/NodeHomepageServer/etc/init/node-homepage-server.conf /etc/init/node-homepage-server.conf
