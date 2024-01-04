import Link from "next/link";
import React from "react";
import { deflate } from "zlib";
type Props = {
	tags: string[];
}
const Tag = (props: Props) => {
	const{ tags } = props;
	return (
		<div className="my-4">
			<section className="lg:w-2/3 bg-sky-50 rounded-md py-4 px-6">
				<div className="font-medium text-lg mb-2">タグ検索</div>
				<div className="flex gap-4 flex-wrap">
					{tags.map((tag) => (
						<Link key={tag} href={`/posts/tag/${tag.toLowerCase()}/page/1`} className="bg-gray-300 rounded-xl block py-2 px-3 text-sky-900">
						<span>{tag}</span>
					</Link>
					))}
				</div>
			</section>
		</div>
	)
};
export default Tag;