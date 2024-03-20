# Use the official Node.js 20.11.1 image as base
FROM node:20.11.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5173 to the outside world
EXPOSE 5173

#  HOST environment variable to localhost
ENV HOST=0.0.0.0

# Command to run the React app in development mode with hot module reloading
CMD ["npm", "run", "dev"]
