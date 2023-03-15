import Header from '@/components/home/Header'
import PageLayout from '@/components/layouts/page'

export default function IndexPage() {
  return (
    <PageLayout
      title='Mohit Singh | Probably a Software Engineer'
      description='An annoyingly curious creature with dark powers and a jack of several dozen unrelated trades disguised as a software engineer'
    >
      <Header />
    </PageLayout>
  )
}
