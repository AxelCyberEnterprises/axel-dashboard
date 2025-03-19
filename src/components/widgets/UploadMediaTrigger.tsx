import { cn } from "@/lib/utils";
import { HTMLAttributes, useCallback, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";

interface IUploadMediaTriggerProps extends HTMLAttributes<HTMLElement> {
    isMultiple?: boolean;
    filesRegister: UseFormRegisterReturn<"files">;
}

const UploadMediaTrigger = ({ className, children, filesRegister, isMultiple }: IUploadMediaTriggerProps) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const { ref, ...rest } = filesRegister;

    const handleClick = useCallback(() => {
        fileInput.current?.click();
    }, []);

    return (
        <div className={cn(className)} onClick={handleClick}>
            <Input
                ref={(e) => {
                    ref(e);
                    fileInput.current = e;
                }}
                type="file"
                accept="image/*, application/pdf"
                multiple={isMultiple}
                className="hidden"
                {...rest}
            />
            {children}
        </div>
    );
};

export default UploadMediaTrigger;
