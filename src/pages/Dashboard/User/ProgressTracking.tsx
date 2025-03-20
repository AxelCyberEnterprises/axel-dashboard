import React, { useState } from 'react'
import circleCheck from '../../../assets/images/svgs/circle-check.svg';
import circleExclamation from '../../../assets/images/svgs/circle-exclamation.svg';
import plusCircle from '../../../assets/images/svgs/plus-circle.svg';
import trophy from '../../../assets/images/svgs/trophy.svg';
import starAward from '../../../assets/images/svgs/star-award.svg';
import horse from '../../../assets/images/svgs/horse.svg';
import ActionModal from '@/components/modals/modalVariants/ActionModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';

const ProgressTracking: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionItems = [
    "Goals & Achievements",
    "Performance Analysis",
  ];

  const cardData = [
    {
      title: 'Improve Speech Pace',
      wordRate: '120-150 words/min',
      percentage: 60
    },
    {
      title: 'Reduce filler words',
      wordRate: '>3 per min',
      percentage: 80
    },
    {
      title: 'Enhance content structure',
      wordRate: 'Daily Practice',
      percentage: 40
    },
  ]

  const achievementData = [
    {
      title: 'Speech Master',
      portion: 2,
      total: 3,
      level: 1,
      note: 'Complete 50 speeches'
    },
    {
      title: 'Pace Perfect',
      portion: 30,
      total: 50,
      level: 2,
      note: 'Maintain ideal pace for 5 speeches'
    },
    {
      title: 'Audience Favorite',
      portion: 90,
      total: 100,
      level: 3,
      note: 'Get 95% engagement score'
    },
  ]

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80 && percentage <= 100) return '#40B869';
    if (percentage >= 60 && percentage < 80) return '#F5B546';
    return '#DD524D';
  };

  const getPercentage = (portion: number, total: number) => {
    const decimal = portion / total;
    const percentage = decimal * 100;
    const fixedPercentage = percentage.toFixed(0)
    return Number(fixedPercentage);
  }

  const getLevelImage = (level: number) => {
    if (level === 1) return horse;
    if (level === 2) return trophy;
    if (level === 3) return starAward;
    return ''; 
};

  const userDetails = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    company: 'Tangerine Plc',
    pfp: ''
  }

  return (
    <>
      <ActionModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        icon={circleCheck}
        head='Payment Successful'
        message='Your credit has been successfully processed! Thank you for your transaction.'
        cta='Confirm'
        ctaClassName='border border-[#D5D7DA] text-[#FFFFFF]'
      />
      <ActionModal
        show={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        icon={circleExclamation}
        head='Payment Unsuccessful'
        message='Your payment could not be processed. Please try again or check your payment details.'
        cta='Cancel'
        ctaClassName='bg-[#262B3A] text-[#414651]'
      />
      <div className='scrollbar-hide px-8'>
        <section className='py-5 flex gap-2 items-start justify-between'>
          <div>
            <h3 className='xl:text-[24px] text-[18px] text-[#262B3A]'>Progress Tracking</h3>
            <div className='bg-[#F2F2F2] rounded-[10px] p-1 my-5'>
              {sectionItems.map((item, index) => (
                <Button
                  onClick={() => { setActiveIndex(index) }}
                  className={`${activeIndex === index ? 'bg-white text-[#252A39]' : 'text-[#6F7C8E] bg-[#F2F2F2]'} py-1 px-3 rounded-[6px] shadow-none transition-colors duration-700`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex mr-[5%]'>
            <div className='flex gap-2 items-center pr-4 mr-4 border-r border-[#E4E7EC]'>
              <div className={`${!userDetails.pfp && 'border border-[#D5D7DA] w-10 h-10 grid place-content-center rounded-full'}`}>
                {userDetails?.pfp ? <img
                  src={userDetails.pfp}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border"
                /> :
                  <p className="capitalize text-sm">{`${userDetails.firstname[0]}${userDetails.lastname[0]}`.toUpperCase()}</p>
                }
              </div>

              <div>
                <p>{userDetails.firstname} {userDetails.lastname}</p>
                <p className='text-[#474D63] text-sm font-light'>{userDetails.email}</p>
              </div>
            </div>
            <div>
              <p>Company</p>
              <p className='text-[#474D63] text-sm font-light'>{userDetails.company}</p>
            </div>
          </div>
        </section>
        <section className='flex justify-between'>
          <div>
            <h3 className="text-xl font-medium">Active Goals</h3>
            <p className="text-sm text-[#6F7C8E] mb-6">Here’s a quick overview of your active goals </p>
          </div>
          <Button
            type="button"
            onClick={() => { }}
            className="w-auto text-white px-6 bg-[#252A39]"
          >
            <img
              src={plusCircle}
              alt="Plus Circle"
              className="xl:w-[20px] xl:h-[20px] w-5 h-5 sm:text-base text-sm"
            />
            Set new goals
          </Button>
        </section>
        <section className='grid lg:grid-cols-3 grid-cols-1 gap-12'>
          {cardData.map((item) => (
            <Card className='gap-0 px-4 py-2 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]'>
              <div className='flex justify-between items-center mb-10'>
                <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                <p className='text-sm text-[#6F7C8E]'>{item.wordRate}</p>
              </div>
              <SegmentedProgressBar percent={item.percentage} color={getProgressBarColor(item.percentage)} divisions={5} />
              <p className='text-[#252A39D9] mt-3'>{item.percentage}% complete</p>
            </Card>
          ))}
        </section>
        <section className='grid lg:grid-cols-[2fr_3fr] grid-cols-1 gap-4 mt-6'>
          <div className='gap-0 px-4 py-2 rounded-[12px] border border-[#E0E0E0] shadow-[0px_2px_8px_0px_#252A3914]'>
            <div className='flex justify-between gap-4 items-center'>
              <div>
                <h3 className='text-[#252A39] lg:text-lg text-sm'>Recent Achievements</h3>
                <p className='sm:text-sm text-xs text-[#6F7C8E] py-2'>Here’s a list your of your earned achievements</p>
              </div>
              <p className='text-[#262B3A] border-b border-[#262B3A] sm:text-sm text-xs whitespace-nowrap'>View All</p>
            </div>
            {achievementData.map((item) => (
              <div className='flex gap-3 mb-6 px-2'>
                <div className={`flex flex-col items-center justify-between p-2 rounded-[6px] ${item.level === 1 && 'bg-[#64BA9F]'}  ${item.level === 2 && 'bg-[#ECB25E]'}  ${item.level === 3 && 'bg-[#C1C2B4]'}`}>
                  <div className='bg-[#FFFFFF33] rounded-full w-[50px] h-[50px] grid place-content-center'>
                    <img src={getLevelImage(item.level)} alt="level image" />
                  </div>
                  <p className='text-white text-xs'>LEVEL {item.level}</p>
                </div>
                <Card className='border-none shadow-none py-2 gap-2 w-full'>
                  <div className='flex justify-between items-center'>
                    <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                    <p className='text-sm text-[#6F7C8E]'>{item.portion}/{item.total}</p>
                  </div>
                  <SegmentedProgressBar
                    percent={getPercentage(item.portion, item.total)}
                    color={getProgressBarColor(getPercentage(item.portion, item.total))}
                    divisions={1} />
                  <p className='text-[#252A39D9] mt-1 sm:text-sm text-xs'>{item.note}</p>
                </Card>
              </div>

            ))}
          </div>
          <div className='border border-[#E0E0E0] rounded-[12px] p-3 h-fit'>
            <h4 className='text-[#252A39] lg:text-lg text-base'>Streak Statistics</h4>
            <p className='text-[#6F7C8E] text-sm'>Display streaks of  goal progress</p>
            <div className='border border-[#E0E0E0] p-3 flex gap-2 rounded-[12px] mt-4 mb-2'>
              <img src="" alt="" />
              <div>
                <p className='text-[#252A39]'>15</p>
                <p className='text-[#6F7C8E]'>Day streak</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>

  )
}

export default ProgressTracking
