# Use the official Node.js 16 image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080
# Set the PORT environment variable
ENV PORT=8080

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app
CMD ["npm", "start"]

# Note: Ensure that your application is set up to use the SQLite file 
# from the mounted Fly.io volume (e.g., /data/my-database.sqlite)
