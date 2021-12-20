import { useState,useEffect } from "react";
import { userInfo } from "../../cache";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import Filter from "./filter";
import GetUsers from "../../containers/getUsers";

function JobSekeerField() {
  const { JobSekeerField } = userInfo();
  const [filter, setFilter] = useState({ jobSekeerType: "employee" });
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      filter: { ...filter, userType: "jobSekeer" },
    },
  });
  useEffect(() => {
    if (JobSekeerField) setFilter((p) => ({ ...p, jobFiled: JobSekeerField }));
  }, [JobSekeerField, setFilter]);
  if (error) return "error";
  if (loading) return "loading...";
  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <GetUsers users={data?.getUsers} />
    </>
  );
}

export default JobSekeerField;
