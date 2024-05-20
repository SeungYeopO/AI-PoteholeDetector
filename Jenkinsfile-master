pipeline {
    agent any

    stages {
        stage('Build and Run Containers') {
            steps {
                script {
                    dockerComposeDown()
                    dockerComposeUp()
                }
            }
        }
    }
    
    post {
        always {
            script {
                dockerCleanup()
            }
        }
    }
}

def dockerComposeUp(service = null) {
    script {
        sh "docker-compose up -d --build"
    }
}

def dockerComposeDown(service = null) {
    script {

        sh "docker-compose down"
    }
}

def dockerCleanup() {
    script {
        sh 'docker system prune -af'
    }
}
