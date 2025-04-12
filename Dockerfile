## Use an official Node.js runtime as a parent image
FROM node:latest
#
## Set the working directory to /app
WORKDIR /usr/src/app
#
## Copy the current directory contents into the container at /app
COPY . .

## Install any needed packages
RUN npm i
#
## Make port 3000 available to the world outside this container
EXPOSE 4173

## Define the command to run your app
CMD ["npm", "run", "preview"]


