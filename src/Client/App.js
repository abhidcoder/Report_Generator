import React,{useState}  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IMaskInput } from 'react-imask';





function App() {


const [name,setUser]= useState("")
const [item,setItem]= useState("")
const [price,setPrice]= useState("")
const [stats,setStats]= useState("NotDone")



const handleChange1=(e)=>{
 let val= e.target.value;
 setUser(val)


}

const handleChange2=(e)=>{

  let val1=e.target.value;
  setItem(val1)
   

}

const handleChange3=(e)=>{
let val2= e.target.value;

val2=val2.slice(1,val2.length)
setPrice(val2)


}



const Store=()=>{

 if((name.length)>0 && (item.length)>0 && (price.length)>0){

if(stats==="NotDone"){
const requestOptions  = {
    method: 'POST',
    mode: "cors",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name,item,price})
};
fetch('http://localhost:8005/store', requestOptions )
    .then(response => response.json()).then(setStats("Done"))
  }

  alert("Your Data Has Been Submitted");
  window.location.href="http://localhost:3000";
}
else{
  alert("Please Enter Valid Inputs")
}
  
}


  return (
   <div className="text-center" style={{marginTop:"4%"}}>
    <div style={{background:"pink"}}>
    <h1 >Your Buy Report</h1>
    </div>
    <div style={{marginBottom:"6%"}}>
    <br></br>
    <Button variant="outlined" onClick={()=>{window.location.href="http://localhost:3000/get"}}>Click Here To View Report</Button>
    <br></br>
    </div>
   <div>
   <TextField
  id="outlined-name"
  label="User Name"
  value={name}
  onChange={handleChange1}
/>
</div>
<br></br>
<div>
<TextField
  id="outlined-name"
  label="Brand"
  value={item}
  onChange={handleChange2}
/>
</div>
<br></br>
<br></br>
<div>
  <div>
  <label>Enter The Price</label>
  </div>
  <br></br>
<IMaskInput
      style={{height:"60px"}}
      mask="$0000000000"
      definitions={{
        '#': /[1-9]/,
      }}
      overwrite
      value={price}
      placeholder=" Enter Numbers Only"
      onChange={handleChange3}
    />
</div>
<br></br>
<div>
<div>
</div>
<Button variant="contained" onClick={Store}>Submit</Button>
</div>
</div>
  );
}



export default App;
