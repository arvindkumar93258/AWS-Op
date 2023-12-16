import { useRef, useEffect, useState } from "react";
import "./Home.css"
import { getSignedUrl, uploadFile } from "../services/api";

const Home = () => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState('');

    const fileInputRef = useRef();

    useEffect(() => {
        const getData = async () => {
            const response = await getSignedUrl();
            console.log("Url to upload data is: ", response.url);
            setUrl(response.url);
        }
        getData();
    }, []);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                await uploadFile(url, file);
                setUrl(url.split('?')[0]);
            }
        }
        getImage();
    }, [file]);

    const onUploadClick = () => {
        fileInputRef.current.click();
    }
    return (
        <div className="container">

            <h2 className="heading-class">File IO "Pre-Signed URL"</h2>
            <p>Convenient file sharing in three steps without registration</p>

            <p>
                <span>1</span>
                <input
                    style={{ display: "none" }}
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => { setFile(e.target.files[0]) }}
                />
                <button onClick={() => onUploadClick()}> Select files to upload</button>
                or drag-and-drop files into this browser.
            </p>
            <p><span>2</span> Wait until the file upload is complete..</p>
            <p><span>3</span> The files will be availabe at <a href={url.split('?')[0]} >{url.split('?')[0]} </a> which is a link you can share.</p>

            <p className="info">The files can ve deleted manually at any time and will in any case be deleted automatically 7 days from now.</p>


            {file && <img src={url} alt="ImageUrl" />}




        </div>
    )

}

export default Home;
