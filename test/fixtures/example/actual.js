const IMAGE_WIDTH = 80
const IMAGE_HEIGHT = 80

const PostFragment = graphql`
  {
    post {
      title,
      published_at
    }
  }
`

const UserQuery = graphql`
  {
    user(id: <id>) {
      nickname,
      avatar(width: ${IMAGE_WIDTH}, height: ${IMAGE_HEIGHT}) {
        url
      },
      posts(first: <count>) {
        count,
        edges {
          node {
            ${ PostFragment() }
          }
        }
      }
    }
  }
`
