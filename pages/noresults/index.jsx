import React from "react";
import { Typography, Link } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";

const NoResults = () => {
  const router = useRouter();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div>
        <Typography variant="h2" gutterBottom>
          No data found ☹️
        </Typography>
        <Link component="button" onClick={() => router.back()}>
          Go back
        </Link>
      </div>
    </Container>
  );
};

export default NoResults;
