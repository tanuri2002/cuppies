# Use the latest LTS version of Node.js
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' to serve the production build
RUN npm install -g serve

# Expose the port your app will run on
EXPOSE 3000

# Command to serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
