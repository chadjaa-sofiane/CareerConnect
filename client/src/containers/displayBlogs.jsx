import BlogCard from "../components/blogs/blogCard";
import Grid from "@material-ui/core/Grid";

function DisplayBlogs({ data, loading, error }) {
  if (loading) return "loading...";
  if (error) return "error !!";
  return (
    <Grid container item xs justifyContent="center">
      {data?.map((blog) => (
        <BlogCard data={blog} key={blog._id} />
      ))}
    </Grid>
  );
}

export default DisplayBlogs;

