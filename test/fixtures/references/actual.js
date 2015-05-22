var ref = "bar"
var query = graphql`
  {
    a(b: ${ 0 }, c: ${ "foo" }, d: ${ ref })
  }
`
