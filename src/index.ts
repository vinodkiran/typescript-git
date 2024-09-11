import {FlowiseGitService} from "./FlowiseGitService.js";

const git_folder = '/Users/vinodkiran/code/github/vinodkiran/flowise'
const flowiseGit = new FlowiseGitService(git_folder)
await flowiseGit.init()

console.log('Flowise Git Service :: '+ (await flowiseGit.getVersion()))
const branches = await flowiseGit.getBranches()
console.log('Current Branch :: '+ branches.currentBranch)
console.log('Branches :: '+ branches.branches)
console.log('Happy developing ✨')

