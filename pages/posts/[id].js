// import { getAllPostIds } from "../../lib/posts";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// 新版(Polishing the Post Page)有css的文章頁
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>)
}

// 舊版沒css的文章頁
// export default function Post({ postData }) {
//   return (
//     <Layout>
//       {postData.title}
//       <br />
//       {postData.id}
//       <br />
//       <Date dateString={postData.date} />
//       <br />
//       <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//     </Layout>
//   );
// }

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
