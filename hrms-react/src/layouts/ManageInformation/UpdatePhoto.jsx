import { Component } from "react";
import { toast } from "react-toastify";
import { Accordion, Button } from "semantic-ui-react";
import PhotoUploadService from '../../services/PhotoUploadService'

export default class UpdatePhoto extends Component {

    state = {
        selectedFile: null,
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const formData = new FormData()
        formData.append(
            "multipartFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        let photoUploadService = new PhotoUploadService()
        photoUploadService.uploadPhoto(this.props.unemployedId, formData).then((result) => {
            toast.success(result.data.message)
            this.props.updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    photoDelete = () => {
        let photoUploadService = new PhotoUploadService()
        photoUploadService.deletePhoto(this.props.unemployedId).then((result) => {
            toast.success(result.data.message)
            this.props.updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    render() {
        return (
            <Accordion>
                <Accordion.Title
                    style={{ fontSize: "15px", letterSpacing: "2px" }}
                    icon={false}
                    content="Fotoğraf Yükle/Güncelle"
                    name="addPhoto"
                    active={this.props.activeSubModal === "addPhoto"}
                    onClick={this.props.handleSubModalClick} />
                <Accordion.Content
                    active={this.props.activeSubModal === "addPhoto"}>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={this.fileSelectedHandler}
                        ref={(fileInput) => (this.fileInput = fileInput)} />
                    <button
                        disabled={this.state.selectedFile != null}
                        className="ui button photoButton"
                        onClick={() => this.fileInput.click()}>
                        Fotoğraf Seç
                    </button>
                    <Button
                        className="photoButton"
                        content="Yükle"
                        onClick={this.fileUploadHandler} disabled={this.state.selectedFile == null} />
                </Accordion.Content>
                <Accordion.Title
                    style={{ fontSize: "15px", letterSpacing: "2px" }}
                    icon={false}
                    content="Fotğraf Sil"
                    name="deletePhoto"
                    active={this.props.activeSubModal === "deletePhoto"}
                    onClick={this.props.handleSubModalClick} />
                <Accordion.Content
                    active={this.props.activeSubModal === "deletePhoto"}>
                    <Button
                        size="large"
                        className="photoDeleteButton"
                        icon="x" labelPosition="right"
                        compact negative
                        content="Sil"
                        onClick={() => this.photoDelete()} />
                </Accordion.Content>
            </Accordion>
        )
    }
}