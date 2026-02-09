#!/bin/bash
# Simple cloud-init script to install Docker and Docker Compose on Ubuntu
set -eux

# Update and install prerequisites
apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io

# Install docker-compose (v2 as plugin)
apt-get install -y docker-compose-plugin

# Allow the ubuntu user to use docker
usermod -aG docker ubuntu || true

# Create app directory
mkdir -p /home/ubuntu/cuppies
chown -R ubuntu:ubuntu /home/ubuntu/cuppies

# Enable docker on boot
systemctl enable docker

# Done
echo "cloud-init done"
