import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UploadInput from "./UploadInput";
import axios from "axios";

interface UploadModalProps {
    isOpen: boolean,
    toggle: () => void
}

const UploadModal = ({isOpen, toggle}: UploadModalProps) => {
    const createAttachment = async (key: string, mimeType: string) => {
        const result = await axios.post("http://202.94.169.124/api/attachments", {
            key,
            mime_type: mimeType
        });

        return result.data;
    }

    const updateAttachmentUploadStatus = async (id: string) => {
        const result = await axios.patch(`http://202.94.169.124/api/attachments/${id}`, {
            status: "uploaded"
        });

        return result.data;
    }

    const handleFileChange = async (input: any) => {
        const [file] = input.target.files;
        const createAttachmentResult = await createAttachment(file.name, file.type);
        const signedUrl = createAttachmentResult.presigned_url;
        await putFileToBucket(signedUrl, file);
        await updateAttachmentUploadStatus(createAttachmentResult.id)
        toggle();
    }

    const putFileToBucket = async (url: string, file: File) => {
        const result = await axios.put(url, file)
        return result.data;
    }
    
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Upload an attachment</ModalHeader>
                <ModalBody>
                    <UploadInput handleFileChange={handleFileChange}/>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
                </ModalFooter>
      </Modal>
        </>
    )
}

export default UploadModal;