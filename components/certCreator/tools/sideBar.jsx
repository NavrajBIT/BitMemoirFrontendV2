import VariablesBox from "../subcomponents/variablesBox";
const SideBar = ({ variable, setVariable }) => {
  const variables = [
    "Name",
    "Date",
    "Course Name",
    "Completion Date",
    "Instructor Name",
    "Subject Name",
    "Subject Grade",
    "Parent Name",
    "Sr. No.",
    "Total Marks",
    "Marks Obtained",
    "Approved By",
  ];

  return (
    <div
      style={{
        width: "25%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",

        justifyContent: "space-around",
        paddingLeft: "3rem",
      }}
    >
      <VariablesBox variable={variable} setVariable={setVariable} />

      <div
        style={{
          border: "1px solid #004351",
          borderRadius: "10px",
          width: "65%",
          backgroundColor: "#002D36",
          padding: "1rem",
        }}
      >
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label for="html">Essential</label>
        <br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label for="css">Non essential</label>
        <br />
        <input
          type="radio"
          id="javascript"
          name="fav_language"
          value="JavaScript"
        />
        <label for="javascript">Dynamic Certificate</label>
      </div>

      <div
        style={{
          border: "1px solid #004351",
          borderRadius: "10px",
          width: "65%",
          backgroundColor: "#002D36",
          padding: "1rem",
        }}
      >
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label for="html">Unique</label>
        <br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label for="css">Batch</label>
        <br />
      </div>
    </div>
  );
};

export default SideBar;
