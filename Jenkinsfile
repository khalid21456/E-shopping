node {
    // Define environment variables
    def BACKEND_DIR = "server"
    def FRONTEND_DIR = "client"
    def DOCKER_IMAGE_BACK = "khalidedaoudi/eshop-back"
    def DOCKER_IMAGE_FRONT = "khalidedaoudi/eshop-front"

    try {
        stage('Checkout') {
            git branch: 'main', url: 'https://github.com/khalid21456/E-shopping.git/'
        }

        stage('Build Backend') {
            dir(BACKEND_DIR) {
                docker.image('maven:3.9.3-eclipse-temurin-17').inside {
                    sh "chmod +x mvnw"
                    sh "./mvnw clean package -DskipTests"
                }
            }
        }

        stage('Test Backend') {
            dir(BACKEND_DIR) {
                docker.image('maven:3.9.3-eclipse-temurin-17').inside {
                    sh "chmod +x mvnw"
                    sh "./mvnw test"
                }
            }
        }

        stage('Build Frontend') {
            dir(FRONTEND_DIR) {
                docker.image('node:20').inside {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Test Frontend') {
            dir(FRONTEND_DIR) {
                docker.image('node:20').inside {
                    sh "npm test -- --watchAll=false"
                }
            }
        }

        stage('Docker Build & Push') {
            docker.withRegistry('https://registry.hub.docker.com', 'antik') {
                sh "docker build -t ${DOCKER_IMAGE_BACK}:latest ${BACKEND_DIR}"
                sh "docker push ${DOCKER_IMAGE_BACK}:latest"

                sh "docker build -t ${DOCKER_IMAGE_FRONT}:latest ${FRONTEND_DIR}"
                sh "docker push ${DOCKER_IMAGE_FRONT}:latest"
            }
        }

        // stage('Deploy') {
        //     sshagent(['server-ssh-credentials-id']) {
        //         sh """
        //             ssh user@your-server "
        //             docker pull ${DOCKER_IMAGE_BACK}:latest &&
        //             docker pull ${DOCKER_IMAGE_FRONT}:latest &&
        //             docker-compose -f /path/to/docker-compose.yml up -d"
        //         """
        //     }
        // }

    } catch (err) {
        currentBuild.result = 'FAILURE'
        throw err
    }
}
