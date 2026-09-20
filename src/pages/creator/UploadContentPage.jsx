import Card from '../../components/common/Card'
import Dropzone from '../../components/forms/Dropzone'
import Button from '../../components/common/Button'

const UploadContentPage = () => (
  <div className="page">
    <h1 className="page-title">Upload New Content</h1>
    <Card className="space-y-4 md:max-w-2xl">
      <Dropzone label="Upload video" accept="video/*" />
      <Dropzone label="Upload supporting assets" accept=".zip,.pdf,.pptx" />
      <Button>Save upload</Button>
    </Card>
  </div>
)

export default UploadContentPage
