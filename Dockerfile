# The Node.js image is used as the base image
FROM node:18.16

# Sets the working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install --force

# Installs Angular CLI
RUN npm install -g @angular/cli

# Copies everything over to Docker environment
COPY . .

# Builds the application
RUN ng build

# The application's default port
EXPOSE 4200

# The command that starts the app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
