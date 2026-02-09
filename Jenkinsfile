pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'tanuri123'
        BACKEND_IMAGE = 'tanuri123/cuppies:backend'
        FRONTEND_IMAGE = 'tanuri123/cuppies:frontend'
        EC2_USER = 'ubuntu'
        EC2_HOST = credentials('ec2-host-ip')
        SSH_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "Logging in to Docker Hub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        echo "Building Backend Image..."
                        docker build -t $BACKEND_IMAGE ./backend
                        docker push $BACKEND_IMAGE

                        echo "Building Frontend Image..."
                        docker build -t $FRONTEND_IMAGE ./frontend
                        docker push $FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    echo "Deploying to EC2 instance..."
                    
                    # SSH into EC2 and deploy
                    ssh -i $SSH_KEY \
                        -o StrictHostKeyChecking=no \
                        -o UserKnownHostsFile=/dev/null \
                        ${EC2_USER}@${EC2_HOST} bash << 'EOF'
                    
                    cd /home/ubuntu/cuppies
                    
                    echo "Pulling latest code..."
                    git pull origin main
                    
                    echo "Logging in to Docker Hub..."
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    
                    echo "Pulling latest images..."
                    docker pull $BACKEND_IMAGE
                    docker pull $FRONTEND_IMAGE
                    
                    echo "Stopping existing containers..."
                    docker compose down || true
                    
                    echo "Starting containers with Docker Compose..."
                    docker compose up -d
                    
                    echo "Waiting for services to start..."
                    sleep 10
                    
                    echo "Checking container status..."
                    docker ps
                    
                    echo "✅ Deployment completed!"
EOF
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
}
