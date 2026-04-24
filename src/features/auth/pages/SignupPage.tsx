import AuthLayout from '../components/AuthLayout'
import CreateAccountForm from '../components/CreateAccountForm'

export default function SignupPage() {
  return (
    <AuthLayout
      title="Join thousands of discerning shoppers"
      subtitle="Create your free account and unlock an elevated shopping experience from day one."
    >
      <CreateAccountForm />
    </AuthLayout>
  )
}
