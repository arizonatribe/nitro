import Head from "next/head"
import Script from "next/script"
import { useEffect } from "react"
import { getSlugs } from "@nitro/slugger"
import { Post, Intro, Layout, HeroPost, Container, MoreStories } from "@nitro/blog-layout"

import { CMS_NAME, APP_IMAGE_URL, POSTS_DIR } from "../constants"

declare global {
  type EventCallback = (user: any) => void

  interface Window {
    netlifyIdentity: {
      on(event: string, cb?: EventCallback): void
    }
  }
}

type Props = {
  allPosts: Post[]
}

function Index({ allPosts }: Props) {
  const [heroPost, ...morePosts] = allPosts ?? []

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user: any) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/"
          })
        }
      })
    }
  }, [])

  return (
    <>
      <Layout appName={CMS_NAME} appImgUrl={APP_IMAGE_URL}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
          <Intro appName={CMS_NAME} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getSlugs(POSTS_DIR, [
    "slug",
    "date",
    "title",
    "author",
    "excerpt",
    "coverImage",
  ])

  if (!allPosts?.length) {
    return { notFound: true }
  }

  return { props: { allPosts } }
}

export default Index
