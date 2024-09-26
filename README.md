# WULS Plan

## Description

A college project that allows planners to create lesson plans for students in an easy and intuitive way, eliminating the need for extensive Excel spreadsheets.

## Running

### Docker Compose

1. Copy or download `docker-compose.yml` file
2. Edit envs in the `docker-compose.yml` file
3. Run the following command: `docker-compose up`

### Local

1. Install the dependencies: `npm install`
2. Run the following command: `npm run build && npm run preview`

### Additional Local Configuration

1. You need to look into .env file to configure api url to specify with which api you want to work. You can also do .env.local file to hold your own config which will be ignored by git.

Props to need to be configured:
- API_URL - url to api, for example 'https://boleroapi.azurewebsites.net/api'
