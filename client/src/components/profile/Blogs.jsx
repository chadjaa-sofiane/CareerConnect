import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { GET_BLOG_ID } from "../../graphql/queries";
import DisplayBlogs from "../../containers/displayBlogs";
import { userInfo } from "../../cache";

const Blogs = ({ _id }) => {
  const { _id: myId } = userInfo();
  const { push } = useHistory();
  const { data, loading, error } = useQuery(GET_BLOG_ID, {
    variables: { id: _id, limit: 10, skip: 0 },
  });
  const itIsMe = myId === _id;
  return (
    <>
      {data?.getBlogsById.length === 0 && (
        <Typography
          color="secondary"
          variant="h5"
          style={{ textAlign: "center" }}
        >
          there is no blogs
        </Typography>
      )}
      <br />
      <br />
      {itIsMe && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="primary" variant="h6">
            Create a new Blog
          </Typography>
          <Button
            onClick={() => push("/dashboard/createBlog")}
            size="large"
            color="primary"
            variant="contained"
          >
            Create a Blog
          </Button>
        </div>
      )}
      <br />
      <br />
      {data && (
        <DisplayBlogs
          data={data.getBlogsById}
          error={error}
          loading={loading}
        />
      )}
    </>
  );
};

export default Blogs;
