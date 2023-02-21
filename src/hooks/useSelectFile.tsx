import React, { useState } from 'react';


const useSelectFile = () => {
    const [selectedFile, setSelectedFile] = useState<string>();

    //UPLOAD IMAGE FROM PC
    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader(); // class provided by javaScript uses for file uploading or read data from files

        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            };
        };
    };


    return {
        selectedFile, setSelectedFile, onSelectFile
    }
}
export default useSelectFile;