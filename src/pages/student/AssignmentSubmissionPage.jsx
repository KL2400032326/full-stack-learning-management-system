import Card from '../../components/common/Card'
import Textarea from '../../components/common/Textarea'
import Dropzone from '../../components/forms/Dropzone'
import Button from '../../components/common/Button'

const AssignmentSubmissionPage = () => (
  <div className="page">
    <h1 className="page-title">Assignment Submission</h1>
    <Card className="space-y-4 md:max-w-2xl">
      <Textarea label="Assignment notes" placeholder="Add your summary..." />
      <Dropzone label="Upload assignment file" accept=".pdf,.doc,.docx" />
      <Button>Submit assignment</Button>
    </Card>
  </div>
)

export default AssignmentSubmissionPage
