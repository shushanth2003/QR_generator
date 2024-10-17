import { useState } from 'react'
import defaultimage from '../images/images.jpeg'
import qrcode from '../images/QRimages.png'

const QRGenerator = () => {
    const [img, setImg] = useState(""); 
    const [loading,setLoading] = useState(false);
    const [qrdata,setQrdata] = useState('');
    const [qrsize,setQrsize] = useState();
    async function generateQR(){
        let userinput_error = document.getElementById("userinput").value;
        let usersize_error = document.getElementById("usersize").value;

    // Check if either input is empty
        if (userinput_error === "") {
            document.getElementById("userinputerror").innerHTML = "Please Enter the data for QR code";
        } else {
            document.getElementById("userinputerror").innerHTML = ""; // Clear error message if valid
        }

        if (usersize_error === "") {
            document.getElementById("usersizeerror").innerHTML = "Please Enter the Image Size";
        } else {
            document.getElementById("usersizeerror").innerHTML = ""; // Clear error message if valid
        }
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrdata)}&size=${qrsize}x${qrsize}`;
            setImg(url);
        }catch(error){
            console.error("Error Fetching Data"+error);
        }finally{
            setLoading(false);
        }
    }
    function downloadQR() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link); // Fix this to document.body
                link.click();
                document.body.removeChild(link); // Clean up after download
            });
    }
  return (
    <div className="container">
        <h1>QR CODE GENERATOR</h1>
        <div className="imageofqr">
            {img&&<img src={img} alt="QR Code" className='imagephoto' />}
            {loading&&<p style={{color:'red'}}>Please wait...</p>}
    </div>
        <div className="labelinput">
            <label htmlFor="name" className="labelname">Data for QR code:</label>
            <input type="text" id="userinput" value={qrdata} placeholder="Enter the data for QR Code" onChange={(e)=>setQrdata(e.target.value)} />
            <span id='userinputerror' className='usererror'></span>
            <label htmlFor="image" className="labelimage">Image size (e.g., 150):</label>
            <input type="text" id="usersize" value={qrsize} placeholder="Enter image size" onChange={(imags)=>setQrsize(imags.target.value)}/>
            <span id='usersizeerror' className='usererror'></span>
        </div>
        <div className="buttons">
            <button className="genQr" disabled={loading} onClick={generateQR}>Generate OR Code</button>
            <button className="dowQr" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className='Footer'>Designed by <span className='tagname' style={{color:'blue'}}>Shushanth B S</span></p>
    </div>
  )
} 

export default QRGenerator
