import { useState } from "react";
import styled from "styled-components";
import Banner from "./components/banner/Banner";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [user,setUser] = useState({
    id: 1,
    name: "Ann Hand",
    institution: {
      id: 1,
      name: "Jefferson High School"
    },
    notifications: 7
  })

  return (
    <AppDiv>
      <Banner user={user}/>
      <Sidebar />
      <Dashboard />
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
