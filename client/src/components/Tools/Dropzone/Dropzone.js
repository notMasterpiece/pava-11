import React from 'react';
import Dropzone from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    width: '100%',
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'block',
    minWidth: 0,
    overflow: 'hidden',
    width: '100%'
};

const img = {
    display: 'block',
    width: 'auto',
    height: 'auto'
};

class DropzoneWithPreview extends React.Component {
    constructor() {
        super()
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        this.props.selectImage(files);
        this.setState({
            files: files.map(file => ({
                ...file,
                preview: URL.createObjectURL(file)
            }))
        });
    }

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        const {files} = this.state;
        if( files.length ) {
            for (let i = files.length; i >= 0; i--) {
                const file = files[0];
                URL.revokeObjectURL(file.preview);
            }
        }
    }

    render() {
        const {files} = this.state;

        const thumbs = files.map(file => (
            <div key={file.preview} style={thumb}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                        alt={'preview'}
                    />
                </div>
            </div>
        ));

        return (
            <section className={'m-b-15'}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="dropzone">
                            <Dropzone
                                name={'image'}
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onDrop.bind(this)}
                            ><p className={'dropzone-text'}>Змінити аватар</p></Dropzone>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <aside className={'dropzone-preview'} style={thumbsContainer}>
                            {thumbs}
                        </aside>
                    </div>
                </div>
            </section>
        );
    }
}

export default DropzoneWithPreview;
