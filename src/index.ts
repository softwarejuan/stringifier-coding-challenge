interface IMembership {
  notes: string | null;
  renewal_date: string | null;
  dues_amount: string;
  member_id: string;
}

const inputJsonData: Array<IMembership> = [
  {
    notes: "Please update your credit card on file with HQ.",
    renewal_date: "2022-08-15",
    dues_amount: "125.99",
    member_id: "00001234",
  },
  {
    notes: "Dues amount includes late fees.",
    renewal_date: "2021-08-15",
    dues_amount: "250.00",
    member_id: "00004567",
  },
  {
    notes: null,
    renewal_date: null,
    dues_amount: "250.00",
    member_id: "00004567",
  },
];
const formatDate = (date: string) => {
  if (date) {
    return date.replace(/-/g, "").slice(2);
  }
  return "";
};
const chunkString = (str: string, length: number) => {
  return str.match(new RegExp(".{1," + length + "}", "g")) || [];
};
const stringfier = (memberships: Array<IMembership>, max_line_length: number = 64) => {
  return memberships
    .map((item) => {
      const str = `${item.member_id},${formatDate(item.renewal_date || "")},${Number(item.dues_amount) * 100},${item.notes || ""}`;
      return chunkString(str, max_line_length - 3)
        .map((item, i) => {
          if (i === 0) {
            item = "16," + item;
          } else {
            item = "88," + item;
          }
          return item;
        })
        .join("\n");
    })
    .join("\n");
};

console.log("max_line_length is 80: ----------------- ");
console.log("");
console.log("");
console.log(stringfier(inputJsonData, 80));
console.log("-----------------------");
console.log("");
console.log("");

console.log("max_line_length is 32: ----------------- ");
console.log("");
console.log("");
console.log(stringfier(inputJsonData, 32));
console.log("-----------------------");
console.log("");
console.log("");

console.log("max_line_length is 30: ----------------- ");
console.log("");
console.log("");
console.log(stringfier(inputJsonData, 30));
console.log("-----------------------");
console.log("");
console.log("");
