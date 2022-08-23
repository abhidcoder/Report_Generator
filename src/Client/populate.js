import React,{useState,useEffect}  from "react";
import Button from '@mui/material/Button';
import File from "../Backend_Processing/excel"

const App = () => {

const [DATA,setDB] = useState([]);
const [control,setcontrol] = useState(0);
const [go,setGo] = useState(0);
const[datas,setDatas]=useState({
 min:"",max:"",total:"",namemin:"",namemax:"",productmax:"",productmin:""
})

useEffect(() => {
if(control===0){
fetch('http://localhost:8005/get')
    .then(response => response.json())
    .then((jsonRes) => setDB(jsonRes))
    
}
setcontrol(1);
},[control])

let min,max,total,namemin,namemax,productmax,productmin;

const Expenditure_Calculations=()=>{
var nums=Number(DATA[0].Price)
min=nums;
max=nums;
total=0;
namemin="";
namemax="";
productmax="";
productmin="";
for(var t=0;t<DATA.length;t++){
  total=total+Number(DATA[t].Price);
  if(Number(DATA[t].Price)>max){
    max=Number(DATA[t].Price)
    namemax=DATA[t].Username
    productmax=DATA[t].Item
  }
  if(Number(DATA[t].Price)<min){
    min=Number(DATA[t].Price)
    namemin=DATA[t].Username
    productmin=DATA[t].Item
  }
}

setDatas({total,namemin,namemax,min,max,productmax,productmin})
setGo(1)
  
}

  return (
    <div style={{ padding: "30px" }}>
      <File data={DATA}/>
      <h3 className="text-center">Your Top 10 Purchase Details</h3>
      <br></br>
      <div className="text-center" style={{marginTop:"2%"}}>
      <Button  variant="contained" color="success" onClick={Expenditure_Calculations}>Click Here To Get The Total Summary</Button>
      </div>
      <br></br>
      <table class="table table-bordered">
        <thead style={{ background: "yellow" }}>
          <tr>
            <th scope="col">User_id</th>
            <th scope="col">Brand</th>
            <th scope="col">Price in $</th>
          </tr>
        </thead>
        <tbody>
          {DATA.slice(0,10).map((studentsData) => (
            <tr>
              <td>
                <strong>{studentsData.Username}</strong>{" "}
              </td>
              <td>{studentsData.Item}</td>
              <td>{studentsData.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center" style={{marginTop:"2%"}}>
      {go>0 && 
      <div style={{marginTop:"4%"}}>
        <div><h4 style={{color:"#1FEAE1"}}>Maximum Amount is Spent By : {datas.namemax} The Amount is ${datas.max} On {datas.productmax}</h4></div>
        <div><h4 style={{color:"#22F076"}}>Minimum Amount is Spent By : {datas.namemin} The Amount is ${datas.min} On {datas.productmin}</h4></div>
        <div><h4 style={{color:"#DF4619"}}>The Total Amount Spent is: ${datas.total}</h4></div>
      </div>
      }
      </div>
    </div>
  );
};

export default App;