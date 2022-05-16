import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import URL from '../scalar/URL';

export const ApplicationCreateInput = new GraphQLInputObjectType({
  name: 'ApplicationCreateInput',
  description: 'Input type for Application',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    callbackUrl: { type: URL },
  }),
});