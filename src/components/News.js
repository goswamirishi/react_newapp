import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetchWithProgress from '../hooks/useFetchWithProgress';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    
    // Custom hook for API calls with progress
    const { loading, error, fetchData } = useFetchWithProgress(props.setProgress);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        const result = await fetchData(url);
        if (result) {
            setArticles(result.articles);
            setTotalResults(result.totalResults);
        }
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-line
    }, []);

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        const result = await fetchData(url);
        if (result) {
            setArticles(articles?.concat(result.articles));
            setTotalResults(result.totalResults);
            setPage(page + 1);
        }
    };

    return (
        <>
            <h2 className='text-center mt-8' style={{ margin: '35px 0px', marginTop: '90px' }} >News Monkey - Headlines on {capitalizeFirstLetter(props.category)}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}>
                <div className='container my-2'>
                    <div className="row">
                        {articles?.length ? articles?.map(((nw, index) => {
                            return <div className="col-md-4" key={index} >
                                <NewsItem key={index} {...nw} />
                            </div>
                        })) : !loading && <h1 className='text-center'>Oops !No Data found!!</h1>}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} onClick={this.handlePrevPage} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextPage} className="btn btn-dark">Next &rarr; </button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
