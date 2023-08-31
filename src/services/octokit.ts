import { Octokit } from '@octokit/core'

const octokit = new Octokit({
    auth: undefined,
    userAgent: "GHP-App",
})

export default octokit