import {simpleGit, SimpleGit, SimpleGitOptions} from "simple-git";

export class FlowiseGitService {
    private gitOptions: Partial<SimpleGitOptions> = {};
    private git: SimpleGit | undefined;
    private gitFolder: string = '/Users/vinodkiran/code/github/vinodkiran/flowise';

    constructor(gitFolder?: string) {
        if (gitFolder) {
            this.gitFolder = gitFolder;
        }
    }

    async init() {
        this.gitOptions = {
            baseDir: this.gitFolder,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };
        this.git = simpleGit(this.gitOptions);
        const {installed} = await this.git.version()
        if (!installed) {
            throw new Error('Git is not installed');
        }
    }

    async getBranches(): Promise<{ branches: string[]; currentBranch: string }> {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            // Get remote branches
            const { branches } = await this.git.branch(['-r']);
            const remoteBranches = Object.keys(branches)
                .map((name) => name.split('/').slice(1).join('/'))
                .filter((name) => name !== 'HEAD');

            const { current } = await this.git.branch();

            return {
                branches: remoteBranches,
                currentBranch: current,
            };
        } catch (error) {
            throw new Error('Could not get remote branches from repository', { cause: error });
        }
    }

    async getVersion() {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        return this.git.version();
    }

}