pipeline {
    agent any
    // tools {
    //     jdk 'JDK17'
    // }
    environment {
        BACKEND_DIR = "server"
        FRONTEND_DIR = "client"
        DOCKER_IMAGE_BACK = "khalidedaoudi/eshop-back"
        DOCKER_IMAGE_FRONT = "khalidedaoudi/eshop-front"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/khalid21456/E-shopping.git/'
            }
        }

        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    
                    docker.image('maven:3.9.3-eclipse-temurin-17').inside {
                        sh "chmod +x mvnw"
                sh "./mvnw test"
            }
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    
                    sh "./mvnw test"
                    docker.image('maven:3.9.3-eclipse-temurin-17').inside {
                        sh "chmod +x mvnw"
                sh "./mvnw test"
            }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh "npm test -- --watchAll=false"
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'antik') {
                        sh "docker build -t ${DOCKER_IMAGE_BACK}:latest ${BACKEND_DIR}"
                        sh "docker push ${DOCKER_IMAGE_BACK}:latest"

                        sh "docker build -t ${DOCKER_IMAGE_FRONT}:latest ${FRONTEND_DIR}"
                        sh "docker push ${DOCKER_IMAGE_FRONT}:latest"
                    }
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         sshagent(['server-ssh-credentials-id']) {
        //             sh """
        //                 ssh user@your-server "
        //                 docker pull ${DOCKER_IMAGE_BACK}:latest &&
        //                 docker pull ${DOCKER_IMAGE_FRONT}:latest &&
        //                 docker-compose -f /path/to/docker-compose.yml up -d"
        //             """
        //         }
        //     }
        // }
    }
}
