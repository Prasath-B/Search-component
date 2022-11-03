import { useEffect,useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setdata] = useState([]);
  const [items, setitems] = useState([])
  const [query, setquery] = useState('')
  const [filterValue, setfilterValue] = useState("none")
  const [searchParam] = useState(["API","Description","Auth","HTTPS","Cors","Link","Category"])

  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData() {
    await axios.get("https://api.publicapis.org/entries")
    .then((res)=>{
      setdata(res.data.entries)
      setitems(res.data.entries)
    })
    .catch((err)=>console.log(err))
  }

  function search(e) {
    setquery(e.target.value)
    if(filterValue === "none"){
        const sortedData = data.filter((item) => {
          return searchParam.some((newItem) => {
                let res = item[newItem].toString().toLowerCase()
                return  res.indexOf(query.toLowerCase()) > -1 
          });
      });
      setitems(sortedData)
    }else{
      const sortedData =  data.filter((item) => {
              let res = item[filterValue].toString().toLowerCase()
              return  res.indexOf(query.toLowerCase()) > -1
      });
      setitems(sortedData)
    }

  }

 
  
  
  

  return (
    <>
    <h2 style={{textAlign:"center"}}>Implementing word to word search</h2>
    <div className="App">
        <input type="text" 
        placeholder='Search'
        value={query} 
        onChange={search}
        />
        <div className='filter'>
        <label htmlFor="filter">Filter</label>
        <select name="filter" id="" value={filterValue} onChange={(e)=>setfilterValue(e.target.value)}>
          <option value="none">Select a value</option>
          <option value="API">API</option>
          <option value="Description">Description</option>
          <option value="Auth">Auth</option>
          <option value="Cors">Cors</option>
          <option value="Link">Link</option>
          <option value="Category">Category</option>
        </select>
        </div>
    </div>
    {items.map((ele)=>{
       return <ul>
       <li>API : {ele.API}</li>
       <li>Description : {ele.Description}</li>
       <li>Auth : {ele.Auth}</li>
       <li>Cors : {ele.Cors}</li>
       <li>Link : {ele.Link}</li>
       <li>Category : {ele.Category}</li>
     </ul>
    })}
    
    </>
  );
}

export default App;
