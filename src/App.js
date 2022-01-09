import { useEffect, useState } from "react";
import styled from "styled-components";
import { APIaddress } from "./apiAddress";
import Banner from "./components/banner/Banner";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [user,setUser] = useState({})
  const [milestones,setMilestones] = useState([])

  useEffect(()=>{
    fetch(`${APIaddress}/users/1`).then(r=>r.json()).then(data=>{
      let userDataOnly = Object.assign({},data)
      delete userDataOnly.milestones;
      setUser(userDataOnly);
      // console.log(data.milestones)
      setMilestones(data.milestones.map(milestone=>{
        //this converts the UTCstring for date into a js date object
        let updatedMilestone = Object.assign({},milestone);
        updatedMilestone.date = new Date(milestone.date);
        return updatedMilestone
      }).sort((a,b)=>a.date-b.date));
    })
    // setUser({
    //   id: 1,
    //   name: "Ann Hand",
    //   institution: "Jefferson High School",
    //   notifications: 7
    // });
    // setMilestones([
    //   {
    //     id: 1,
    //     title: "Board Meeting",
    //     date: new Date(2022,9,12),
    //     action_required: false
    //   },
    //   {
    //     id: 2,
    //     title: "End of Quarter",
    //     date: new Date(2022,11,1),
    //     action_required: true
    //   },
    //   {
    //     id: 3,
    //     title: "Spring Break",
    //     date: new Date(2022,3,26),
    //     action_required: false
    //   },
    //   {
    //     id: 4,
    //     title: "Second Quarter",
    //     date: new Date(2022,0,2),
    //     action_required: true
    //   }
    // ].sort((a,b)=>a.date-b.date))
  },[])

  if (!user.id) {
    return null
  }

  return (
    <AppDiv>
      <Banner user={user}/>
      <Sidebar />
      <Dashboard milestones={milestones}/>
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
