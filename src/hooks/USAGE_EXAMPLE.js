import { useState, useEffect } from 'react';
import useFetchWithProgress from '../hooks/useFetchWithProgress';

// HOW TO USE THESE HOOKS:

// 1. SIMPLE EXAMPLE - No Progress
import useFetch from '../hooks/useFetch';

// const MyComponent = () => {
//     const { data, loading, error, fetchData } = useFetch();

//     useEffect(() => {
//         fetchData('https://api.example.com/data');
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;
//     return <div>{JSON.stringify(data)}</div>;
// };


// 2. ADVANCED EXAMPLE - With Progress Bar (For your News App)
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const NewsWithHook = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    // Hook with progress tracking
    const { data, loading, error, fetchData } = useFetchWithProgress(props.setProgress);

    // Fetch news on component load
    useEffect(() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        const loadNews = async () => {
            const result = await fetchData(url);
            if (result) {
                setArticles(result.articles);
                setTotalResults(result.totalResults);
            }
        };

        loadNews();
    }, [props.country, props.category]);

    // Load more articles
    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        const result = await fetchData(url);

        if (result) {
            setArticles([...articles, ...result.articles]);
            setPage(nextPage);
        }
    };

    return (
        <>
            {loading && <Spinner />}
            {error && <h2 className="text-center">Error: {error}</h2>}

            <div className="container">
                <div className="row">
                    {articles.map((article, index) => (
                        <div key={index} className="col-md-4">
                            <NewsItem {...article} />
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={fetchMoreData} disabled={loading || articles.length >= totalResults}>
                Load More
            </button>
        </>
    );
};

export default NewsWithHook;
