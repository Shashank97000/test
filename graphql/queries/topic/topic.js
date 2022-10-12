import { gql } from "@apollo/client";

export const GET_TOPIC_BY_NAME = gql`
  query ($topic: String!) {
    topic(name: $topic) {
      id
      name
      relatedTopics {
        id
        name
      }
      stargazers {
        totalCount
      }
    }
  }
`;
