// import { ApolloServer } from 'apollo-server-express';
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const express = require("express")
const http = require("http")
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
require("dotenv").config()

const Author = require("./models/Author")
const Book = require("./models/Book")
const User = require("./models/User")

const JWT_SECRET = "SECRET_KEY"

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (_, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate("author")
      }
      if (!args.author) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        )
      }
      const author = await Author.findOne({ name: args.author })
      if (!args.genre) {
        return await Book.find({ author: author.id }).populate("author")
      }
      return await Book.find({
        author: author.id,
        genres: { $in: [args.genre] },
      }).populate("author")
    },
    allAuthors: async () => await Author.find({}),
    me: (_, __, { currentUser }) => currentUser,
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return await Book.countDocuments({ author: author.id })
    },
  },

  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (args.title.length < 2 || args.author.length < 3) {
        throw new UserInputError("title or author too short!")
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()
        return book.populate("author")
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
        return null
      }
    },

    editAuthor: async (_, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name })
      if (!author) {
        return null
      }
      author.born = setBornTo
      try {
        await author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { name, setBornTo },
        })
        return null
      }
    },

    createUser: async (_, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })
      try {
        await user.save()
        return user
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { username, favoriteGenre },
        })
      }
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== "secret") {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username,
        id: user.id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.slice(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

async function startApolloServer(typeDefs, resolvers, context) {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  })

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers, context)
