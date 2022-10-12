import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_TOPIC_BY_NAME } from "../../graphql/queries/topic";
import {
  Typography,
  Chip,
  Container,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";

const Topic = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_TOPIC_BY_NAME, {
    variables: { topic: id },
  });

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error... ${error.message}</p>;

  if (
    data.topic.relatedTopics.length === 0 &&
    data.topic.stargazers.totalCount === 0
  ) {
    router.replace("/noresults");
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {id.toUpperCase()}
      </Typography>
      <Divider />

      <Typography sx={{ mt: 5 }} variant="h5" gutterBottom>
        Related Topics
      </Typography>
      {data.topic.relatedTopics.map((topic) => (
        <Chip
          sx={{ mr: 1 }}
          key={topic.id}
          label={topic.name}
          variant="outlined"
          onClick={() => router.push(topic.name)}
        />
      ))}

      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Starsgazers
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {data.topic.stargazers.totalCount}
      </Typography>
    </Container>
  );
};

export default Topic;
