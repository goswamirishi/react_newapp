import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import SampleJson from './sample.json'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        try {
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false)

        props.setProgress(100)

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-line
    }, []);

    const fetchMoreData = async () => {
        // this.setState({ page: page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles?.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
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
