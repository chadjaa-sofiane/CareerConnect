import userResolver from "./user";
import employerResolver from "./employer";
import jobSekeerResolver from "./jobSekeer";

const resolvers: any = [
  ...userResolver,
  ...employerResolver,
  ...jobSekeerResolver,
];

export default resolvers;
