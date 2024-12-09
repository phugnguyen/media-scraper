# Use a development Node.js image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema (if applicable)
COPY prisma ./prisma
RUN npx prisma generate

# Expose port 3000 for the development server
EXPOSE 3000

# Default command for the development environment
CMD ["npm", "run", "dev"]
