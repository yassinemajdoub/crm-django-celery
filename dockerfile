# Use the official Node.js image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY . .

# Specify the port used by the Next.js development server (optional)
ENV PORT=3000

# Expose the port used by the Next.js development server (optional)
EXPOSE 3000
