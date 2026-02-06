import React from 'react'
import { Link } from 'react-router-dom'

const NewsItem = (props) => {
    return (
        <div className="my-3">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger">{props?.source?.name}</span>
                </div>
                <img src={props?.urlToImage ? props?.urlToImage : 'http://cleantechnica.com/files/2023/08/BEV-and-PHEV-monthly-sales-in-Mexico-1.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props?.title?.slice(0, 45)}..  </h5>
                    <p className="card-text">{props?.description?.slice(0, 88)}..</p>
                    <p className="card-text"><small className="text-muted">By {props?.author ?? 'Unknown'} on {new Date(props.publishedAt).toGMTString()}</small></p>
                    <Link to={props.url} target='_blank' className="btn btn-sm btn-primary">Read more {props.index}</Link>
                </div>
            </ div>
        </div>
    )
}

export default NewsItem
