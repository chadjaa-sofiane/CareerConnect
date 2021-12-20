import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const JobNeedContainer = withStyles((theme) => ({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
}))(Paper);

const JobsNeededCard = ({
  j: { description, job, workTimeRange, workHours, number, salaryRange },
}) => {
  return (
    <JobNeedContainer variant="outlined">
      <Typography color="secondary" variant="h6">{`job: ${job}`}</Typography>
      <Typography color="textSecondary">
        {workTimeRange &&
          `Work Time Range: ${workTimeRange.start}:00 - ${workTimeRange.finish}:00`}
      </Typography>
      <Typography color="textSecondary">
        {workHours && `workHours: ${workHours}h`}
      </Typography>
      <Typography color="textSecondary">
        {number && `number: ${number}`}
      </Typography>
      <Typography color="textSecondary">
        {salaryRange &&
          `salaryRange: ${salaryRange.amount} ${salaryRange.currency}`}
      </Typography>
      <Typography>{description}</Typography>
    </JobNeedContainer>
  );
};

export default JobsNeededCard;
