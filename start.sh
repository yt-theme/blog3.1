#!/bin/bash

# systemd method
# [Unit]
# Description=blog3
# Wants=network.target
# [Service]
# Type=forking
# ExecStart=/home/yt/pro/blog3/blog3.0/start.sh
# [Install]
# WantedBy=multi-uer.target

#1
# project path
cd /home/stu/pro/blog3/blog3.0/


#2
# change to normal user
su stu

#3
# start project method
pm2 start index.js