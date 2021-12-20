import { FilterInput, UsersFilter } from "../resolvers/user/inputs";

export const getUsersInputFilter = (filter: UsersFilter) => {
    const { userType, jobFiled, employerType, jobSekeerType, job } = filter;
    const input: any = {};
    if (userType) input["userType"] = userType;
    if (jobFiled) input["jobFiled"] = jobFiled;
    if (employerType) input["employer.employerType"] = employerType;
    if (jobSekeerType) input["jobSekeer.type"] = jobSekeerType;
    if (job) input["jobSekeer.jobs"] = job;
    return input;
  };
  
export const getPostsInputFilter = (title: string, filter: FilterInput) => {
    const input: any = { title, ...filter };
    input.jobsNeeded && delete input.jobsNeeded;
    const { jobsNeeded } = filter;
      
    // handle workHours
    if (jobsNeeded?.workHoursMoreThan) {
      input["jobsNeeded.workHours"] = { $gte: jobsNeeded?.workHoursMoreThan };
    }
    if (jobsNeeded?.workHoursLessThan) {
      input["jobsNeeded.workHours"] = { $lte: jobsNeeded?.workHoursLessThan };
    }
    // handle work time range
    if (jobsNeeded?.workTimeRange?.start) {
      input["jobsNeeded.workTimeRange.start"] = {
        $gte: jobsNeeded?.workTimeRange?.start,
      };
    }
    if (jobsNeeded?.workTimeRange?.finish) {
      input["jobsNeeded.workTimeRange.finish"] = {
        $lte: jobsNeeded?.workTimeRange?.finish,
      };
    }
    // handle salary ...etc
    if (jobsNeeded?.salaryRange?.amountMoreThan)
      input["jobsNeeded.salaryRange.amount"] = {
        $gte: jobsNeeded?.salaryRange?.amountMoreThan,
      };
  
    if (jobsNeeded?.salaryRange?.amountLessThan)
      input["jobsNeeded.salaryRange.amount"] = {
        $lte: jobsNeeded?.salaryRange?.amountLessThan,
      };
  
    if (jobsNeeded?.salaryRange?.currency)
      input["jobsNeeded.salaryRange.currency"] =
        jobsNeeded?.salaryRange?.currency;
  
    if (jobsNeeded?.job) input["jobsNeeded.job"] = new RegExp(jobsNeeded?.job);
    // I know I know , It's not friendly to your eyes , as I saw before I will work on that
    return input;
  };
