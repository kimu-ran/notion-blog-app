import React from "react";
import {getAllPosts, getSinglePost} from "../../lib/notionAPI";
import {createRoot} from 'react-dom/client';
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from "next/link";



export const getStaticPaths = async () => {
	const allPosts = await getAllPosts();
	const paths = allPosts.map(({ slug }) => ({ params: { slug }}));

	return {
		paths: paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({params}) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60 * 60,
  };
};

const Post = ({post}) => {
	return (
		<article className="container lg:px-2 px-5 h-screen lg:w-2/3 mx-auto my-20">
			<h1 className="text-4xl font-medium">{post.metadata.title}</h1>
			<div className="flex justify-between my-4 pb-4 border-b-4 border-b-cyan-700">
				<div className="flex gap-3">
				{post.metadata.tags.map((tag: string, index:number) => (
					<Link href={`/posts/tag/${tag.toLowerCase()}/page/1`} key={index} className="text-white bg-sky-900 py-2 px-4 rounded-xl inline-block">{tag}</Link>
				))}

				</div>
				<div className="font-sm text-gray-800">{post.metadata.date}</div>
			</div>
			<section className="pb-16">
				<div className="post-content">
				<ReactMarkdown
				components={{
					code(props) {
						const {children, className, node} = props
						const match = /language-(\w+)/.exec(className || '')
						return match ? (
							<SyntaxHighlighter
								PreTag="div"
								language={match[1]}
								style={materialDark}
							>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						) : (
							<code className={className}>
								{children}
							</code>
						);
					},
				}}
				>{post.markdown}
					</ReactMarkdown>
				</div>
			</section>
			<div className="flex justify-center pb-16">
				<Link href="/">
					<span className="inline-block text-sky-900">ホームに戻る</span>
				</Link>
			</div>
		</article>
	)
};
export default Post;