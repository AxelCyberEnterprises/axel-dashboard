"use client";

import { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import engageXModalLogo from "../../../assets/images/pngs/modal-logo.png";
import modalFirstImage from "../../../assets/images/pngs/user-agreement-image-1.png";
import cloudCheck from "../../../assets/images/svgs/cloud-check.svg";
import cloudCheckGray from "../../../assets/images/svgs/cloud-check-gray.svg";

function engageXImage() {
    return <img src={engageXModalLogo} alt="EngageX Logo" className="w-28" />;
}

export default function MultiStepAgreement({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [step, setStep] = useState(1);
    const [agreementState, setAgreementState] = useState({ // Combined state
        initials: "",
        agree: false,
        filePreview: null as string | null,
        canProceed: true,
        industryState: "",
    });
    const agreementRef = useRef<HTMLDivElement>(null);
    const hasRun = useRef(false);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    useEffect(() => {
        if (step === 3 && !hasRun.current) {
            setAgreementState(prevState => ({ ...prevState, canProceed: false })); // Update canProceed in agreementState
            hasRun.current = true;
        }
    }, [step]);


    const handleScroll = () => {
        if (agreementRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = agreementRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setAgreementState(prevState => ({ ...prevState, canProceed: true })); // Update canProceed in agreementState
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "application/pdf",
                "video/mp4",
            ];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type! Only JPG, PNG, PDF, and MP4 are allowed.");
                return;
            }
            if (file.size > 3 * 1024 * 1024) {
                alert("File size exceeds 3MB limit!");
                return;
            }
            if (file.type.startsWith("image/")) {
                const imageURL = URL.createObjectURL(file);
                setAgreementState({ ...agreementState, filePreview: imageURL }); // Update filePreview in agreementState
            } else {
                setAgreementState(prevState => ({ ...prevState, filePreview: null })); // Update filePreview in agreementState
            }
        }
    };

    const handleConfirm = () => {
        console.log("Final Agreement State:", agreementState); // Console log here
        onClose();
    };


    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (step === 6 && !isOpen) onClose();
            }}
            >
          <DialogTitle> 
          </DialogTitle>
            <DialogContent
            aria-describedby={undefined}
                className="md:max-w-[50vw] my-auto mx-auto w-[85vw] max-md:mt-5 max-md:max-h-[90vh] [&>button]:hidden"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >


                <div className=" max-h-fit ">
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && (
                        <StepThree
                            agreementRef={agreementRef}
                            handleScroll={handleScroll}
                        />
                    )}
                    {step === 4 && (
                        <StepFour
                            initials={agreementState.initials} // Pass initials from agreementState
                            setInitials={(value) => setAgreementState(prevState => ({ ...prevState, initials: value }))} // Update initials in agreementState
                            agree={agreementState.agree} // Pass agree from agreementState
                            setAgree={(value) => setAgreementState(prevState => ({ ...prevState, agree: value }))} // Update agree in agreementState
                        />
                    )}
                    {step === 5 && (
                        <StepFive
                            filePreview={agreementState.filePreview} // Pass filePreview from agreementState
                            handleFileChange={handleFileChange} // Pass handleFileChange (no state change here directly in this step component, only in MultiStepAgreement)
                        />
                    )}
                    {step === 6 && (
                        <StepSix
                            industryState={agreementState.industryState} // Pass industryState from agreementState
                            setIndustryState={(value) => setAgreementState(prevState => ({ ...prevState, industryState: value }))} // Update industryState in agreementState
                            filePreview={agreementState.filePreview} // Pass filePreview from agreementState
                        />
                    )}
                </div>

                <DialogFooter className="flex max-md: flex-row gap-2  justify-between">
                    {

                        <Button
                            variant="default"
                            className={` ${
                                step === 1
                                    ? "bg-[#ccc] text-[#00000042] "
                                    : " bg-white border text-[#344054]"
                            } w-full py-4 h-fit hover:bg-accent rounded-[20px] `}
                            onClick={prevStep}
                            disabled={step === 0}
                        >
                            Back
                        </Button>
                    }
                    {step < 6 ? (
                        <Button
                            className="w-full py-4 h-fit     rounded-[20px]"
                            onClick={nextStep}
                            disabled={
                                (step === 3 && !agreementState.canProceed) ||
                                (step === 4 && (!agreementState.agree || agreementState.initials === "")) ||
                                (step === 5 && !agreementState.filePreview)
                            }
                        >
                            {step === 1 ? "Read Agreement" : "Next"}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleConfirm} // Use handleConfirm to log and close
                            className=" rounded-[20px] w-full py-4 h-fit"
                            disabled={agreementState.industryState === ""} // Use industryState from agreementState
                        >
                            Confirm
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function StepOne() {
    return (
        <div className="flex flex-col items-center gap-4">
            <img src={modalFirstImage} className="w-full" alt="modal-image" />
            <div className="flex gap-1.5 sm:gap-2 items-center     ">
            <p className="sm:text-[35px] text-[25px] text-nowrap font-[Neue Montreal]">Welcome to</p>
            <img src={engageXModalLogo} className="h-[27px] sm:h-[35px] mt-[5px] w-auto " alt="" />
            </div>
            <p className="text-center text-sm font-[Montserrat] text-muted-foreground">
                Please review & accept our user agreement.
            </p>
        </div>
    );
}

function StepTwo() {
    return (
        <div className="flex flex-col text-sm font-[Montserrat] font-medium gap-4">
            {engageXImage()}

            <p className="  mb-1">Welcome to EngageX!</p>
            <div className="flex flex-col gap-3">
                <p className="">
                    By using our platform, you acknowledge that you have read, understood,
                    and agreed to this User-Level Agreement (ULA), which governs your
                    access and use of our AI-powered public speaking and presentation
                    practice environment.
                </p>
                <p className="">
                    By clicking “I Agree” and providing your initials, you confirm your
                    acceptance of these terms.
                </p>
            </div>
        </div>
    );
}

function StepThree({
    agreementRef,
    handleScroll,
}: {
    agreementRef: React.RefObject<HTMLDivElement | null>;
    handleScroll: () => void;
}) {
    return (
        <div className="pr-2">
            <article
                ref={agreementRef}
                onScroll={handleScroll}
                className="text-[#101828] overflow-y-scroll max-md:pr-2 md:h-[55vh]    [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
//    [&::-webkit-scrollbar-track]:rounded-2xl
[&::-webkit-scrollbar-thumb]:bg-gray-400
[&::-webkit-scrollbar-thumb]:rounded
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-[50vh] text-base flex flex-col gap-2 font-medium   font-[montserrat]"
            >
                {engageXImage()}
                <p className="font-semibold"> Welcome to EngageX!</p>

                <p>
                    By using our platform, you acknowledge that you have read, understood,
                    and agreed to this User-Level Agreement (ULA), which governs your
                    access and use of our AI-powered public speaking and presentation
                    practice environment.
                </p>
                <p>
                    By clicking “I Agree” and providing your initials, you confirm your
                    acceptance of these terms.
                </p>

                <p>1. Introduction</p>
                <p>
                    Welcome to EngageX! By using our platform, you acknowledge that you
                    have read, understood, and agreed to this User-Level Agreement (ULA),
                    which governs your access and use of our AI-powered public speaking
                    and presentation practice environment.
                </p>
                <p>
                    By clicking “I Agree” and providing your initials, you confirm your
                    acceptance of these terms.
                </p>

                <div>
                    <p>2. Acceptable Use Policy</p>
                    <p>
                        EngageX is designed for public speaking, presentation practice, and
                        AI-generated feedback. You agree to:
                    </p>
                    <ul className="list-disc leading-8">
                        <li>Use the platform only for its intended purpose.</li>{" "}
                        <li>Respect the integrity of AI-generated evaluations.</li>{" "}
                        <li>
                            Maintain professionalism and avoid offensive or unlawful content.
                        </li>{" "}
                        <li>
                            Refrain from attempting to reverse-engineer, manipulate, or misuse
                            AI-generated insights.
                        </li>
                        We reserve the right to suspend or terminate accounts that violate
                        these policies.
                    </ul>
                </div>

                <div>
                    <p>
                        3. AI-Generated Feedback Disclaimer EngageX utilizes AI-powered
                        systems to analyze your speech and provide feedback.
                    </p>{" "}
                    <p>
                        AI-generated feedback is advisory only and does not constitute
                        professional coaching.
                    </p>{" "}
                    <p>
                        AI does not store your session content for learning purposes—only
                        for generating feedback.
                    </p>{" "}
                    <p>
                        While we analyze vocal patterns to improve evaluations, this is
                        strictly for enhancing session accuracy and not for long-term AI
                        model training. EngageX is not responsible for any decisions made
                        based on AI feedback.
                    </p>
                </div>

                <div>
                    <p>
                        4. Confidentiality of Personal Data Your privacy is our priority.
                    </p>{" "}
                    <p>
                        EngageX does not share personal information, session recordings, or
                        analytics with third parties, except where required by law.
                    </p>{" "}
                    <p>
                        Data collected is used only to generate your session feedback and is
                        not stored for AI training.
                    </p>{" "}
                    <p>
                        After 24 hours, all session recordings are automatically deleted
                        from our systems. Once a session recording is downloaded by you,
                        EngageX is not liable for its confidentiality, security, or misuse.
                    </p>
                </div>

                <div>
                    <p>
                        5. Terms for Session Recording & Downloading EngageX offers session
                        recording & download features for your convenience.
                    </p>

                    <ol className="list-disc ml-3 flex flex-col gap-2 leading-6 mt-1">
                        <li>
                            {" "}
                            Coaching & Evaluation: Your session recordings may be shared with
                            a coach of your choosing for feedback.
                        </li>

                        <li>
                            {" "}
                            Limited Storage: EngageX stores session recordings for 24 hours
                            only before permanent deletion.
                        </li>

                        <li>
                            {" "}
                            User Responsibility: Once downloaded, EngageX is not responsible
                            for data security, loss, or compromise. You accept full
                            responsibility for the storage and usage of downloaded session
                            recordings.
                        </li>
                    </ol>
                </div>

                <br />
                <div>
                    <p>
                        6. Legal & Liability Protection EngageX is provided "as is" without
                        warranties of any kind.
                    </p>{" "}
                    <div>
                        EngageX is not liable for any:
                        <ul className="list-disc">
                            <li>Misinterpretation of AI feedback.</li>
                            <li> Data loss due to expired session storage.</li>
                            <li> Third-party misuse of downloaded content.</li>
                            <li>Performance outcomes based on our platform's analysis.</li>
                            <li>
                                {" "}
                                By using EngageX, you waive the right to frivolous lawsuits or
                                claims seeking damages beyond platform usage fees.
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="mt-2">
                    By clicking “I Agree” and providing your initials, you confirm your
                    acceptance of these terms.
                </p>
            </article>
        </div>
    );
}

function StepFour({
    initials, // Receive initials as prop
    setInitials, // Receive setInitials as prop
    agree, // Receive agree as prop
    setAgree, // Receive setAgree as prop
}: {
    initials: string;
    setInitials: (value: string) => void;
    agree: boolean;
    setAgree: (value: boolean) => void;
}) {
    return (
        <div className="flex text-sm flex-col text-[#101828] gap-4">
            {engageXImage()}
            <p className="font-semibold font-[Montserrat]">Agreement & Acceptance</p>
            <div className="font-medium   font-[montserrat]">
                <p>By checking "I Agree" and entering your initials, you confirm:</p>
                <ul className="leading-7">
                    <li>✔ You understand and accept EngageX's policies.</li>
                    <li>✔ You acknowledge session data is deleted after 24 hours.</li>
                    <li>✔ You take full responsibility for downloaded recordings.</li>
                </ul>
            </div>
            <div className="">
                <label htmlFor="initials" className="font-[Inter]">
                    Enter initials here
                </label>
                <Input
                    placeholder="Enter your initials"
                    className="text-black text-base font-normal mt-1 font-[Inter]"
                    value={initials} // Use initials prop
                    id="initials"
                    onChange={(e) => setInitials(e.target.value)} // Use setInitials prop
                />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox
                    className=" border-2    p-2 border-gray-300 rounded-md checked:bg-transparent     bg-transparent    data-[state=checked]:bg-transparent data-[state=checked]:text-black   "
                    checked={agree} // Use agree prop
                    onCheckedChange={(checked) => setAgree(checked as boolean)} // Use setAgree prop
                    id="terms"
                />
                <label className="font-[Inter] text-[#344054] font-medium" htmlFor="terms">
                    I agree to the terms and conditions
                </label>
            </div>
        </div>
    );
}

function StepFive({
    filePreview, // Receive filePreview as prop
    handleFileChange, // Receive handleFileChange as prop
}: {
    filePreview: string | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex flex-col font-medium font-[montserrat] items-center overflow-hidden gap-1">
            <img src={cloudCheck} alt="checkSvg" />
            <p className="text-base">Upload Picture</p>
            <p className="text-muted-foreground text-sm text-center">
                Upload your picture for easy identification.
            </p>
            <div className="relative overflow-hidden p-4 border-dashed min-h-[30vh] h-fit flex gap-1 flex-col items-center justify-center border-2 rounded-lg w-full">
                {filePreview && ( // Use filePreview prop
                    <img
                        src={filePreview} // Use filePreview prop
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Preview"
                    />
                )}
                <img src={cloudCheckGray} className="mb-2" alt="checkSvg" />
                <p className="text-sm">Choose a file or drag & drop it here</p>
                <p className="text-muted-foreground text-[12px] text-center">
                    JPEG, PNG, PDF, and MP4 formats, up to 3MB
                </p>
                <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, application/pdf, video/mp4"
                    onChange={handleFileChange} // Use handleFileChange prop
                />
                <Button
                    variant="outline"
                    className="text-black text-sm"
                    onClick={() =>
                        (
                            document.querySelector("input[type=file]") as HTMLInputElement
                        )?.click()
                    }
                >
                    Browse File
                </Button>
            </div>
        </div>
    );
}

function StepSix({
    industryState, // Receive industryState as prop
    setIndustryState, // Receive setIndustryState as prop
    filePreview, // Receive filePreview as prop
}: {
    industryState: string;
    setIndustryState: (value: string) => void;
    filePreview: string | null;
}) {
    return (
        <div className="flex flex-col gap-1">
            <img src={cloudCheck} className="mx-auto" alt="checkSvg" />
            <p className="mx-auto font-medium font-[montserrat] text-base">Upload Picture</p>
            <p className="text-muted-foreground mx-auto font-[montserrat] text-sm text-center">
                Upload your picture for easy identification.
            </p>
            <div className="relative w-full overflow-hidden rounded-lg h-[40vh] md:h-72">
                {filePreview && ( 
                    <img
                        src={filePreview} // Use filePreview prop
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Preview"
                    />
                )}
            </div>
            <Input
                placeholder="Enter industry name"
                className="text-black font-light mt-1 font-[Inter]"
                value={industryState} // Use industryState prop
                onChange={(e) => setIndustryState(e.target.value)} // Use setIndustryState prop
            />
        </div>
    );
}