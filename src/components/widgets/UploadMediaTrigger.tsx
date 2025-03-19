import { cn, isFileWithPreview } from "@/lib/utils";
import { HTMLAttributes, useCallback, useEffect } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type IUploadMediaTriggerProps<T extends FieldValues, K extends Path<T>> = HTMLAttributes<HTMLElement> & {
    accept?: DropzoneProps["accept"];
    multiple?: boolean;
    name: K;
};
type IFilesWithPreview = (File & {
    preview: string;
})[];

const UploadMediaTrigger = <T extends FieldValues, K extends Path<T>>({
    accept = { "image/*": [".png", ".gif", ".jpeg", ".jpg"], "application/pdf": [".pdf"] },
    className,
    children,
    name,
}: IUploadMediaTriggerProps<T, K>) => {
    const { register, unregister, setValue, watch } = useFormContext();
    const files = watch(name) as IFilesWithPreview | undefined;

    const handleDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    console.error(`File ${file.name} was rejected`);
                });
            }

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            );

            // const updatedFiles = files ? [...files, ...newFiles] : newFiles;

            setValue(name, newFiles as unknown as T[K], { shouldValidate: true });
        },
        [name, setValue],
    );

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    useEffect(() => {
        return () => {
            if (!files) return;
            files.forEach((file) => {
                if (isFileWithPreview(file)) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);

    return (
        <Dropzone accept={accept} onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={cn(className)}>
                    <input {...getInputProps()} />
                    {children}
                </div>
            )}
        </Dropzone>
    );
};

export default UploadMediaTrigger;
