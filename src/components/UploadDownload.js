import React, {useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import {Button} from '@material-ui/core';
import {downloadFile, uploadFile} from '../API/API';
import TextField from '@material-ui/core/TextField';
import Webcam from 'react-webcam';
import download from 'downloadjs';

const WebcamComponent = () => <Webcam />;

export default function UploadDownload () {
  const [files, setFiles] = useState ([]);
  const [fileName, setFileName] = useState ();
  const onUploadFile = () => {
    if (files.length > 0) {
      console.log (files[0]);
      uploadFile (files[0]);
    }
  };

  const onDownload = () => {
    downloadFile (fileName).then (res => {
      console.log (res.headers['content-type']);
    });
  };
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const webcamRef = React.useRef (null);

  const capture = React.useCallback (
    () => {
      const imageSrc = webcamRef.current.getScreenshot ();
      download (imageSrc);
    },
    [webcamRef]
  );
  const urltoFile = (url, filename, mimeType) => {
    return fetch (url)
      .then (function (res) {
        return res.arrayBuffer ();
      })
      .then (function (buf) {
        return new File ([buf], filename, {type: mimeType});
      });
  };

  const uploadCam = () => {
    const imageSrc = webcamRef.current.getScreenshot ();

    //Usage example:
    urltoFile (imageSrc, 'img1.png', 'image/png').then (function (file) {
      uploadFile (file);
    });
    // console.log (f);
  };
  return (
    <div>
      <DropzoneArea
        // acceptedFiles={['image/*']}
        dropzoneText={'Drag and drop an image here or click'}
        onChange={setFiles}
      />
      <Button variant="outlined" color="primary" onClick={onUploadFile}>
        Upload
      </Button>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={fileName}
        onChange={e => setFileName (e.target.value)}
      />

      <Button variant="outlined" color="primary" onClick={onDownload}>
        Download
      </Button>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button variant="outlined" color="primary" onClick={uploadCam}>
        Upload
      </Button>
      <Button variant="outlined" color="primary" onClick={capture}>
        Download
      </Button>
    </div>
  );
}
