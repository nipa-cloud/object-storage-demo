import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container, Table } from "reactstrap";

import "./AttachmentPage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import UploadModal from "./UploadModal";

const AttachmentPage = () => {
  
  const [attachmentList, setAttachmentList] = useState<{id: number}[]>([])
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  const getAttachments = () => {
    axios.get("http://202.94.169.124/api/attachments").then(response => setAttachmentList(response.data))
  }

  useEffect(() => {
    if (!uploadModalOpen) {
      getAttachments();
    }
  }, [uploadModalOpen])

  const toggleUploadModal = () => {
    setUploadModalOpen(!uploadModalOpen);
  }

  return (
    <>
      <div id="page-header">
          <h1>Attachments</h1>
          <div>
            <Button outline secondary onClick={toggleUploadModal}>
              <FontAwesomeIcon icon={faPlusCircle} />
              Add
            </Button>
          </div>
      </div>
      <UploadModal isOpen={uploadModalOpen} toggle={toggleUploadModal}/>
      <Card>
      <Container
        fluid
      >
        <Table responsive>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Key
              </th>
              <th>
                Type
              </th>
              <th>
                Status
              </th>
              <th>
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {
              attachmentList.map((item: any) => (
                <tr>
                  <th scope="row">
                    {item.id}
                  </th>
                  <td>
                    {item.key}
                  </td>
                  <td>
                    {item.mime_type}
                  </td>
                  <td>
                    {item.status}
                  </td>
                  <td>
                    {(() => { 
                      if (item.status === "uploaded") {
                       return <img height="100" src={"https://webboard-bucket.s3-bkk.nipa.cloud/uploads/"+item.key}/> //<Button disabled={item.status !== "uploaded"}>Get</Button>
                      } else {
                        return <></>
                      }
                    })()}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
      </Card>
    </>
  )
};
  
  export default AttachmentPage;