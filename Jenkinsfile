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
            
            // Read the content of the files
            def deploymentContent = readFile("./backend-deployment.yaml")
            def serviceContent = readFile("./backend-service.yaml")
            
            // Perform replacements
            deploymentContent = deploymentContent.replaceAll('daniaahmed182/devops:latest', imageName)
            serviceContent = serviceContent.replaceAll('daniaahmed182/devops:latest', imageName)
            
            // Write back the modified content
            writeFile file: "./backend-deployment.yaml", text: deploymentContent
            writeFile file: "./backend-service.yaml", text: serviceContent
            
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
