import Head from 'next/head';
import {generateRssFeed} from "@/lib/generateRssFeed";
import {Article as ArticleType, getAllArticles} from "@/lib/getAllArticles";
import {Container} from "@/components/Container";

export default function Home({
 articles,
}: {
  articles: ArticleType[];
}) {
  return <>
    <Head>
      <title>
        Falko Woudstra - Developer, entrepreneur, and amateur shuffleboard
        enthusias
      </title>
      <meta
        name="description"
        content="I’m Falko, a software developer and entrepreneur based in Enschede, The Netherlands. I’m the founder and CTO of Coddin B.V, where we develop reactive product configurators and large webplatforms."
      />
    </Head>
    <Container className="mt-9">
      <h1>Test</h1>
    </Container>
  </>
};

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed();
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  };
}
