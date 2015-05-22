var query = graphql`
  {
    a,
    b {
      c,
      d {
        e
      },
      f,
      g {}
    }
  }
`
