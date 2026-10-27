import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Code2, ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import { PERSONAL_INFO } from '../content';

export default function GitHubSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fallback to verified local repositories if API fails or rate-limits
  const fallbackRepos = [
    {
      id: 1,
      name: 'academic-risk-prediction',
      description: 'Streamlit & Scikit-learn predictive model forecasting student academic retention using 5-fold cross-validation and SHAP explainability.',
      language: 'Python',
      stargazers_count: 4,
      html_url: `${PERSONAL_INFO.github}/academic-risk-prediction`
    },
    {
      id: 2,
      name: 'maven-market-powerbi-analysis',
      description: 'Power BI executive sales dashboard with Star Schema data modeling, DAX KPI calculations, and Power Query ETL workflows.',
      language: 'DAX / Power BI',
      stargazers_count: 3,
      html_url: `${PERSONAL_INFO.github}/maven-market-powerbi-analysis`
    },
    {
      id: 3,
      name: 'fake-news-nlp-classification',
      description: 'Supervised NLP pipeline utilizing TF-IDF vectorization and NLTK for misleading article detection and evaluation.',
      language: 'Python',
      stargazers_count: 5,
      html_url: `${PERSONAL_INFO.github}/fake-news-nlp-classification`
    }
  ];

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error('Failed to fetch from GitHub API');
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
          } else {
            setRepos(fallbackRepos);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setRepos(fallbackRepos);
          setLoading(false);
        }
      }
    }

    fetchRepos();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="github" className="py-16 relative bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>GITHUB REPOSITORIES</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            OPEN SOURCE WORK
          </div>
        </div>

        {/* Main Card Container */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-book border border-black/15 p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/15">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#222B31] text-white flex items-center justify-center shadow-sm">
                <Github className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                  CODE REPOSITORIES
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1C1512]">
                  Repositories &bull; @{PERSONAL_INFO.githubUsername}
                </h3>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#222B31] hover:bg-black text-[#FAF6EF] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm w-fit min-h-[44px]"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4 text-[#22D3EE]" />
            </a>
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {repos.slice(0, 3).map((repo) => (
              <div
                key={repo.id}
                className="p-5 rounded-xl bg-white border border-black/15 flex flex-col justify-between shadow-xs hover:border-[#222B31] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#7E9387] mb-2 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#3F6253]" />
                      <span>{repo.language || 'Python'}</span>
                    </span>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-[#FFB020]">
                        <Star className="w-3 h-3 fill-[#FFB020]" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                    )}
                  </div>

                  <div className="font-mono font-extrabold text-sm sm:text-base text-[#1C1512] group-hover:text-[#3F6253] transition-colors truncate">
                    {repo.name}
                  </div>

                  <p className="font-serif text-xs sm:text-sm text-[#53453E] leading-relaxed mt-2 line-clamp-3">
                    {repo.description || "Data analysis and machine learning pipeline repository."}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold">
                  <a
                    href={repo.html_url || `${PERSONAL_INFO.github}/${repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#222B31] hover:text-[#3F6253] flex items-center gap-1 transition-colors"
                  >
                    <span>View Repository</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <span className="text-[10px] text-[#7E9387]">PUBLIC</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-3 border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span className="text-[#3F6253]">
              {error ? "LOCAL REPOSITORY ARCHIVE" : "GITHUB REPOSITORIES"}
            </span>
            <span className="text-[#7E9387]">github.com/{PERSONAL_INFO.githubUsername}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
