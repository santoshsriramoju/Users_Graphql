const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Users Type
const UsersType = new GraphQLObjectType({
  name: "users",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: AddressType }
  })
});

//Address Type
const AddressType = new GraphQLObjectType({
  name: "address",
  fields: () => ({
    street: { type: GraphQLString },
    suite: { type: GraphQLString },
    city: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    geo: {type: GeoType}
  })
});

//Geo Type
const GeoType = new GraphQLObjectType({
    name: "geo",
    fields: ()=>({
        lat: {type: GraphQLString},
        lng: {type: GraphQLString}
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UsersType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then(res => res.data);
      }
    },
    address: {
        type: new GraphQLList(AddressType),
        resolve(parent, args){
            console.log("args",parent)
            return parent
        }
    },
    geo: {
        type: new GraphQLList(GeoType),
        resolve(parent,args){
            return parent
        }
    },

    user: {
      type: UsersType,
      args:{
        id: {type: GraphQLInt}
      },
      resolve(parent,args){
        return axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
        .then(res => res.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
