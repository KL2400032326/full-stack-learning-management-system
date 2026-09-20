import Input from '../../components/common/Input'
import Textarea from '../../components/common/Textarea'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Dropzone from '../../components/forms/Dropzone'

const CreateCoursePage = () => (
  <div className="page">
    <h1 className="page-title">Create Course</h1>
    <Card className="space-y-4">
      <Input label="Course title" placeholder="Mastering React + Spring Boot" />
      <Textarea label="Description" placeholder="Write course overview..." />
      <div className="grid gap-4 md:grid-cols-2">
        <Dropzone label="Thumbnail upload" accept="image/*" />
        <Dropzone label="Video upload" accept="video/*" />
      </div>
      <Textarea label="Add lessons" placeholder="Lesson 1, Lesson 2..." />
      <Textarea label="Add quiz" placeholder="Add quiz questions..." />
      <Button>Publish draft</Button>
    </Card>
  </div>
)

export default CreateCoursePage
