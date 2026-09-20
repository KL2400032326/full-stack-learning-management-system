import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Textarea from '../../components/common/Textarea'
import Button from '../../components/common/Button'

const EditContentPage = () => (
  <div className="page">
    <h1 className="page-title">Edit Course Content</h1>
    <Card className="space-y-4 md:max-w-2xl">
      <Input label="Content title" defaultValue="Advanced React Patterns Module" />
      <Textarea label="Description" defaultValue="Update module description and resources." />
      <Button>Update content</Button>
    </Card>
  </div>
)

export default EditContentPage
