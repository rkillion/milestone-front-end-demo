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
  const [allUsers,setAllUsers] = useState([])
  const [assignments,setAssignments] = useState([])
  const [milestones,setMilestones] = useState([])

  useEffect(()=>{
    let userIDToFetch = 1;
    fetch(`${APIaddress}/users/${userIDToFetch}`).then(r=>r.json()).then(data=>{
      let userDataOnly = Object.assign({},data)
      delete userDataOnly.created_milestones;
      delete userDataOnly.assigned_milestones;
      setUser(userDataOnly);
      let milestoneIndeces = data.created_milestones.map(m=>m.id);
      let allMilestones = [...data.created_milestones,...data.assigned_milestones.filter(m=>milestoneIndeces.indexOf(m.id)===-1)];
      setMilestones(allMilestones.map(milestone=>{
        //this converts the UTCstring for date into a js date object
        let updatedMilestone = Object.assign({},milestone);
        updatedMilestone.date = new Date(milestone.date);
        //this sets action_required to true if the date is today or earlier
        let today = new Date();
        updatedMilestone.action_required = today>=updatedMilestone.date ? true : updatedMilestone.action_required;
        return updatedMilestone
      }).sort((a,b)=>a.date-b.date));
      fetch(`${APIaddress}/users`).then(r=>r.json()).then(data=>{
        let allUsersDataOnly = data.map(user=>{
          let userDataOnly = Object.assign({},user)
          delete userDataOnly.created_milestones;
          delete userDataOnly.assigned_milestones;
          return userDataOnly;
        })
        let institution = allUsersDataOnly.find(user=>user.id===userIDToFetch).institution;
        setAllUsers(allUsersDataOnly.filter(user=>user.institution===institution));
        fetch(`${APIaddress}/assignments`).then(r=>r.json()).then(data=>setAssignments(data))
      })
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
        <Route exact path="/milestones" element={<MilestonesPage assignments={assignments} milestones={milestones} user={user} allUsers={allUsers} setMilestones={setMilestones}/>}/>
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
