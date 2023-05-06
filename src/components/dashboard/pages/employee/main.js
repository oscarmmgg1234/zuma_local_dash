import React, {useEffect, useState} from "react";
import tw from "tailwind-styled-components";
import { FaTimes,FaPrint,FaEye } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { Document, Page, pdfjs } from 'react-pdf';
import "react-datepicker/dist/react-datepicker.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const ModalBackground = tw.div`
  fixed
  z-50
  inset-0
  bg-gray-900
  opacity-50
`;

const ModalContainer = tw.div`
  fixed
  z-50
  top-1/2
  left-1/2
  transform
  -translate-x-1/2
  -translate-y-1/2
  w-3/4
  h-5/6
  bg-white
  rounded-md
  overflow-y-auto
`;

const ModalHeader = tw.div`
  flex
  justify-between
  items-center
  px-4
  py-2
  bg-gray-200
  border-b
  border-gray-400
`;



const ModalTitle = tw.h2`
  text-lg
  font-medium
`;

const ModalCloseButton = tw.button`
  focus:outline-none
  text-black
`;


const CardGrid = tw.div`
  grid
  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-4
  px-4 py-6
`;

const Card = tw.div`
bg-gradient-to-br from-white to-gray-100
hover:to-gray-500
  shadow-md
  rounded-md
  p-4
`;

const SubComponent = tw.div`
  bg-gray-100
  rounded-md
  p-4
`;


//fetch
const GET_Preview = async (args) => {
  console.log(args.shiftOption);
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const url_end = args.shiftOption == "end" ? "EmployeeResourcesAPI/PreviewTansformEndShift" : "EmployeeResourcesAPI/PreviewTansformStartShift";
  
  const data = JSON.stringify({ e_id: args.e_id, date: args.date, hours: args.hours });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    body: data,
  };
  const response = await fetch(`http://34.220.205.154:3000/${url_end}`, options);
  const responseData = await response.json();
  return responseData;
};

const transform_shift = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const url_end = args.shiftOption == "end" ? "/EmployeeResourcesAPI/TansformEndShift" : "/EmployeeResourcesAPI/TansformStartShift";
  const data = JSON.stringify({ e_id: args.e_id, date: args.date, hours: args.hours });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    body: data,
  };

  const response = await fetch(`http://34.220.205.154:3000${url_end}`, options);
  const responseData = await response.json();
  return responseData;
};

const pdf_get = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  
  const url_end = args.e_id == "PRINT_ALL" ? "/EmployeeResourcesAPI/Generate_Time_sheet_all" : "/EmployeeResourcesAPI/Generate_Time_sheet";
  const data = JSON.stringify({ employee_id: args.e_id, shift_start_range: args.date1, shift_end_range: args.date2 });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    body: data,
  };
  
  const response = await fetch(`http://34.220.205.154:3000${url_end}`, options);
  return response.blob();
};

const removeShift = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const data = JSON.stringify({ e_id: args.e_id, date: args.date});
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    body: data,
  };
  
  const response = await fetch(`http://34.220.205.154:3000/EmployeeResourcesAPI/RemoveShift`, options);
  const responseData = await response.json();
  return responseData;
};

const previewRemoveShift = async (args) => {
  const data = JSON.stringify({ e_id: args.e_id, date: args.date, hours: "1"});
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    body: data,
  };
  
  const response = await fetch(`http://34.220.205.154:3000/EmployeeResourcesAPI/PreviewRemoveShift`, options);
  const responseData = await response.json();
  return responseData;
}


//third party components

const AlertCard = ({ title, message }) => {
  return (
    <div className=" h-20 bg-white/60 border-4 border-gray-200/40 rounded-lg mb-1 p-1 animate-pulse">
      <h2 className="text-md font-medium mb-1">{title}</h2>
      <p className=" text-sm">{message}</p>
    </div>
  );
};

const Datepicker = ({selected, setSelected}) => {

  const handleChange = (date) => {
    setSelected(date);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleChange}
      className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
    />
  );
};

const PdfViewer = ({ fileBlob }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePrint = () => {
    const pdfUrl = URL.createObjectURL(fileBlob);
    window.open(pdfUrl);
    URL.revokeObjectURL(pdfUrl);
  };

 
  return (
    <div className="flex flex-col items-center mt-20 border-b-2 border-gray-400/50 py-2">
      <div className="bg-gray-200 p-4 rounded-md shadow-md my-4">
        <Document file={fileBlob} onLoadSuccess={onDocumentLoadSuccess} >
          <Page pageNumber={pageNumber} size={"letter"} />
        </Document>
      </div>
      <div className="flex items-center space-x-2">
  <button
    onClick={handlePrint}
    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
  >
    <FaPrint className="mr-2" /> Print
  </button>
  <div className="text-gray-500 flex items-center">
    <span className="mr-2">
      Page {pageNumber} of {numPages}
    </span>
    <button
      onClick={() => setPageNumber(pageNumber - 1)}
      disabled={pageNumber <= 1}
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-2 py-1 rounded-md mr-2"
    >
      Prev
    </button>
    <button
      onClick={() => setPageNumber(pageNumber + 1)}
      disabled={pageNumber >= numPages}
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-2 py-1 rounded-md"
    >
      Next
    </button>
  </div>
</div>

      
    </div>
  );
};


const DropdownButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(props.data.data);



  // useEffect(() => {
  //   if (data) {
  //     setOptions(data);
  //   }
  // }, [data]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    props.setData(option);
    setIsOpen(false);
  };

  return (
    <>
      {options.length > 0 && (
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={handleButtonClick}
          >
            {props.dataValue}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414L11.414 10l2.293 2.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0L10 11.414l-2.293 2.293a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414l.707-.707z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute z-50 mt-1 w-full bg-white shadow-lg`}
            aria-labelledby="options-menu"
            role="menu"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option) => (
              <button
                key={option}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};



const Employee = () => {
  // states
  const [isModalRmOpen, setIsModalRmOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalGenOpen, setIsModalGenOpen] = useState(false);
  

  //edit modal states
  const shiftDefault = ["start", "end"];
  const [shiftOption, setShiftOption] = useState("Select Shift"); //request option
  const employeeData = [{name: "Oscar Maldonado", e_id: "000002" }, {name: "Jennifer Maldonado", e_id: "00001" }, {name: "Juan Pablo", e_id: "001111" }, {name: "Maria Maldonado", e_id: "003222" }, {name: "Jose Adalberto Enciso", e_id: "230114" }];
  const EmpOptions = ["Oscar Maldonado","Jennifer Maldonado","Juan Pablo","Maria Maldonado","Jose Adalberto Enciso"];
  const [employee, setEmployee] = useState("Select Employee");
  const [selEmployeeData, setSelEmployeeData] = useState(""); //request option
  const [selectedDate, setSelectedDate] = useState(null); //request option
  const [hours,setHours] = useState(1); //request option
  const [previewData, setPreviewData] = useState([]); //request option
  const [status, setStatus] = useState(null); //request option
  const editPreviewData = async (args) => {
    if(selEmployeeData != "Select Employee" && selectedDate != null && shiftOption != "Select Shift"){
    const data  = await GET_Preview(args);
    setPreviewData(data);
    }
    }
  const submitEdit = async (args) => {
    if(selEmployeeData != "Select Employee" && selectedDate != null && shiftOption != "Select Shift"){
    const data = await transform_shift(args);
    setStatus(data)
    }
  }

  //remove modal states
  const removePreviewData = async (args) => {
    if(selEmployeeData != "Select Employee" && selectedDate != null){
      const data  = await previewRemoveShift(args);
      setPreviewData(data);
      }
  }
  const submitRemove = async (args) => {
    if(selEmployeeData != "Select Employee" && selectedDate != null){
      const data = await removeShift(args);
      setStatus(data)
      }
  }

  //pdf modal states
  const [selectedDate1, setSelectedDate1] = useState(null); //request option
  const [selectedDate2, setSelectedDate2] = useState(null); //request option
  const [pdfBlob, setPdfBlob] = useState(null); //request option
  const EmpDataA = [{name: "Oscar Maldonado", e_id: "000002" }, {name: "Jennifer Maldonado", e_id: "00001" }, {name: "Juan Pablo", e_id: "001111" }, {name: "Maria Maldonado", e_id: "003222" }, {name: "Jose Adalberto Enciso", e_id: "230114" }, {name: "PRINT_ALL", e_id: "PRINT_ALL" }];
  const EmpData = ["Oscar Maldonado","Jennifer Maldonado","Juan Pablo","Maria Maldonado","Jose Adalberto Enciso", "PRINT_ALL"];  
  const [emp, setEmp] = useState("Select Employee");
  const [empData, setEmpData] = useState(""); //request option
  const gen_pdf = async (args) => {
    if(selectedDate1 != null && selectedDate2 != null && emp != "Select Employee"){
      const data = await pdf_get(args);
     setPdfBlob(data);
      

    }
  }

  useEffect(()=>{
    if(emp != "Select Employee"){
    const empres = EmpDataA.filter((val)=>{
      if(emp == val.name){
        return val;
      }
    })
    setEmpData(empres[0].e_id);
  }

},[emp])

  useEffect(()=>{
    if(employee != "Select Employee"){
    const emp = employeeData.filter((val)=>{
      if(employee == val.name){
        return val;
      }
    })
    setSelEmployeeData(emp[0].e_id);
  }
},[employee])



  const handleModalOpen = (val) => {
    if(val == "edit"){
      setIsModalEditOpen(true);
    }
    if(val == "rm"){
      setIsModalRmOpen(true);
    }
    if(val == "gen"){
      setIsModalGenOpen(true);
    }
  };

  const handleModalClose = (val) => {
    if(val == "edit"){
      setStatus(null);
      setEmployee("Select Employee");
      setSelEmployeeData("");
      setShiftOption("Select Shift");
      setPreviewData([])
      setSelectedDate(null);
      setHours(1);
      setIsModalEditOpen(false);
    }
    if(val == "rm"){
      setStatus(null)
      setEmployee("Select Employee");
      setSelEmployeeData("");
      setShiftOption("Select Shift");
      setPreviewData([])
      setSelectedDate(null);
      setIsModalRmOpen(false);
    }
    if(val == "gen"){
      setEmp("Select Employee");
      setPdfBlob(null);
      setSelectedDate1(null);
      setSelectedDate2(null);
      setIsModalGenOpen(false);
    }
  };
  // component init
  return (
    <>
    <CardGrid>
      <Card onClick={()=>handleModalOpen("edit")}>
        <h2 className="text-black mb-3">Edit Employee Shift</h2>
        <SubComponent>
        <h3 className="text-gray-800/50">Utility</h3>
        <p className="text-gray-800/50">Edit start or end shift time for a given employee</p>
        </SubComponent>
      </Card>
      <Card onClick={()=>handleModalOpen("rm")}>
        <h2 className="text-black mb-3">Remove Employee Shift</h2>
        <SubComponent>
          <h3 className="text-gray-800/50">Utility</h3>
          <p className="text-gray-800/50">Remove employee shift day with a given id and date</p>
        </SubComponent>
      </Card>
      <Card onClick={()=>handleModalOpen("gen")}>
        <h2 className="text-black mb-3">Generate Employee Work Times</h2>
        <SubComponent>
          <h3 className="text-gray-800/50">Utility</h3>
          <p className="text-gray-800/50">Generate pdf files for employess</p>
        </SubComponent>
      </Card>
    
    </CardGrid>
   
    <div className="fixed bottom-0 left-0 w-full bg-red-500 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AlertCard title="Employee Alert" message="Jennifer missed today." />
          <AlertCard title="Shift Alert" message="Oscar changed his end shift" />
          <AlertCard title="Generation Alert" message="Generated Time Report for Oscar" />
        </div>
      </div>
    </div>
  
      {/* edit modal */}
    {isModalEditOpen && (
        <>
          <ModalBackground onClick={()=>handleModalClose("edit")} />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle className="text-black">Edit Utility</ModalTitle>
              <ModalCloseButton onClick={()=>handleModalClose("edit")}>
              <FaTimes className="w-5 h-5 mr-2" />
              </ModalCloseButton>
            </ModalHeader>
            {status == null ? <>
            <div className="p-4 grid grid-cols-4 border border-b-2 border-black/20">
            <div >
                <p className="text-black">Select Shift Options</p>
              <DropdownButton setData={setShiftOption} dataValue={shiftOption} data={{data: shiftDefault}} />
              </div>
              <div >
                <p className="text-black">Select Employee</p>
              <DropdownButton setData={setEmployee} dataValue={employee} data={{data: EmpOptions}}/>
              </div>
              <div>
                <p className="text-black">Select Date</p>
              <Datepicker selected={selectedDate} setSelected={setSelectedDate}/>
              </div>
              <div>
                <p className="text-black">Enter Change In Hours</p>
              <input className="text-black w-40 " type="number" value={hours} onChange={(e)=>{setHours(e.target.value)}} placeholder="Enter Hours" min={0} max={20}/>
              </div>
            </div>
            <div className="text-black flex justify-center items-center text-3xl mt-20">
            <div className="w-auto h-auto text-center opacity-50">
            {previewData.length > 0 ? <div> {employee}{previewData.map(obj=>{if(obj.SHIFT_CHANGE == true){return <div key={obj.SHIFT_DATE} className="bg-red-500/80 rounded-lg">{shiftOption == "end" ? obj.SHIFT_END : obj.SHIFT_START}</div>}else{return <div key={obj.SHIFT_DATE} >{shiftOption == "end" ? obj.SHIFT_END : obj.SHIFT_START}</div>}})} </div>: <div> Loading Preview...</div>}
            
            </div>
          </div>
            <div className="flex justify-around items-center mt-20">
            <button className="rounded-lg text-black border border-3 bg-zuma-green/80 px-4 py-2" onClick={()=>{editPreviewData({e_id: selEmployeeData, date: selectedDate, shiftOption: shiftOption, hours: hours})}}>Preview Change</button>    
          <button className="rounded-lg text-black border border-3 bg-orange-500/80 px-4 py-2" onClick={()=>{submitEdit({e_id: selEmployeeData, date: selectedDate, shiftOption: shiftOption, hours: hours})}}>Change Shift Entry</button>
          </div> </> : <div className="text-gray-900 font-bold"> Entry Changed!</div> }
           
          </ModalContainer>
        </>
      )}
      {/* rm modal */}
      {isModalRmOpen && (
        <>
          <ModalBackground onClick={()=>handleModalClose("rm")} />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle className="text-black">Remove Shift Utility</ModalTitle>
              <ModalCloseButton onClick={()=>handleModalClose("rm")}>
              <FaTimes className="w-5 h-5 mr-2" />
              </ModalCloseButton>
            </ModalHeader>
            <>
            
            {status == null ? <>
            <div className="p-4 grid grid-cols-2 border border-b-2 border-black/20">
           
              <div >
                <p className="text-black">Select Employee</p>
              <DropdownButton setData={setEmployee} dataValue={employee} data={{data: EmpOptions}}/>
              </div>
              <div>
                <p className="text-black">Select Date</p>
              <Datepicker selected={selectedDate} setSelected={setSelectedDate}/>
              </div>
            </div>
            <div className="text-black flex justify-center items-center text-3xl mt-20">
            <div className="w-auto h-auto text-center opacity-50">
            {previewData.length > 0 ? <div> {employee}{previewData.map(obj=>{if(obj.SHIFT_CHANGE == true){return <div key={obj.SHIFT_DATE} className="bg-red-500/80 rounded-lg">{obj.SHIFT_DATE}</div>}else{return <div key={obj.SHIFT_DATE} >{obj.SHIFT_DATE}</div>}})} </div>: <div> Loading Preview...</div>}
            
            </div>
          </div>
            <div className="flex justify-around items-center mt-20">
            <button className="rounded-lg text-black border border-3 bg-zuma-green/80 px-4 py-2" onClick={()=>{removePreviewData({e_id: selEmployeeData, date: selectedDate, shiftOption: shiftOption, hours: hours})}}>Preview Change</button>    
          <button className="rounded-lg text-black border border-3 bg-orange-500/80 px-4 py-2" onClick={()=>{submitRemove({e_id: selEmployeeData, date: selectedDate, shiftOption: shiftOption, hours: hours})}}>Change Shift Entry</button>
          </div> </> : <div className="text-gray-900 font-bold"> Entry Removed!</div> }
            </>
         
      
          </ModalContainer>
        </>
      )}
      {/* gen modal */}
      {isModalGenOpen && (
        <>
          <ModalBackground onClick={()=>handleModalClose("gen")} />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle className="text-black">Generate Utility</ModalTitle>
              <ModalCloseButton onClick={()=>handleModalClose("gen")}>
              <FaTimes className="w-5 h-5 mr-2" />
              </ModalCloseButton>
            </ModalHeader>
            <div className="p-4 grid grid-cols-3 border border-b-2 border-black/20">
           
              <div >
                <p className="text-black">Select Employee</p>
              <DropdownButton setData={setEmp} dataValue={emp} data={{data: EmpData}}/>
              </div>
              <div>
                <p className="text-black">Select Date</p>
              <Datepicker selected={selectedDate1} setSelected={setSelectedDate1}/>
              </div>
              <div>
                <p className="text-black">Select Date</p>
              <Datepicker selected={selectedDate2} setSelected={setSelectedDate2}/>
              </div>
            </div>
            
           <PdfViewer fileBlob={pdfBlob} />
           <div className="flex justify-center items-center mt-20 mb-20">
  <button 
    className="bg-zuma-green text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-zuma-green-dark focus:ring-opacity-50"
    onClick={() => {gen_pdf({e_id: empData, date1: selectedDate1, date2: selectedDate2})}}
  >
    Generate PDF
  </button>
</div>
            
          </ModalContainer>
        </>
      )}
    


    
     </>
  );
};

export default Employee;