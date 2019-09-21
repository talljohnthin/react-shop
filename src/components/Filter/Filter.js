import React from 'react'

export default function Filter() {
    return (
        <div className="card bg-light mb-3">
            <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list" /> Categories</div>
            <ul className="list-group category_block">
                <li className="list-group-item"><a href="category.html">Cras justo odio</a></li>
                <li className="list-group-item"><a href="category.html">Dapibus ac facilisis in</a></li>
                <li className="list-group-item"><a href="category.html">Morbi leo risus</a></li>
                <li className="list-group-item"><a href="category.html">Porta ac consectetur ac</a></li>
                <li className="list-group-item"><a href="category.html">Vestibulum at eros</a></li>
            </ul>
        </div>
    )
}
