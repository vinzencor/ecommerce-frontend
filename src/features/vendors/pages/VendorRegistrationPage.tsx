import { useState } from 'react'
import VendorStepper from '../components/VendorStepper'
import VendorRegistrationForm from '../components/VendorRegistrationForm'
import VendorBusinessDetailsForm from '../components/VendorBusinessDetailsForm'
import VendorBankDetailsForm from '../components/VendorBankDetailsForm'

export default function VendorRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col">
            <h1 className="text-[22px] md:text-[26px] text-black tracking-tight">Seller Account</h1>
          </div>

          {/* Stepper Area */}
          <div className="w-full flex justify-center -mt-2">
            <VendorStepper currentStep={currentStep} />
          </div>

          {/* Form Area */}
          <div className="-mt-2 md:-mt-4 mb-32">
            {currentStep === 1 && <VendorRegistrationForm onNext={handleNext} />}
            {currentStep === 2 && (
              <VendorBusinessDetailsForm onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 3 && <VendorBankDetailsForm onBack={handleBack} />}
          </div>
        </div>
      </div>
    </div>
  )
}
