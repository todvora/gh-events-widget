const path = require('path')
const ghpages = require('gh-pages');

const distPath = path.join('..', 'dist');

//https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
const githubToken = process.env.GH_TOKEN
const githubRef = process.env.GH_REF
const gitUsername = process.env.GH_USERNAME
const gitEmail = process.env.GH_EMAIL
const repositoryUrl = `https://${githubToken}@${githubRef}`

const ghConfig = {
  message: 'Auto-generated update',
  repo: repositoryUrl,
  push: true,
  logger: function(message) {
    // no logs - they could display github token
  },
  user: {
      name: gitUsername,
      email: gitEmail
    }
}

ghpages.publish(distPath, ghConfig, function(err) {
  if(err) {
    console.error('Failed to deploy to Github Pages')
    // no logs - they could display github token
    // console.error(err)
  }
})
