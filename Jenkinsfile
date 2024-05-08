pipeline{
    agent any
    stages{
        stage('Checkout SCM'){
            steps{
                git branch: 'main', credentialsId:'github', url:'https://github.com/aamnasalman/Rocketsewa.git'
            }
        }
        // stage('Build Docker Image'){
        //     steps{
        //         script{
        //             def imageName = 
        //         }
        //     }
        // }
    }
}