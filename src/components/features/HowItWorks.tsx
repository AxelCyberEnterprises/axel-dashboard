import clsx from "clsx";
import HowItWorksCard from "./HowItWorksCard";
import HowItWorksCardOneSVG from "./svgs/HowItWorksCardOneSVG";
import HowItWorksCardThreeSVG from "./svgs/HowItWorksCardThreeSVG";
import HowItWorksCardTwoSVG from "./svgs/HowItWorksCardTwoSVG";

function HowItWorks() {
  let how_it_works_sections = [
    {
      title: "AI Realistic Enhancements for users",
      content:
        "Our AI progress tracking for Pitch Improvement is a cutting-edge solution for individuals and teams to help refine their pitch delivery. Every session is automatically recorded, allowing you to improve your performance. Whether for business, sales, or public speaking, this tool ensures continuous improvement and success.",
      svg: <HowItWorksCardOneSVG className="w-full h-[20rem]" />,
    },
    {
      title: "AI Progress Tracking for Pitch Improvement",
      content:
        "Our AI progress tracking for Pitch Improvement is a cutting-edge solution for individuals and teams to help refine their pitch delivery. Every session is automatically recorded, allowing you to improve your performance. Whether for business, sales, or public speaking, this tool ensures continuous improvement and success.",
      svg: (
        <HowItWorksCardTwoSVG className="w-[24rem] h-[20rem] mt-22 lg:mt-0" />
      ),
    },
    {
      title: "Feedback Score Dashboard",
      content:
        "Our AI progress tracking for Pitch Improvement is a cutting-edge solution for individuals and teams to help refine their pitch delivery. Every session is automatically recorded, allowing you to improve your performance. Whether for business, sales, or public speaking, this tool ensures continuous improvement and success.",
      svg: (
        <HowItWorksCardThreeSVG className="w-full h-[20rem] mt-22 lg:mt-0" />
      ),
    },
  ];
  return (
    <section>
      {how_it_works_sections.map((item, idx) => (
        <HowItWorksCard
          item={item}
          key={idx}
          className={clsx(
            "flex-1",
            idx % 2 != 0 ? "lg:flex-row-reverse" : "bg-alice-blue"
          )}
        />
      ))}
    </section>
  );
}

export default HowItWorks;
