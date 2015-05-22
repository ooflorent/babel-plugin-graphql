var fragmentA = graphql`{ a, b }`
var fragmentB = graphql`{ c, d }`
var query = graphql`{ ${ fragmentA() }, ${ fragmentB() }, e, f }`
