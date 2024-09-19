import {ConfigValues, simpleGit, SimpleGit, SimpleGitOptions} from "simple-git";
import {DiffResult} from "simple-git";

export class FlowiseGitService {
    private gitOptions: Partial<SimpleGitOptions> = {};
    private git: SimpleGit | undefined;
    private readonly gitFolder: string = '/Users/vinodkiran/code/github/FlowiseAI/FlowiseCloud';

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
        this.git.status()
    }

    getRemoteBranches = async(): Promise<{ branches: string[] }> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            // Get remote branches
            const response = await this.git.branch(['-r']);
            const allBranches = Object.keys(response.branches)
                .map((name) => name.split('/').slice(1).join('/'))
                .filter((name) => name !== 'HEAD');

            return {
                branches: allBranches
            };
        } catch (error) {
            throw new Error('Could not get branches from repository', { cause: error });
        }
    }

    public getStatus = async(): Promise<any> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            // Get remote branches
            return this.git.status()
        } catch (error) {
            throw new Error('Could not get status from repository', { cause: error });
        }
    }

    public getCurrentBranch = async(): Promise<{ current: string }> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            // Get remote branches
            const statusResult = await this.git.status()
            return { current: statusResult.current as string }
        } catch (error) {
            throw new Error('Could not get status from repository', { cause: error });
        }
    }

    public getTrackingBranch = async(): Promise<{ tracking: string }> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            // Get remote branches
            const statusResult = await this.git.status()
            console.log(statusResult)
            return { tracking: statusResult.current as string }
        } catch (error) {
            throw new Error('Could not get status from repository', { cause: error });
        }
    }

    public getDirtyFiles = async(): Promise<{ response: DiffResult }> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            const currentBranch = await this.getCurrentBranch()
            const response = await this.git.diffSummary([currentBranch.current, '--ignore-all-space']);
            return { response }
        } catch (error) {
            throw new Error('Could not get status from repository', { cause: error });
        }
    }

    public getLocalBranches = async(): Promise<{ branches: string[] }> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            const response = await this.git.branchLocal()
            const allBranches = Object.keys(response.branches)
                .map((name) => name.split('/').slice(1).join('/'))
                .filter((name) => name !== 'HEAD');

            return {
                branches: allBranches
            };
        } catch (error) {
            throw new Error('Could not get branches from repository', { cause: error });
        }
    }

    public getRemoteURL = async(): Promise<string> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            const response = await this.getConfigValues()
            if (response) {
                return response['remote.origin.url'] as string
            }
            throw new Error('Could not get remote URL from repository');
        } catch (error) {
            throw new Error('Could not get remote URL from repository', { cause: error });
        }
    }

    public getUpstreamURL = async(): Promise<string> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            const response = await this.getConfigValues()
            if (response) {
                return response['remote.upstream.url'] as string
            }
            throw new Error('Could not get upstream URL from repository');
        } catch (error) {
            throw new Error('Could not get upstream URL from repository', { cause: error });
        }
    }

    public getConfigValues = async(): Promise<ConfigValues> => {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        try {
            const response = await this.git.listConfig()
            if (response) {
                return response.values['.git/config']
            }
            throw new Error('Could not get remote URL from repository');
        } catch (error) {
            throw new Error('Could not get remote URL from repository', { cause: error });
        }
    }

    async getVersion() {
        if (!this.git) {
            throw new Error('Git is not initialized');
        }
        console.log('Git Path :: ', this.gitFolder)
        return this.git.version();
    }

}