import React from 'react'
import Head from 'next/head'
import {parse} from 'url'
import fetch from 'isomorphic-fetch'


export default class extends React.Component {
	static async getInitialProps ({req}) {
		const postId = req ? parse(req.url, true).query.id : '1788188438';
		const res = await fetch(`https://api.kinja.com/api/core/post/${postId}/full`)
		const json = await res.json()
		return json.data;
	}
	render () {
		return (<div>
			<Head>
				<meta charset="utf8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css" />
			</Head>
			<h1 dangerouslySetInnerHTML={{__html: this.props.headline}} className="lh-title"></h1>
			<div dangerouslySetInnerHTML={{__html: this.props.display}} className="lh-text"></div>
		</div>
		)
	}
}

