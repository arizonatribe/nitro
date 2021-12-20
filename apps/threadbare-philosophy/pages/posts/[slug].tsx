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
import { getSlugs, toHtml, pickSlug } from "@nitro/slugger"
import { CMS_NAME, APP_IMAGE_URL, POSTS_DIR } from "../../constants"

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
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
                  {post.title} | {CMS_NAME}
                </title>
                {post.ogImage?.url && <meta property="og:image" content={post.ogImage.url} />}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
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
  const post = pickSlug(params.slug, POSTS_DIR, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]) as PostType
  const content = await toHtml(post.content ?? "")

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getSlugs(POSTS_DIR, ["slug"])

  return {
    fallback: false,
    paths: posts.map((post: PostType) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
  }
}

export default Post
