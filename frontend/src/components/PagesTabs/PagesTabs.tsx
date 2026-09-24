import { useEffect, useState } from 'react';

import { pushToRoute } from '../../utils/next';
import { useRouter } from '../Link';
import Tabs from '../Tabs/Tabs';

export const TabsId = {
  INPUT: 'input',
  TASKS: 'tasks',
  ABOUT: 'about',
  API_INTEGRATION: 'api-integration',
}

const tabs = [
  { route: '/', id: TabsId.INPUT, name: 'Skanowanie', content: <></> },
  { route: '/tasks', id: TabsId.TASKS, name: 'Zadania', content: <></> },
  { route: '/about', id: TabsId.ABOUT, name: 'Informacje', content: <></> },
  {
    route: '/api-integration',
    id: TabsId.API_INTEGRATION,
    name: 'API',
    content: <></>,
  },
]

const PagesTabs = ({ initialSelectedTab, onTabChange = null }) => {
  const [selectedTabId, setSelectedTabId] = useState(initialSelectedTab)
  const router = useRouter()

  useEffect(() => {
    setSelectedTabId(initialSelectedTab)
  }, [initialSelectedTab])

  const handleTabChangeFn = tab => {
    setSelectedTabId(tab.id)
    pushToRoute(router, tab.route)
    if (onTabChange) {
      onTabChange(tab.id)
    }
  }

  return (
    <Tabs
      className="app-tabs"
      tabs={tabs}
      selectedTab={selectedTabId}
      onTabChange={handleTabChangeFn}
    />
  )
}

export default PagesTabs
