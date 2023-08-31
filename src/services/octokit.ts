import { Octokit } from '@octokit/core'

const octokit = new Octokit({
    auth: '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',
    userAgent: "GHP-App",
})

export default octokit