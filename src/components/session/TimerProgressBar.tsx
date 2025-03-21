import { useEffect, useRef, useState } from "react";

const TimerProgressBar = ({ minutes }: { minutes: number }) => {
    const totalTime = minutes * 60; // Convert minutes to seconds
    const [progress, setProgress] = useState(0); // Progress percentage
    const timeLeftRef = useRef(totalTime); // Store time left in a ref

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeftRef.current > 0) {
                timeLeftRef.current -= 1;
                const newProgress = ((totalTime - timeLeftRef.current) / totalTime) * 100;
                setProgress(newProgress);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [totalTime]);

    // Determine bar color based on progress
    const getBarColor = () => {
        if (progress >= 80) return "#FF4D4D"; // Red when 80% used
        if (progress >= 50) return "#FFD700"; // Yellow when 50% used
        return "#252A39"; // Default color
    };

    return (
        <div className="empty__bar h-3.5 rounded-4xl w-full" style={{ backgroundColor: "#D0D5DD" }}>
            <div
                className="bar__fill rounded-4xl h-3.5 transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: getBarColor() }}
            ></div>
        </div>
    );
};

export default TimerProgressBar;
