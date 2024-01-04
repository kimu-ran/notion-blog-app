import Link from "next/link";
import React  from "react";
import { getPageLink } from "../../lib/blog-helper";

type Props = {
	numberOfPage: number;
	tag: string;
}

const Pagination = (props: Props) => {
	const { numberOfPage, tag } = props;

	let pages: number[] = [];
	for(let i = 1; i <= numberOfPage; i++){
		pages.push(i);
	}

	return (
		<section className="">
			<ul className="flex gap-2 justify-center my-6 flex-wrap">
				{pages.map((page) => (
					<li key={page}>
						<Link
						href={getPageLink(tag, page)}
						 className="bg-sky-900 text-white rounded-lg w-8 h-8 flex items-center justify-center">{page}</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Pagination;