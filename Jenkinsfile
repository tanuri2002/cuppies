pipeline {
    // Use a node that has docker installed
    // If you're using docker-in-docker → agent { docker { image 'docker:27-dind' } ... }
    agent {
        label 'docker-enabled'   // ← create this label in Jenkins → Manage Nodes
        // or: agent any    // if your controller/agent already has docker + docker compose
    }

    environment {
        DOCKERHUB_REPO = 'tanuri123/cuppies'
        // Optional: DOCKER_BUILDKIT=1   (usually enabled by default now)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],   // or your branch
                    userRemoteConfigs: [[url: 'https://github.com/tanuri2002/cuppies.git']]
                    // credentialsId: 'github-token'   ← if private repo
                ])
            }
        }

        stage('Build Images') {
            steps {
                script {
                    echo "Building frontend ..."
                    sh "docker build -t ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER} ./frontend"

                    echo "Building backend ..."
                    sh "docker build -t ${DOCKERHUB_REPO}:backend-${BUILD_NUMBER} ./backend"

                    // Optional: also tag as :latest (common for dev)
                    sh "docker tag ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER} ${DOCKERHUB_REPO}:frontend-latest"
                    sh "docker tag ${DOCKERHUB_REPO}:backend-${BUILD_NUMBER} ${DOCKERHUB_REPO}:backend-latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            when { branch 'main' }   // only push on main (very common safety)
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker push ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER}
                        docker push ${DOCKERHUB_REPO}:backend-${BUILD_NUMBER}
                        docker push ${DOCKERHUB_REPO}:frontend-latest
                        docker push ${DOCKERHUB_REPO}:backend-latest
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'          // safe even if not logged in
            // Optional cleanup (be careful – removes all dangling images)
            // sh 'docker image prune -f'
        }
        success {
            echo "Build & push succeeded 🎉"
        }
        failure {
            echo "Build failed 😞"
        }
    }
}