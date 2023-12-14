// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headers: Array<any> = [
  {
    title: "Module Name",
    align: "start",
    sortable: true,
    key: "module.name",
  },
  {
    title: "Module Stage",
    align: "start",
    sortable: true,
    key: "module.step",
  },
  {
    title: "Score Result",
    align: "start",
  },
  {
    title: "Grade",
    align: "start",
  },
  {
    title: "Exam Date Taken",
    align: "start",
    sortable: true,
    key: "craeted_at",
  },
  {
    title: "Action",
    align: "end",
    sortable: false,
    key: "action",
    width: "10%",
  },
];

export default headers;
