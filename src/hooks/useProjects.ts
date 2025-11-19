import { useState, useEffect } from 'react';
import { fetchGitHubProjects, GitHubRepo } from '../services/github';
import { portfolioData } from '../data/portfolio';

export interface Project {
    id: string | number;
    name: string;
    description: string;
    tech: string[];
    link: string;
    github?: string;
    stars?: number;
    forks?: number;
    updatedAt?: string;
    homepage?: string;
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const repos = await fetchGitHubProjects();

                // Transform GitHub repos to Project interface
                const formattedProjects: Project[] = repos.map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || 'No description available.',
                    tech: [repo.language, ...(repo.topics || [])].filter((t): t is string => !!t), // Combine language and topics
                    link: repo.html_url,
                    github: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updatedAt: repo.updated_at,
                    homepage: repo.homepage || undefined
                }));

                // Option 1: Merge with manual portfolio data (prioritizing manual or appending?)
                // Let's append manual projects that might not be on GitHub or are special highlights if they aren't duplicates.
                // For now, let's just use the GitHub data as the source of truth for "All Projects" 
                // but maybe keep "Featured" from portfolio.ts if we want specific highlighting later.
                // The user asked to "fetch these projects", implying replacing the hardcoded list.

                setProjects(formattedProjects);
            } catch (err) {
                setError('Failed to load projects from GitHub.');
                // Fallback to static data if API fails?
                const staticProjects = portfolioData.projects.map((p, index) => ({
                    ...p,
                    id: `static-${index}`,
                    tech: p.tech,
                    link: p.link
                }));
                setProjects(staticProjects);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return { projects, loading, error };
};
