# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]