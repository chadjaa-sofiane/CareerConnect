import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import JobsNeededCard from "./JobsNeededCard";

function PostDetailCard({ title, children, state, createdAt, jobsNeeded }) {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h5" color="primary">
            {title}
          </Typography>
        }
        subheader={moment(createdAt).fromNow()}
      />
      <CardContent>
        <Typography color="textSecondary">{`state: ${state}`}</Typography>
        <Typography variant="h6" color="textPrimary">
          {children}
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <Typography color="primary" variant="h5">
            {jobsNeeded.lenght ? "JobsNEdeed" : ""}
          </Typography>
          {jobsNeeded?.map((j, index) => (
            <JobsNeededCard key={index} j={j} />
          ))}
        </Paper>
      </CardContent>
    </Card>
  );
}

export default PostDetailCard;
