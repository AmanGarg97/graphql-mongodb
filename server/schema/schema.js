const graphql = require('graphql');
const Story  = require('../models/story');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const SubStoryType = new GraphQLObjectType({
    name: "SubStory",
    fields:({
        id: { type: GraphQLID },
        order: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
    })
});


const StoryType = new GraphQLObjectType({
    name: "Story",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        tags: {type: GraphQLString},
        subStory: {
         type: GraphQLList(SubStoryType)
        }
    }
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Story: {
            type: StoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Story.findById(args.id);
            }
        },
      
        Stories: {
            type: GraphQLList(StoryType),
            resolve(parent, args , context , info){
                // var query = (Story.find());
                // query.exec( (err , res) => {
                //     if(err) {
                //         console.log(err)
                //     }
                //     else{
                //          console.log(res)
                //          return res;
                        
                //     }
                // })
                // var query =  Story.find().exec().then(()=>{
                //     console.log("asdasd")
                // });
                // console.log(query)
                let data = info.fieldNodes[0].selectionSet.selections;
                let len = info.fieldNodes[0].selectionSet.selections.length;
                let s = '';
                for(let i = 0 ; i < len ; i++){
                    s = s + ' ' + data[i].name.value;
                    // console.log(data[i].name.value)
                }
                // console.log(info.fieldNodes[0].selectionSet.selections[1].name);
                console.log(s)
                var query = Story.find().select(s)
                 return query
            }
        },
     
    }
});


const createUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        ssid: {type: GraphQLString},
        order: {type: GraphQLInt},
        title: {type : GraphQLString},
        description: {type : GraphQLString},
        url: {type: GraphQLString},
        tags: {type: GraphQLString},
    }),
  });
  

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addStory: {
            type: StoryType,
            args: {
                id: { type: GraphQLString },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                tags: { type: GraphQLString },
                subStory:{
                    type: GraphQLList(createUserInputType),
                }
                
            },
            resolve(parent, args , context , info){
                console.log(info)
                // console.log(args.title)
                // let story = new Story({
                //     title: "heyhey",
                //     description : "dfhsdfh",
                //     tags: args.tags,
                //     // subStory:{
                //     //     ssid: args.ssid,
                //     //     order:args.order,
                //     //     title:args.title,
                //     //     description:args.description,
                //     //     url:args.url,
                //     //     tags:args.tags
                //     // }
                // });
                var story = new Story(args);
                return story.save();
            }
        }
  
    }
});
 
/*
const mutation =  new GraphQLObjectType({
    name: "Mutation",
    fields: {
        person: {
            type: StoryType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                // lastname: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (root, args, context, info) => {
                var story = new Story(args);
                return story.save();
            }
        }
    }
})
*/

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
