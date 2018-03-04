#!/usr/bin/env bash

ENV=$1

sudo apt-get install awscli
aws s3 cp s3://tdc-secure/tdc-discourse-seed/secrets.$ENV.js secrets.js
yarn seed