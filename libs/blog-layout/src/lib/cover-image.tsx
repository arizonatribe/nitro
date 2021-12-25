import React from "react"
import cn from "classnames"
import Link from "next/link"
import styled from "styled-components"
import Image from "./image"

interface WrapperProps {
  className?: string
  children: React.ReactNode
}

function Wrapper({ className, children }: WrapperProps) {
  return (
    <div className={cn(["sm:mx-0", className])}>
      {children}
    </div>
  )
}

interface StyledWrapperProps {
  maxHeight?: string
}

const StyledWrapper: React.FC<StyledWrapperProps> = styled(Wrapper)<StyledWrapperProps>`
  object-fit: cover;
  object-position: top;
  overflow: hidden;
  ${props => props.maxHeight != null
    ? `max-height: ${props.maxHeight};`
    : undefined
}
`

type Props = {
  title: string
  src: string
  maxHeight?: string;
  slug?: string
}

function CoverImage({ title, src, slug, maxHeight }: Props) {
  return (
    <StyledWrapper maxHeight={maxHeight}>
      {slug
        ? (
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>
              <Image src={src} title={title} name={slug} />
            </a>
          </Link>
        )
        : <Image src={src} title={title} />
      }
    </StyledWrapper>
  )
}

export default CoverImage
