# Use an official Node.js runtime as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, including the MongoDB client
RUN npm install mongodb

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# # Copy .env file to the working directory
# COPY .env .


# Expose the port on which your Node.js application will run
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
