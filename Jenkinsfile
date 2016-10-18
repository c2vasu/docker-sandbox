node {
    stage 'Setup the environment'
    gitRepoUrl = 'https://github.com/c2vasu/docker-sandbox.git'

    imagename = "nexus.ana.corp.aviva.com:8443/sandbox-app"
    env.BUILD_TARGET = imagename + ":" + env.BRANCH_NAME + "-" + env.BUILD_NUMBER
    env.TAG_LATEST = imagename + ":latest"

    imagename2 = "nexus.ana.corp.aviva.com:8443/sandbox-nginx"
    env.BUILD_TARGET2 = imagename2 + ":latest"

    stage 'Checkout sourcecode'
    checkout([$class: 'GitSCM', branches: [[name: env.BRANCH_NAME]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: gitRepoUrl]]])

/*
Do not change anything before this line
*/
    stage 'Build web Image'
    sh 'docker build -t ${BUILD_TARGET} docker-nginx-node-mongodb/app/'
    stage 'push web Image'
    sh 'docker push ${BUILD_TARGET}'

    stage 'Build nginx Image'
    sh 'docker build -t ${BUILD_TARGET2} docker-nginx-node-mongodb/proxy/'
    stage 'push nginx Image'
    sh 'docker push ${BUILD_TARGET2}'

 if (env.BRANCH_NAME =='master') {
        stage 'on master branch'
        sh 'docker tag ${BUILD_TARGET} ${TAG_LATEST}'
        sh 'docker push ${TAG_LATEST}'
    }
}
