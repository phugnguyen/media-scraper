# Use a Node.js image with Alpine for a lightweight environment
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install OpenSSL and other necessary dependencies
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Default command for the container
CMD ["npm", "run", "dev"]
