import { useState, useEffect } from 'react';

interface Article {
  title: string;
  pubDate: string;
  description: string;
  link: string;
}

const AllergyArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const rssUrl = 'https://community.aafa.org/blog/rss';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Kunne ikke hente data fra serveren');
        }

        const data = await response.json();
        setArticles(data.items);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Der opstod en ukendt fejl');
        }
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Henter seneste viden om allergi...</div>;
  if (error) return <div>Fejl ved indlæsning: {error}</div>;

  return (
    <div className="allergy-articles-container">
      {articles.map((article, index) => (
        <div key={index} className="article-card" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
          <h2>{article.title}</h2>
          <span style={{ fontSize: '0.8em', color: '#666' }}>
            Udgivet: {new Date(article.pubDate).toLocaleDateString()}
          </span>
          <p>
            {article.description.replace(/(<([^>]+)>)/gi, "").substring(0, 180)}...
          </p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Læs hele artiklen på originalkilden
          </a>
        </div>
      ))}
    </div>
  );
};

export default AllergyArticles;