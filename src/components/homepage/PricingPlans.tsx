import React from "react";

interface PricingCardProps {
  planPayment: () =>void;
}

const PricingCards: React.FC<PricingCardProps> = ({planPayment}) => {
  const plans = [
    {
      type: "STARTER PLAN",
      price: 180,
      sessions: 4,
      contents: [
        "Great for testing.",
        "Ideal for trials."
      ],
      buttonText: "Start Now",
      highlight: false,
      sessionColor: "text-[#64BA9F]"
    },
    {
      type: "GROWTH PLAN",
      price: 240,
      sessions: 4,
      contents: [
        "Perfect for specific goals.",
        "For mid-level professionals."
      ],
      buttonText: "Choose Growth Plan",
      highlight: true,
      sessionColor: "text-amber-500"
    },
    {
      type: "PRO PLAN",
      price: 288,
      sessions: 8,
      contents: [
        "Best for steady progress.",
        "Great for preparation."
      ],
      buttonText: "Go Pro",
      highlight: false,
      sessionColor: "text-[#64BA9F]"
    },
    {
      type: "ULTIMATE PLAN",
      price: 396,
      sessions: 12,
      contents: [
        "Best for long-term growth",
        "Ideal for professionals.",
        "Includes exclusive bonus."
      ],
      buttonText: "Get the Ultimate Plan",
      highlight: false,
      sessionColor: "text-[#64BA9F]"
    }
  ];

  return (
    <div className="font-montreal grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 w-full max-w-6xl mx-auto font-normal lg:bg-[#EFF6FC] rounded-[20px]">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative flex-1 rounded-3xl p-6 flex flex-col justify-between duration-700 hover:bg-[#262B3A] hover:stroke-white hover:border-none hover:text-[#EFF6FC] group
            ${plan.highlight
              ? "bg-[#262B3A] text-white lg:-mt-12 lg:mb-10 z-10 shadow-[0px_30px_35px_0px_#262B3A40]" : "lg:bg-transparent bg-[#EFF6FC]"}`}
        >
          {plan.highlight && (
            <div className="absolute -top-4 lg:right-0 sm:right-auto right-0 lg:ml-0 sm:ml-5 ml-0 lg:mr-0 sm:mr-0 mr-5 lg:left-0 flex justify-center">
              <div className="px-4 md:py-[5px] py-1 bg-[#EFF6FC] text-[#262B3A] rounded-full flex items-center text-sm">
                <span className="mr-1">🔥</span> Most Popular
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4 border-b border-[#1A1A1A] pb-6">
              <div className="flex justify-between text-xs">
                <div className="bg-opacity-20 bg-[#B5B5B529] rounded-lg px-4 py-2 inline-block">
                  {plan.type}
                </div>
                <div className={`${plan.highlight ? "text-[#ECB25E]" : "text-[#64BA9F]"} group-hover:text-[#ECB25E] my-auto`}>
                  {plan.sessions} SESSIONS
                </div>
              </div>
              <div>
                <div className={`flex items-center mt-2 ${plan.highlight && 'text-[#EFF6FC]'}`}>
                  <span className="md:text-5xl text-4xl font-bold">${plan.price}</span>
                  <span className="ml-2">/ Month</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {plan.contents.map((content, idx) => (
                <div key={idx} className="flex items-center font-light sm:text-base text-sm">
                  <div className={`mr-3 ${plan.highlight ? "" : "text-[#64BA9F] group-hover:text-white"}`}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                      className={`${plan.highlight ? "stroke-[#ECB25E]" : "stroke-[#64BA9F] group-hover:stroke-white"} xl:w-[20px] md:w-[14px] xl:h-[20px] md:h-[14px]`}>
                      <path d="M9.9987 1.6387C9.36736 1.4404 8.6955 1.3335 7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016C1.33203 11.682 4.3168 14.6668 7.9987 14.6668C11.6806 14.6668 14.6654 11.682 14.6654 8.00016C14.6654 7.30336 14.5584 6.63152 14.3602 6.00016" strokeLinecap="round" />
                      <path d="M5.66602 6.33333L7.99935 8.66667L13.9995 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>{content}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={planPayment} className={`text-sm mt-10 w-full py-3 rounded-xl group-hover:bg-alice-blue group-hover:text-black
            ${plan.highlight
              ? "bg-white text-slate-800"
              : "bg-slate-400 text-white group-hover:bg-alice-blue group-hover:text-black"}`}>
            {plan.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;