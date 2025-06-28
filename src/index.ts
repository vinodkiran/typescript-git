import {FlowiseGitService} from "./FlowiseGitService.js";

const git_folder = '/Users/vinodkiran/code/github/vinodkiran/Flowise'
// const git_folder = '/Users/vinodkiran/code/github/FlowiseAI/FlowiseCloud'
const flowiseGit = new FlowiseGitService(git_folder)
await flowiseGit.init()

console.log('Flowise Git Service :: '+ (await flowiseGit.getVersion()))

const localBranches = await flowiseGit.getLocalBranches()
console.log('Total Local Branches :: '+ localBranches.branches.length)

const remoteBranches = await flowiseGit.getRemoteBranches()
console.log('Total Remote Branches :: '+ remoteBranches.branches.length)

const currentBranch = await flowiseGit.getCurrentBranch()
console.log('Current Branch :: '+ currentBranch.current)

const trackingBranch = await flowiseGit.getTrackingBranch()
console.log('Tracking Branch :: '+ trackingBranch.tracking)

const remoteUrl = await flowiseGit.getRemoteURL()
console.log('Remote URL :: '+ remoteUrl)

const upstreamUrl = await flowiseGit.getUpstreamURL()
console.log('Upstream URL :: '+ upstreamUrl)

const dirtyFiles = await flowiseGit.getDirtyFiles()
console.log('Dirty Files :: '+ JSON.stringify(dirtyFiles.response, null, 2))

