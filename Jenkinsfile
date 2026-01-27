pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME = 'tanuri123/cuppies'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/tanuri2002/cuppies.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo 'Building Frontend Image...'
                    sh 'docker build -t $IMAGE_NAME:frontend ./frontend'
                    
                    echo 'Building Backend Image...'
                    sh 'docker build -t $IMAGE_NAME:backend ./backend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                    echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                    
                    echo 'Pushing Frontend Image...'
                    docker push $IMAGE_NAME:frontend
                    
                    echo 'Pushing Backend Image...'
                    docker push $IMAGE_NAME:backend
                    """
                }
            }
        }
    }
}
