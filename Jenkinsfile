pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER     = 'tanuri123'
        BACKEND_IMAGE       = "${DOCKER_HUB_USER}/cuppies:backend"
        FRONTEND_IMAGE      = "${DOCKER_HUB_USER}/cuppies:frontend"
        EC2_USER            = 'ubuntu'
        EC2_HOST            = credentials('ec2-host-ip')          // Secret text
        SSH_KEY             = credentials('ec2-ssh-key')          // SSH private key (file)
    }
    
    stages {
        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        
                        echo "Building and pushing backend..."
                        docker build -t ${BACKEND_IMAGE} ./backend
                        docker push ${BACKEND_IMAGE}
                        
                        echo "Building and pushing frontend..."
                        docker build -t ${FRONTEND_IMAGE} ./frontend
                        docker push ${FRONTEND_IMAGE}
                    '''
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    string(credentialsId: 'ec2-host-ip', variable: 'EC2_HOST')
                ]) {
                    sh '''
                        echo "Deploying to EC2 -> ${EC2_HOST}"
                        
                        ssh -i "${SSH_KEY}" \
                            -o StrictHostKeyChecking=no \
                            -o UserKnownHostsFile=/dev/null \
                            ${EC2_USER}@${EC2_HOST} \
                            DOCKER_USER="${DOCKER_USER}" \
                            DOCKER_PASS="${DOCKER_PASS}" \
                            BACKEND_IMAGE="${BACKEND_IMAGE}" \
                            FRONTEND_IMAGE="${FRONTEND_IMAGE}" \
                            bash -s << 'END_REMOTE_SCRIPT'
                        
                        set -e  # exit on error
                        
                        cd /home/ubuntu/cuppies || { echo "Directory /home/ubuntu/cuppies not found"; exit 1; }
                        
                        echo "Pulling latest code from main..."
                        git pull origin main
                        
                        echo "Logging into Docker Hub on remote..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        
                        echo "Pulling latest images..."
                        docker pull "$BACKEND_IMAGE"
                        docker pull "$FRONTEND_IMAGE"
                        
                        echo "Stopping and removing existing containers..."
                        docker compose down --remove-orphans || true
                        
                        echo "Starting services..."
                        docker compose up -d --remove-orphans
                        
                        echo "Waiting for services to become healthy..."
                        sleep 12
                        
                        echo "Container status:"
                        docker compose ps
                        
                        echo "Recent logs (last 15 lines):"
                        docker compose logs --tail=15
                        
                        echo "Deployment finished successfully ✓"
                        
                    END_REMOTE_SCRIPT
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Build & Deploy stage completed'
        }
        success {
            echo '✅ Deployment Succeeded!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}