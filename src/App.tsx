import SearchBar from './components/search-bar'
import Layout from './components/layout'
import ListUser from './components/list-user'
import { useAppContext } from './context/app-context'

const App = () => {
  const { userData } = useAppContext()

  return (
    <Layout>
      <SearchBar />
      <ListUser users={userData} />
    </Layout>
  )
}

export default App
