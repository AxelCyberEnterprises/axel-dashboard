import { JSX } from "react";

interface Params {
  feature: { svg: JSX.Element; title: string; content: string };
}

function FeaturesSectionCard({ feature }: Params) {
  return (
    <div className="border border-foreground/60 space-y-6 font-montserrat py-6 rounded-2xl px-5">
      <div className="w-full">{feature.svg}</div>
      <div className="space-y-1">
        <p className="font-montreal">{feature.title}</p>
        <p className="small">{feature.content}</p>
      </div>
    </div>
  );
}

export default FeaturesSectionCard;
