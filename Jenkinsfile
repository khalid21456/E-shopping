pipeline {
    agent any
    tools{
        jdk 'jdk17'
        maven 'maven3'
    }
    environment {
        BACKEND_DIR = "server"
        FRONTEND_DIR = "client"
        DOCKER_IMAGE_BACK = "khalidedaoudi/eshop-back"
        DOCKER_IMAGE_FRONT = "khalidedaoudi/eshop-front"
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
        PATH = "${env.JAVA_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/khalid21456/E-shopping.git/'
            }
        }
        
        //  stage('OWASP Dependency Check'){
        //     steps{
        //         dir("${BACKEND_DIR}") {
        //             dependencyCheck additionalArguments: '--scan ./ --format HTML ', odcInstallation: 'db-check'
        //             dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        //         }
        //     }    
        // }

        stage('Sonarqube Analysis') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh ''' mvn sonar:sonar \
                        -Dsonar.host.url=http://sonarqube:9000/ \
                        -Dsonar.login=squ_c639b2979b8f6a1c00a4fc70c8dfafd7eaeaef3e'''
                }
            }
        }

        stage('Clean & Package'){
            steps{
                dir("${BACKEND_DIR}") {
                    sh "mvn clean package -DskipTests"
                }
            }
        }
        
        // stage('Docker Build & Push') {
        //     steps {
        //         script {
        //             docker.withRegistry('https://registry.hub.docker.com', 'antik') {
        //                 sh "docker build -t ${DOCKER_IMAGE_BACK}:latest ${BACKEND_DIR}"
        //                 sh "docker push ${DOCKER_IMAGE_BACK}:latest"

        //                 sh "docker build -t ${DOCKER_IMAGE_FRONT}:latest ${FRONTEND_DIR}"
        //                 sh "docker push ${DOCKER_IMAGE_FRONT}:latest"
        //             }
        //         }
        //     }
        // }

        stage("Docker Build & Push"){
            steps{
                script{
                    docker.withRegistry('', 'antik') {
                        def imageName = "eshop-back"
                        def buildTag = "${imageName}:${BUILD_NUMBER}"
                        def latestTag = "${imageName}:latest"  // Define latest tag
                        
                        sh "docker build -t ${imageName} -f server/Dockerfile"
                        sh "docker tag ${imageName} khalidedaoudi/${buildTag}"
                        sh "docker tag ${imageName} khalidedaoudi/${latestTag}"  // Tag with latest
                        sh "docker push khalidedaoudi/${buildTag}"
                        sh "docker push khalidedaoudi/${latestTag}"  // Push latest tag
                        env.BUILD_TAG = buildTag
                    }
                        
                }
            }
        }

    }
}
