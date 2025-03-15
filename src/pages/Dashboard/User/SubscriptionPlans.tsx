import React, { useState } from 'react'
import arrowleft from '../../../assets/images/svgs/arrow-left.svg';
import circleCheck from '../../../assets/images/svgs/circle-check.svg';
import circleExclamation from '../../../assets/images/svgs/circle-exclamation.svg';
import PricingCards from '@/components/homepage/PricingPlans';
import { useNavigate } from "react-router-dom";
import PaymentPlanModal from '@/components/modals/modalVariants/PaymentPlanModal';

const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const planPayment = () => {
    setShowSuccessModal(true);
  }

  return (
    <>
      <PaymentPlanModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        icon={circleCheck}
        head='Payment Successful'
        message='Your credit has been successfully processed! Thank you for your transaction.'
        cta='Confirm'
        ctaClassName='border border-[#D5D7DA] text-[#FFFFFF]'
      />
      <PaymentPlanModal
        show={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        icon={circleExclamation}
        head='Payment Unsuccessful'
        message='Your payment could not be processed. Please try again or check your payment details.'
        cta='Cancel'
        ctaClassName='bg-[#262B3A] text-[#414651]'
      />
      <div className=''>
        <div className='border-t border-b border-[#E4E7EC] py-5 px-8 flex gap-2 items-start'>
          <img
            src={arrowleft}
            alt="left arrow"
            className="xl:w-[20px] md:w-[14px] lg:mt-[8px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div>
            <h3 className='xl:text-[24px] text-[18px] text-[#262B3A]'>Plans and Pricing</h3>
            <p className='font-light sm:text-base text-sm sm:mt-0 mt-2'>Simple pricing. No hidden fees. Enjoy advanced features</p>
          </div>
        </div>
        <div className="sm:pt-32 pt-16 px-8">
          <PricingCards
            planPayment={planPayment}
          />
        </div>
        <div className="py-16 px-8 flex flex-col justify-center items-center">
          <h3 className='lg:text-[24px] text-lg'>Enterprise & Team Plans</h3>
          <p className='font-light pb-3 pt-2 text-center md:w-[37%] sm:w-[65%] w-full'>Request your own <span className='text-[#6F7C8E]'>custom price</span>  and get a <span className='text-[#6F7C8E]'>custom solution</span> for your organization</p>
          <button className='bg-[#262B3A] rounded-[10px] md:w-[20%] sm:w-[35%] w-full py-2 text-sm font-light'>Send a Request</button>
        </div>
      </div>
    </>

  )
}

export default SubscriptionPlans
