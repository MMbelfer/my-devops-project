# Use a lean official Node.js image as our base.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json files.
# This step allows Docker to use a cached layer for dependencies.
COPY package*.json ./

# Install all the dependencies listed in package.json.
# This includes both production dependencies (like express and mysql2)
# and development dependencies (like jest and node-fetch).
RUN npm install

# Copy all the rest of the project files to the container.
COPY . .

# Expose the port our application will run on.
EXPOSE 3000

# The command that runs our application when the container starts.
CMD ["node", "index.js"]