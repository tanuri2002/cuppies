pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'tanuri123'
        BACKEND_IMAGE = 'tanuri123/cuppies:backend'
        FRONTEND_IMAGE = 'tanuri123/cuppies:frontend'
}
    }

    stages {
        stage('Pull Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "Logging in to Docker Hub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        echo "Pulling Backend Image..."
                        docker pull $BACKEND_IMAGE

                        echo "Pulling Frontend Image..."
                        docker pull $FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    echo "Stopping any existing containers..."
                    docker compose down

                    echo "Starting containers..."
                    docker compose up -d

                    echo "Waiting for containers to start..."
                    sleep 10
                    docker ps
                '''
            }
        }
    }

    post {
        failure {
            echo '❌ Deployment Failed!'
        }
        success {
            echo '✅ Deployment Succeeded!'
        }
    }

