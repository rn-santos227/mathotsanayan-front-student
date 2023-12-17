import type { VDataTable } from "vuetify/lib/components/index.mjs";
type ReadonlyHeaders = InstanceType<typeof VDataTable>["headers"];
const headers: ReadonlyHeaders = [
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
    sortable: false,
    key: "score",
  },
  {
    title: "Grade",
    align: "start",
    sortable: false,
    key: "grade",
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
