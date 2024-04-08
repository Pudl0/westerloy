#!/bin/bash

usage() {
  echo "usage: docker.sh [start|stop]"
  exit 1
}

# Start command
if [[ $1 == "start" ]]; then
  echo "Starting development environment"
  npx dotenv -e .env -- docker compose -p westerloy up -d
# Stop command
elif [[ $1 == "stop" ]]; then
  echo "Stoping development environment"
  npx dotenv -e .env -- docker compose -p westerloy down
else
  usage
fi