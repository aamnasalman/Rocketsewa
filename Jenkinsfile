pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', credentialsId:'github', url:'https://github.com/aamnasalman/Rocketsewa.git'
            }
        }
        stage('Check nohup') {
            steps {
                sh 'which nohup'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "daniaahmed182/devops:latest"
                    sh "docker build -t ${imageName} ."
                }
            }
        }
    }
}
