import { Client } from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";


// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient:notion });

export const getAllPosts = async () => {
	const posts = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID,
		page_size: 100,
		sorts:[
			{
				property: "Date",
				direction: "descending"
			},
		],
		filter: {
			property: "Published",
			checkbox: {
				equals: true,
			},
		},
	});
	const allPosts = posts.results;
	return allPosts.map((post) => {
		return getPageMetaData(post);
// return post;
	});
};

const getPageMetaData = (post) => {
	const getTags = (tags) => {
		const allTags = tags.map((tag) => {
			return tag.name;
		});
		return allTags;
	};

	return{
		id: post.id,
		title: post.properties.名前.title[0].plain_text,
		description: post.properties.Description.rich_text[0].plain_text,
		slug: post.properties.Slug.rich_text[0].plain_text,
		date: post.properties.Date.date.start,
		tags: getTags(post.properties.タグ.multi_select),
	};
}

export const getSinglePost = async (slug) => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID,
		page_size: 1,
		filter: {
			property: "Slug",
			formula: {
				string: {
					equals: slug,
				},
			},
		},
	});
	const page = response.results[0];
	const metadata = getPageMetaData(page);
	const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

	return {
		metadata,
		markdown: mdString.parent
	};
};

export const getPostsForTopPage = async (pageSize: number) => {
	const allPosts = await getAllPosts();
	const fourPosts = allPosts.slice(0,pageSize);
	return fourPosts;
}

export const getPostsByPage = async (page:number) => {
	const allPosts = await getAllPosts();
	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex +  NUMBER_OF_POSTS_PER_PAGE;

	return allPosts.slice(startIndex,endIndex);
}

export const getNumberOfPages = async () => {
	const allPosts = await getAllPosts();
	return (
		Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE ) +
		(allPosts.length / NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
	);
};

export const getPostsByTagAndPage = async (tagNmae: string, page: number) => {
	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex +  NUMBER_OF_POSTS_PER_PAGE;
	const allPosts = await getAllPosts();

	const posts = allPosts.filter((post) =>
		post.tags.find((tag: string) => tag.toLowerCase() === tagNmae)
	);

	return posts.slice(startIndex,endIndex)
};

export const getNumberOfPagesByTag = async (tagNmae: string) => {
	const allPosts = await getAllPosts();

	const posts = allPosts.filter((post) =>
		post.tags.find((tag: string) => tag.toLowerCase() === tagNmae)
	);
	const pagerNum = posts.length / NUMBER_OF_POSTS_PER_PAGE;
	return Math.floor( pagerNum ) + (pagerNum > 0 ? 1 : 0);
};

export const getAllTags = async () => {
	const allPosts = await getAllPosts();
	const tagsList = allPosts.flatMap((post) => post.tags);
	const tagListLow = tagsList.map(value => value.toLowerCase());
	const set = new Set(tagListLow);
	const allTagsList = Array.from(set);
	return allTagsList;
}