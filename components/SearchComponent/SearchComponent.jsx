import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery } from "@apollo/client";
import _ from "lodash";
import { GET_TOPIC_BY_NAME } from "../../graphql/queries/topic";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchResults = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  width: "86%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightgray",
  marginTop: "10px",
  borderRadius: "5px",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const SearchComponent = () => {
  const [text, setText] = React.useState("");
  const [search, { loading, data }] = useLazyQuery(GET_TOPIC_BY_NAME);
  const debouncer = React.useCallback(_.debounce(search, 1000), [search]);
  const router = useRouter();
  let results = null;

  if (loading) {
    results = (
      <SearchResults>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </SearchResults>
    );
  }

  if (
    data?.topic?.relatedTopics.length > 0 &&
    data?.topic?.stargazers.totalCount > 0 &&
    text !== ""
  ) {
    results = (
      <SearchResults>
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <nav aria-label="topics results">
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setText("");
                    router.push(data.topic.name);
                  }}
                >
                  <ListItemText primary={data.topic.name} />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </SearchResults>
    );
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search Topic…"
        inputProps={{ "aria-label": "search" }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          debouncer({
            variables: { topic: e.target.value.toLocaleLowerCase() },
          });
        }}
      />
      {results}
    </Search>
  );
};

export default SearchComponent;
