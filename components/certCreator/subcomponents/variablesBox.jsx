const VariablesBox = ({variable,setVariable}) => {
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
    return(
        <div className="variablesBox">
            <div className="sideBar-variable">
                
                <div style={{
                    fontSize:"1rem",
                    color:"white",
                    position:"absolute",
                    marginTop:"-0.8rem",
                    marginLeft:"1rem",
                
                }}>Variables</div>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"1rem",
                    overflowY:"scroll",
                    scrollbarColor:"#004351",
                    border:"1px solid #004351",
                    borderRadius:"10px",
                    width:"65%",
                    backgroundColor:"#002D36",
                    height:"40vh",
                    padding:"1rem",
                    cursor:"pointer"
                }}>
                   
                    {variables.map((variable) => {
                        return (
                            <div key={variable} className="sideBar-variable-content-variable">
                                <div style={{
                                    fontSize:"1.2rem",
                                    color:"white",
                                    borderBottom:"1px solid #004351",
                                    textAlign:"center",
                                    padding:"0.5rem",


                                }}
                                onClick={()=>setVariable(variable)}
                                >{variable}</div>
                            </div>
                        );
                    })}

                </div>

            </div>


        </div>
    )
}


export default VariablesBox;