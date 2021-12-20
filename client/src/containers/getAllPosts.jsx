import Grid from "@material-ui/core/Grid";
import Post from "../components/postComponent/post";
import { Pagination } from "@material-ui/lab";

function GetAllPosts({
  data,
  loading,
  error,
  paginationDisplay = false,
  pagination = {},
  setPagination = () => {},
}) {
  if (loading) return <h1>{"loading..."}</h1>;
  if (error) return <h1> {error.message} </h1>;
  if (!data) return "";
  const paginationChange = (_, page) => {
    const skip = (page - 1) * 10;
    setPagination((p) => ({ ...p, skip }));
  };
  if (data)
    return (
      <Grid item xs>
        <div>
          {data[Object.keys(data)[0]]?.map((el) => {
            return (
              <Post key={el._id} data={el}>
                {el.body}
              </Post>
            );
          })}
        </div>
        {paginationDisplay && (
          <Pagination onChange={paginationChange} count={pagination.count} />
        )}
      </Grid>
    );
}

export default GetAllPosts;
