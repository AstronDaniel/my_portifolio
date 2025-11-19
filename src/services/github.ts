export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    homepage: string | null;
    forks_count: number;
    fork: boolean;
}

const GITHUB_USERNAME = 'AstronDaniel';
const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CacheData {
    timestamp: number;
    data: GitHubRepo[];
}

export const fetchGitHubProjects = async (): Promise<GitHubRepo[]> => {
    // Check cache first
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { timestamp, data }: CacheData = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }
    }

    try {
        // Fetch all repos
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const rawData = await response.json();
        const data = rawData.filter((repo: GitHubRepo) => !repo.fork);

        // Save to cache
        if (typeof window !== 'undefined') {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        }

        return data;
    } catch (error) {
        console.error('Failed to fetch GitHub projects:', error);
        throw error;
    }
};

export const fetchProjectReadme = async (repoName: string): Promise<string | null> => {
    const cacheKey = `readme_v2_${repoName}`;
    // Check cache
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            console.log(`[GitHub] Serving README from cache for ${repoName} (${cached.length} bytes)`);
            return cached;
        }
    }

    try {
        console.log(`[GitHub] Fetching README for ${repoName}...`);
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.raw'
            }
        });

        if (!response.ok) {
            console.warn(`[GitHub] Failed to fetch README for ${repoName}: ${response.statusText}`);
            return null;
        }

        const content = await response.text();
        console.log(`[GitHub] Fetched README for ${repoName} (${content.length} bytes)`);

        // Cache it
        if (typeof window !== 'undefined') {
            localStorage.setItem(cacheKey, content);
        }

        return content;
    } catch (error) {
        console.error('Failed to fetch README:', error);
        return null;
    }
};
