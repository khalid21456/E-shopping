# Build stage
# FROM node:20

# WORKDIR /src
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
FROM jenkins/jenkins:lts

USER root

# Install JDK 17
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    gnupg \
    && apt-get clean

# Set JAVA_HOME for JDK 17
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Install Node.js 20 and latest npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && apt-get clean

# Switch back to Jenkins user
USER jenkins
