import React, { Component } from 'react'
import { withFirebase } from '../Firebase/index';

class UploadBase extends Component {

    constructor(props){
        super(props)
        this.state = {
            file : '',
            fileName: '',
            invalidFile: ''
        }
    }

    handleFileChange = this.handleFileChange.bind(this);
    handleFileChange({ target: { files } }) {
       
        const cancel = !files.length;
        if (cancel) return;
            
        this.setState({ file: files[0], fileName: files[0].name, invalidFile: false }, () => console.log(this.state));
    }

    onSubmit = (e) =>{
        e.preventDefault()
                    
       this.props.firebase 
            .doUploadFile(this.state.fileName, this.state.file)
            .then(uploadTaskSnapShot =>{
                
                uploadTaskSnapShot.ref.getDownloadURL()
                    .then(url =>{
                        const userId = this.props.firebase.doGetUserUId()
                        this.props.firebase.saveImage(url, userId)
                            .then(() => console.log("done"))
                    })  
            })
    }

    render() {
        return (
            <form 
                onSubmit={(e) => this.onSubmit(e)}>
                <h1>File Upload</h1>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFileChange(e)}
                />
                <button
                    type="submit"
                    >
                    Submit
                </button>
            </form>
        )
    }
}

const Upload = withFirebase(UploadBase)
export default Upload