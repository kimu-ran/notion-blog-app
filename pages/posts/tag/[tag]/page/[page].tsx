import Head from 'next/head';
import {getAllTags, getNumberOfPagesByTag, getPostsByTagAndPage} from '../../../../../lib/notionAPI';
import SinglePost from '../../../../../components/Post/SinglePost';
import { GetStaticPaths, GetStaticProps } from 'next';
import Pagination from '../../../../../components/Pagination/Pagination';
import Tag from '../../../../../components/Tag/Tag';

export const getStaticPaths: GetStaticPaths = async () => {
	const allTags = await getAllTags();
	let params = [];
	await Promise.all(
		allTags.map((tag: string) => {
			return getNumberOfPagesByTag(tag).then((numberOfPageByTag: number) =>{
				for (let i = 1; i <= numberOfPageByTag; i++){
					params.push({ params: {tag: tag, page: i.toString()}});
				}
			});
		})
	);


	return {
		paths: params,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const currentPage:string = context.params?.page.toString();
	const currentTag:string = context.params?.tag.toString();
  const allTags = await getAllTags();
	const numberOfPagesByTag = await getNumberOfPagesByTag(currentTag);

	const posts = await getPostsByTagAndPage(currentTag, parseInt(currentPage, 10));
  return {
    props: {
      posts,
			numberOfPagesByTag,
			currentTag,
			allTags,
    },
    revalidate: 60 * 60,
  };
};

const BlogTagPageList =({ posts, numberOfPagesByTag, currentTag, allTags }) => {
  return (
    <div className='container h-full w-full mx-auto font-mono'>
      <Head>
        <title>Notion Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <main className="container w-full mt-16">
      <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog</h1>
			<div className='sm:grid grid-cols-2 lg:w-5/6 mx-auto gap-3'>
      {posts.map((post) => (
        <div key={post.id} >
          <SinglePost
            id = {post.id}
            title = {post.title}
            description = {post.description}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
						isPaginationPage={true}
          />
        </div>
      ))}

			</div>
			<Pagination
				numberOfPage={numberOfPagesByTag}
				tag={currentTag}
			/>
			<Tag tags={allTags} />
    </main>

    </div>
  )
}

export default BlogTagPageList;