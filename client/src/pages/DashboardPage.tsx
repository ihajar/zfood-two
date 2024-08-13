import { Route, Routes } from "react-router-dom"



const DashboardPage = () => {
  return (
    <Routes>
      <Route path="home" element={<div>Home section</div>} />
      <Route path="orders" element={<div>Orders section</div>} />
      <Route path="profile" element={<div>Profile section</div>} />
      <Route path="restaurants" element={<div>Restau.. section</div>} />

    </Routes>
  )
}

export default DashboardPage