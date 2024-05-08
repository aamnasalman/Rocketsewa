pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', credentialsId:'github', url:'https://github.com/aamnasalman/Rocketsewa.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "daniaahmed182/devops:${env.BUILD_NUMBER}"
                    bat "docker build -t ${imageName} ."
                }
            }
        }
         stage('Push to DockerHub') {
            steps {
                script {
                    def imageName = "daniaahmed182/devops:${env.BUILD_NUMBER}"
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                        bat "docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS docker.io"
                    }
                    bat "docker push ${imageName}"
                    bat "docker logout"
                }
            }
        }
}
