import Head from "next/head"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import {
  Header,
  Layout,
  PostBody,
  PostTitle,
  Container,
  PostHeader,
  MoreStories,
  Post as PostType,
} from "@nitro/blog-layout"
import {
  // toHtml,
  getSlugs,
  FrontMatter,
  renderMarkdown,
  pickFrontMatter,
  getMarkdownContent,
} from "@nitro/slugger"
import { CMS_NAME, APP_IMAGE_URL, POSTS_DIR } from "../../constants"

type Props = {
  source: string
  frontMatter: PostType
  morePosts: PostType[]
  preview?: boolean
}

function Post({ source, frontMatter, morePosts, preview }: Props) {
  const router = useRouter()

  if (!router.isFallback && !frontMatter?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} appName={CMS_NAME} appImgUrl={APP_IMAGE_URL}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {frontMatter.title} | {CMS_NAME}
                </title>
                {frontMatter.ogImage?.url && (
                  <meta property="og:image" content={frontMatter.ogImage.url} />
                )}
              </Head>
              <PostHeader
                title={frontMatter.title}
                coverImage={frontMatter.coverImage}
                date={frontMatter.date}
                author={frontMatter.author}
              />
              <PostBody source={source} frontMatter={frontMatter} />
            </article>
            {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const doc = getMarkdownContent(params.slug, POSTS_DIR)
  const frontMatter = pickFrontMatter(doc, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ])
  // const source = await toHtml(doc.content)
  const { compiledSource: source } = await renderMarkdown(doc.content, frontMatter)

  return { props: { source: source, frontMatter } }
}

export async function getStaticPaths() {
  const posts = getSlugs(POSTS_DIR, ["slug"])

  return {
    fallback: false,
    paths: posts.map((post: FrontMatter) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
  }
}

export default Post
