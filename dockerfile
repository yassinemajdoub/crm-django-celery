FROM node:18

USER root

WORKDIR /app
# Copy package.json first to leverage Docker caching
COPY . ./app

COPY package.json /app
# Install npm dependencies
RUN npm install

# # Create a non-root user
# RUN useradd -m -r -u 1001 nodeuser

# # Set proper permissions for npm cache directory
# RUN mkdir /.npm && chown -R nodeuser:nodeuser /.npm
# RUN chown -R nodeuser:nodeuser /app
# RUN sudo chown -R 1000920000:0 "/.npm"

CMD ["npm", "run", "dev"]
