pipeline {
    agent any

    stages {
        stage('Build and Run Containers') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'client') {
                        dockerComposeDown('client_user')
                        dockerComposeDown('client_manager')
                        dockerComposeUp('client_user')
                        dockerComposeUp('client_manager')
                    } else if (env.BRANCH_NAME == 'server') {
                        dockerComposeDown('server')
                        dockerComposeDown('mariadb')
                        dockerComposeDown('mongo')
                        dockerComposeUp('mongo')
                        dockerComposeUp('mariadb')
                        dockerComposeUp('server')
                    } else if (env.BRANCH_NAME == 'develop') {
                        dockerComposeDown()
                        dockerComposeUp()
                    } else {
                        echo "Unsupported branch"
                        currentBuild.result = 'FAILURE'
                    }
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
        if (service != null) {
            sh "docker-compose up -d --build $service"
        } else {
            sh "docker-compose up -d --build"
        }
    }
}

def dockerComposeDown(service = null) {
    script {
        if (service != null) {
            sh "docker-compose down $service"
        } else {
            sh "docker-compose down"
        }
    }
}

def dockerCleanup() {
    script {
        sh 'docker system prune -af'
    }
}
