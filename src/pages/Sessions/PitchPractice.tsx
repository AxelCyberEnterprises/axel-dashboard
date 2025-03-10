import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SquareArrowUpRight, ThumbsUp, Volume2, X } from 'lucide-react';
import audience from '../../assets/images/pngs/audience.png';
import { ReactMediaRecorder } from "react-media-recorder";

// Component to preview video stream
const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) {
        return null;
    }

    return <video ref={videoRef} className='w-full h-full object-cover rounded-3xl' autoPlay />;
};

// Main recording component
const RecordView = () => {
    const [isRecording, setIsRecording] = useState(false);

    return (
        <ReactMediaRecorder
            video
            render={({ previewStream, startRecording, stopRecording }) => {
                const handleStart = () => {
                    setIsRecording(true);
                    startRecording();
                };

                const handleStop = () => {
                    setIsRecording(false);
                    stopRecording();
                };

                return (
                    <div className='h-full relative rounded-3xl'>
                        <VideoPreview stream={previewStream} />
                        <div className="absolute bottom-0 z-10">
                            {!isRecording ? (
                                <Button onClick={handleStart}>Play</Button>
                            ) : (
                                <Button onClick={handleStop}>Stop</Button>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};

const PitchPractice: React.FC = () => {
    return (
        <div className="text-primary-blue">
            <section className="flex flex-wrap border-b-1 px-8 py-4 justify-between items-center">
                <div className="w-full lg:w-9/12">
                    <h4 className="mb-4">Pitch Practice Session</h4>
                    <div className="mb-3">
                        <SegmentedProgressBar percent={10} color={"#252A39"} divisions={1} />
                    </div>
                    <small className="text-grey">Slide 1 of 10</small>
                </div>

                <div className="flex gap-2 my-3">
                    <Button className="bg-transparent hover:bg-ghost-white/50 border-1 border-grey text-primary-blue">
                        Restart
                    </Button>
                    <Button className="bg-primary-blue hover:bg-primary-blue/90 flex">
                        <X className="me-1" /> Exit
                    </Button>
                </div>
            </section>

            <section className="flex flex-wrap">
                {/* left side  */}
                <div className="left__side w-full md:w-9/12 lg:w-9/12 md:px-8 lg:pe-4 py-4">
                    <div className="">
                        <div className="md:border-16 lg:border-32 border-primary-blue rounded-3xl w-full h-120">
                            <RecordView />
                        </div>

                        <div className="mt-3 px-4 md:px-0">
                            <div className="flex items-center justify-between md:justify-start">
                                <div className="flex items-center">
                                    <Volume2 />
                                    <p className="ms-2">Audio Settings</p>
                                </div>
                                <p className="ms-3 text-grey">
                                    Time: <span className="text-maximum-yellow-red">05:23</span>
                                </p>
                            </div>
                        </div>

                        <div className=" px-4 md:px-0">
                            <div className="w-full rounded-xl border-1 border-grey px-3.5 py-3 mt-5">
                                <h6 className="py-2">Speaker Notes</h6>
                                <p className="text-grey">
                                    “Our solution leverages cutting-edge AI to transform how businesses handle customer
                                    service...”
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex justify-end mt-16 px-4 md:px-0">
                            <Button className="bg-jelly-bean hover:bg-jelly-bean/90 flex">
                                <SquareArrowUpRight className="me-1" /> End Session
                            </Button>
                        </div>
                    </div>
                </div>

                {/* right side large screens  */}
                <div className="right__side hidden md:block w-full md:w-3/12 lg:w-3/12 px-8 lg:ps-4 py-4">
                    <div className="py-5 px-3 border-1 border-grey rounded-xl">
                        <h6 className="mb-3">Live Audience</h6>
                        <img src={audience} alt="audience" />
                    </div>

                    <div className="py-5 px-3 border-1 border-grey rounded-xl mt-3">
                        <h6 className="mb-4">Audience Engaged</h6>
                        <div className="mb-2">
                            <SegmentedProgressBar percent={86} color={"#40B869"} divisions={1} />
                        </div>
                        <small className="text-grey">86% engaged</small>
                    </div>

                    <div className="py-5 px-3 border-1 border-grey rounded-xl mt-3">
                        <h6 className="mb-4">Live Audience Reaction</h6>
                        <div className="reactions">
                            <div className="flex w-full justify-between items-center mb-3">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                    <p className="ms-2">Interested</p>
                                </div>
                                <p>32</p>
                            </div>

                            <div className="flex w-full justify-between items-center mb-3">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                    <p className="ms-2">Sure</p>
                                </div>
                                <p>32</p>
                            </div>

                            <div className="flex w-full justify-between items-center mb-3">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                    <p className="ms-2">Skeptical</p>
                                </div>
                                <p>32</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-5 px-3 border-1 border-grey rounded-xl mt-3">
                        <h6 className="mb-4.5">Engagement Metrics</h6>
                        <div className="metrics">
                            <div className="mb-3">
                                <p className="mb-3">Confidence Level</p>
                                <SegmentedProgressBar percent={75} color={"#252A39"} divisions={1} />
                            </div>

                            <div className="mb-3">
                                <p className="mb-3">Accuracy of Facts</p>
                                <SegmentedProgressBar percent={75} color={"#252A39"} divisions={1} />
                            </div>

                            <div className="mb-3">
                                <p className="mb-3">Clarity of Speech</p>
                                <SegmentedProgressBar percent={75} color={"#252A39"} divisions={1} />
                            </div>
                        </div>
                    </div>

                    <div className="py-5 px-3 border-1 border-grey rounded-xl mt-3">
                        <h6 className="mb-4">Realtime Feedback</h6>
                        <ul className="text-grey list-disc">
                            <li className="mb-2">Great eye contact with audience</li>
                            <li>Consider slowing down your speech rate</li>
                        </ul>
                    </div>
                </div>

                {/* right side mobile */}
                <div className="p-4 md:hidden w-full">
                    <div className="border-1 border-gray py-5 px-3">
                        <div className="row flex">
                            <div className="w-6/12">
                                <h6>Live Audience Reaction</h6>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>32</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>32</p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-2/12">
                                <div className="flex items-center justify-center bg-cultured w-1/2 aspect-square rounded-4xl mb-2">
                                    <div className="w-6 h-6 bg-primary-blue rounded-4xl flex items-center justify-center bg-">
                                        <ThumbsUp className="w-1/2 aspect-square text-white" />
                                    </div>
                                </div>
                                <p>32</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PitchPractice;