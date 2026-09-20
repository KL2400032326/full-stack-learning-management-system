import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const PlatformSettingsPage = () => (
  <div className="page">
    <h1 className="page-title">Platform Settings</h1>
    <Card className="grid gap-3 md:max-w-xl">
      <Input label="Platform Name" defaultValue="NovaLMS" />
      <Input label="Support Email" defaultValue="support@novalms.com" />
      <Input label="Default Currency" defaultValue="USD" />
      <Button>Save settings</Button>
    </Card>
  </div>
)

export default PlatformSettingsPage
