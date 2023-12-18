import type { VDataTable } from "vuetify/lib/components/index.mjs";
type ReadonlyHeaders = InstanceType<typeof VDataTable>["headers"];
const headers: ReadonlyHeaders = [
  {
    title: "Answer Content",
    align: "start",
    sortable: true,
    key: "content",
  },
  {
    title: "Question Content",
    align: "start",
    sortable: true,
    width: "50%",
    key: "question.content",
  },
  {
    title: "Evaluation",
    align: "start",
    sortable: true,
    key: "grade.evaluation",
  },
  {
    title: "Tries",
    align: "start",
    sortable: true,
    key: "tries",
  },
];

export default headers;
