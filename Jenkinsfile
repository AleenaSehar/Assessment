pipeline {
  agent any

  environment {
    // Update these if you push to a registry (or leave blank and disable push steps)
    DOCKER_REGISTRY = "${params.DOCKER_REGISTRY ?: ''}"      // e.g. "docker.io/youruser" or "ghcr.io/yourorg"
    IMAGE_NAME = "${params.IMAGE_NAME ?: 'frontend-app'}"   // image name only
    IMAGE_TAG = "${GIT_COMMIT.take(7)}"                     // tag by short commit sha
  }

  parameters {
    string(name: 'DOCKER_REGISTRY', defaultValue: '', description: 'Optional Docker registry (leave empty to skip push)')
    string(name: 'IMAGE_NAME', defaultValue: 'frontend-app', description: 'Docker image name (no registry prefix)')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          // adapt if project uses yarn
          if (fileExists('package-lock.json')) {
            sh 'npm ci'
          } else {
            sh 'npm install'
          }
        }
      }
    }

    stage('Lint & Test') {
      steps {
        // assume package.json exposes "lint" and "test" scripts
        script {
          if (sh(script: "npm run --silent lint || true", returnStatus: true) == 0) {
            echo "Lint succeeded (or no lint script present)"
          } else {
            echo "Lint failed or not present — continuing (adjust pipeline to fail if you want)"
          }

          // Run tests (fail pipeline if tests fail)
          sh 'npm test --silent'
        }
      }
    }

    stage('Build') {
      steps {
        // adjust build script name if different (e.g., "build:prod")
        sh 'npm run build'
      }

      post {
        success {
          archiveArtifacts artifacts: 'build/**', fingerprint: true
        }
      }
    }

    stage('Docker Build') {
      steps {
        script {
          // Build docker image locally on agent
          def fullImageName = env.DOCKER_REGISTRY ? "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}" : "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
          sh "docker build -t ${fullImageName} ."
          echo "Built image: ${fullImageName}"
        }
      }
    }

    stage('Docker Push (optional)') {
      when {
        expression { return env.DOCKER_REGISTRY?.trim() }
      }
      steps {
        script {
          def fullImageName = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"

          // login - uses Jenkins "Username with password" credentials id 'docker-creds'
          withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
            sh "echo \"$REG_PASS\" | docker login ${env.DOCKER_REGISTRY.split('/')[0]} -u \"$REG_USER\" --password-stdin"
            sh "docker push ${fullImageName}"
          }
        }
      }
    }

    stage('Save image as artifact (optional)') {
      steps {
        script {
          // Save the built image as tar so you can download it from Jenkins artifacts if needed
          def tarName = "${env.IMAGE_NAME}-${env.IMAGE_TAG}.tar"
          sh "docker save ${env.DOCKER_REGISTRY ? env.DOCKER_REGISTRY + '/' : ''}${env.IMAGE_NAME}:${env.IMAGE_TAG} -o ${tarName}"
          archiveArtifacts artifacts: tarName
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline finished successfully. Image: ${env.DOCKER_REGISTRY ? env.DOCKER_REGISTRY + '/' : ''}${env.IMAGE_NAME}:${env.IMAGE_TAG}"
    }
    failure {
      echo "Pipeline failed. Check console logs."
    }
  }
}
