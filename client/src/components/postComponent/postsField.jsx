import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import GetAllPosts from "../../containers/getAllPosts";
import { GET_ALL_POSTS } from "../../graphql/queries";
import FilterBar from "../filterBar";
import { searchText } from "../../cache";
import { userInfo } from "../../cache";

function PostsField() {
  const state = userInfo().state;
  const title = searchText();
  const [filter, setFilter] = useState({ state });
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
    count: 0,
  });
  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS, {
    variables: {
      title,
      filter,
      limit: pagination.limit,
      skip: pagination.skip,
    },
  });
  const setPaginationStates = useCallback(() => {
    if (!data) return;
    const count = Math.ceil(data.getPostsCount / 10);
    setPagination((p) => ({ ...p, count }));
  }, [setPagination, data]);

  useEffect(() => {
    setPaginationStates();
  }, [setPaginationStates]);

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  return (
    <>
      <FilterBar filter={filter} setFilter={setFilter} />
      {data && (
        <GetAllPosts
          data={data}
          loading={loading}
          error={error}
          paginationDisplay={true}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </>
  );
}

export default PostsField;
