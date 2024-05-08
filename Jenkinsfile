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
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Update the image in the deployment YAML file
                    def imageName = "daniaahmed182/devops:${env.BUILD_NUMBER}"
                    bat "sed -i 's|daniaahmed182/devops:latest|${imageName}|' ./backend-deployment.yaml"
                    bat "sed -i 's|daniaahmed182/devops:latest|${imageName}|' ./backend-service.yaml"
                    // Apply the deployment
                    withCredentials([file(credentialsId: 'kubernetes', variable: 'KUBECONFIG')]) {
                    bat 'kubectl apply -f ./backend-deployment.yaml'
                    bat 'kubectl apply -f ./backend-service.yaml'
}
                }
            }
        }
}
}
