import { randomUUID } from "crypto";
import Link from "next/link";
import React  from "react";

type Props = {
	id: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	slug: string;
	isPaginationPage: boolean;
}


const SinglePost = (props: Props) => {
	const {title, description, date, tags, slug, id, isPaginationPage } = props;
	return(
		<div>
		{isPaginationPage ? (
		<section key={id} className="bg-sky-900 mb-8 mx-auto p-5 rounded-md shadow-2xl hover:shadow-none hover:translate-y-1 duration-300">
			<div className="">
				<h2 className="text-gray-100 text-2xl font-medium mb-2">
				<Link href={`/posts/${slug}`}>
					{title}
					</Link></h2>
				<div className="text-gray-100 mb-3">{date}</div>
				{tags.map((tag) => (
					<Link key={tag}
						href={`/posts/tag/${tag.toLowerCase()}/page/1`}
						className="text-white bg-gray-500 rounded-xl px-2">
						<span>{tag}</span>
					</Link>
				))}
			</div>
			<p className="text-gray-100 mt-3">{description}</p>
		</section>
		) : (
		<section key={id} className="lg:w-2/3 bg-sky-900 mb-8 mx-auto p-5 rounded-md shadow-2xl hover:shadow-none hover:translate-y-1 duration-300">
			<div className="flex items-center gap-3">
				<h2 className="text-gray-100 text-2xl font-medium mb-2">
				<Link href={`/posts/${slug}`}>
					{title}
					</Link></h2>
				<div className="text-gray-100">{date}</div>
				{tags.map((tag) => (
					<Link key={tag}
						href={`/posts/tag/${tag.toLowerCase()}/page/1`}
						className="text-white bg-gray-500 rounded-xl px-2">
						<span>{tag}</span>
				</Link>
				))}
			</div>
			<p className="text-gray-100">{description}</p>
		</section>
		)}
		</div>


	);
};

export default SinglePost;