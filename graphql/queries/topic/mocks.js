import { GET_TOPIC_BY_NAME } from "./topic";

const mocks = [
  {
    request: {
      query: GET_TOPIC_BY_NAME,
      variables: {
        topic: "react",
      },
    },
    result: {
      data: {
        topic: {
          id: "MDU6VG9waWNyZWFjdA==",
          name: "react",
          relatedTopics: [
            {
              id: "MDU6VG9waWNhbmd1bGFy",
              name: "angular",
            },
            {
              id: "MDU6VG9waWNuZXh0anM=",
              name: "nextjs",
            },
            {
              id: "MDU6VG9waWNyZWFjdC1uYXRpdmU=",
              name: "react-native",
            },
          ],
          stargazers: {
            totalCount: 76657,
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_TOPIC_BY_NAME,
      variables: {
        topic: "angular",
      },
    },
    result: {
      data: {
        topic: {
          id: "MDU6VG9waWNhbmd1bGFy",
          name: "angular",
          relatedTopics: [
            {
              id: "MDU6VG9waWNyZWFjdA==",
              name: "react",
            },
            {
              id: "MDU6VG9waWN2dWU=",
              name: "vue",
            },
            {
              id: "MDU6VG9waWNzd2lmdA==",
              name: "swift",
            },
          ],
          stargazers: {
            totalCount: 45065,
          },
        },
      },
    },
  },
];

export default mocks;
