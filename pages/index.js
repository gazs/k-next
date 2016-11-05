import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'


export default class extends React.Component {
	static async getInitialProps () {
		// load jezebel's post contents
		// since we already have the full post body here, we could just save it in a serviceworker and then give only that part back when requesting a single post, hmmm?
		const res = await fetch('https://api.kinja.com/api/core/feed/views/public?filtered=true&dap=true&isPersonalBlog=false&v=20160517&blog=jezebel&decorator=Default&decorator=ReadMorePlaceholder&decorator=ImagePermalink&decorator=LazyIframe&decorator=AmazonAffiliate%7Cjezebelamzn-20%7Ctrue%7Ctrue&maxReturned=28')
		const json = await res.json()
		return json.data;
	}
	render () {
		return (<div>
			<Head>
				<meta charSet="utf8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css" />
			</Head>
				{this.props.items.map(item =>
					<article key={item.post.id}>
						<h2><Link href={`/permalink?id=${item.post.id}`}><a dangerouslySetInnerHTML={{__html: item.post.headline}}></a></Link></h2>
						<p dangerouslySetInnerHTML={{__html: item.post.shortExcerpt}}></p>
					</article>
				)}
		</div>
		)
	}
}

