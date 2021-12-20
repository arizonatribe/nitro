import styled from 'styled-components'

/* eslint-disable-next-line */
export interface BlogLayoutProps {}

const StyledBlogLayout = styled.div`
  color: pink;
`;

export function BlogLayout(props: BlogLayoutProps) {
  return (
    <StyledBlogLayout>
      <h1>Welcome to BlogLayout!</h1>
    </StyledBlogLayout>
  );
}

export default BlogLayout;
