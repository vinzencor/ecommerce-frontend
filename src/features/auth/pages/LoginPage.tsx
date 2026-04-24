import AuthLayout from '../components/AuthLayout'
import SignInForm from '../components/SignInForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="The art of refined shopping"
      subtitle={
        <>
          Discover exclusive collections, early access
          <br />
          to sales, and a seamless experience.
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  )
}
