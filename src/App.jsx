import Topbar from './Components/Topbar'
import Profile from './Components/Profile'
import Pagination from './Components/Pagination'
import { useState } from 'react'

const App = () => {
  const [Data, setData] = useState(null);
  Data && console.clear();
  return (
    <div className=''>
      <Topbar Data={Data} setData={setData} />
      <Profile Data={Data} />
      <Pagination />
    </div>
  )
}

export default App