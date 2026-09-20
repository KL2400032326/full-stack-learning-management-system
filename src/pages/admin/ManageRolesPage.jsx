import { roleOptions } from '../../data/dummyData'
import Card from '../../components/common/Card'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import { useState } from 'react'

const ManageRolesPage = () => {
  const [defaultRole, setDefaultRole] = useState('student')

  return (
    <div className="page">
      <h1 className="page-title">Manage Roles</h1>
      <Card className="space-y-3 md:max-w-lg">
        <Select label="Default registration role" options={roleOptions} value={defaultRole} onChange={e => setDefaultRole(e.target.value)} />
        <Button>Save role config</Button>
      </Card>
    </div>
  )
}

export default ManageRolesPage
