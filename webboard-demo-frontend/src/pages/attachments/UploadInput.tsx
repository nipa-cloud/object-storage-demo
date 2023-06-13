import { useState } from "react";
import { FormGroup, Input } from "reactstrap"

interface UploadInputProps {
    handleFileChange: (input: any) => void
}

const UploadInput = ({handleFileChange}: UploadInputProps) => {
    const [fileName, setFileName] = useState("");

    const internalHandleFileChange = (input: any) => {
        const cancel = !input.target.files;
        if (cancel) return;
        setFileName(input.target.files.name)
    }
    return (
        <FormGroup>
        <Input
          type="file"
          name="uploadInput"
          label={fileName || 'choose an image file'}
          onChange={(input) => {internalHandleFileChange(input); handleFileChange(input)}}/>
      </FormGroup>
    )
}

export default UploadInput