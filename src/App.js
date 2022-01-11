import { useEffect, useState } from "react";
import styled from "styled-components";
import { APIaddress } from "./apiAddress";
import Banner from "./components/banner/Banner";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from 'react-router-dom';
import MilestonesPage from "./components/milestones/MilestonesPage";

function App() {
  const [user,setUser] = useState({})
  const [milestones,setMilestones] = useState([])

  useEffect(()=>{
    fetch(`${APIaddress}/users/1`).then(r=>r.json()).then(data=>{
      let userDataOnly = Object.assign({},data)
      delete userDataOnly.milestones;
      setUser(userDataOnly);
      setMilestones(data.milestones.map(milestone=>{
        //this converts the UTCstring for date into a js date object
        let updatedMilestone = Object.assign({},milestone);
        updatedMilestone.date = new Date(milestone.date);
        return updatedMilestone
      }).sort((a,b)=>a.date-b.date));
    })
  },[])

  if (!user.id) {
    return null
  }

  return (
    <AppDiv>
      <Banner user={user}/>
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Dashboard milestones={milestones} user={user} setMilestones={setMilestones}/>}/>
        <Route exact path="/milestones" element={<MilestonesPage milestones={milestones} user={user} setMilestones={setMilestones}/>}/>
      </Routes>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: [start sidebar-start] 130px [sidebar-end content-start] auto [content-end end];
  grid-template-rows: [top banner-start] 100px [banner-end content-top] auto [content-bottom bottom];
  grid-template-areas: 
    "sidebar banner" 
    "sidebar content"
`

export default App;
