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
            // Use PowerShell to replace the old image name with the new one in the deployment YAML file
            (Get-Content ./backend-deployment.yaml) -replace 'daniaahmed182/devops:latest', $imageName | Set-Content ./backend-deployment.yaml
            (Get-Content ./backend-service.yaml) -replace 'daniaahmed182/devops:latest', $imageName | Set-Content ./backend-service.yaml

            // Apply the deployment using kubectl
            withCredentials([file(credentialsId: 'kubernetes', variable: 'KUBECONFIG')]) {
                // Use the KUBECONFIG environment variable to authenticate with the Kubernetes cluster
                bat 'kubectl --kubeconfig $KUBECONFIG apply -f ./backend-deployment.yaml'
                bat 'kubectl --kubeconfig $KUBECONFIG apply -f ./backend-service.yaml'
            }
        }
    }
}
}
}
