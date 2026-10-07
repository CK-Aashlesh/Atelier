"use client";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { IKImage } from "@imagekit/next";

export default function TestImageKitPage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);

  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <div style={{ padding: "50px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>ImageKit Integration Test</h1>
      
      {!uploadedImage ? (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <p style={{ marginBottom: "15px" }}>
            Select an image to upload and verify the integration. 
            <br />
            <strong>Note:</strong> Make sure you've added your keys to the <code>.env</code> file.
          </p>
          <ImageUpload 
            folder="/test-uploads"
            onSuccess={(res) => {
              setUploadedImage(res);
              setError(null);
            }}
            onError={(err) => {
              setError(err);
            }}
          />
        </div>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2 style={{ color: "green", marginBottom: "15px" }}>✅ Upload Successful!</h2>
          <div style={{ marginBottom: "20px", background: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
            <p><strong>File Name:</strong> {uploadedImage.name}</p>
            <p><strong>File ID:</strong> {uploadedImage.fileId}</p>
            <p><strong>URL:</strong> <a href={uploadedImage.url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>{uploadedImage.url}</a></p>
          </div>
          
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Retrieved Image (using IKImage)</h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
              This tests if the image can be successfully fetched and resized to 400x400 through ImageKit's CDN.
            </p>
            
            <div style={{ border: "1px dashed #ccc", display: "inline-block", padding: "5px" }}>
              <IKImage
                urlEndpoint={urlEndpoint}
                path={uploadedImage.filePath}
                width={400}
                height={400}
                alt={uploadedImage.name}
                transformation={[{ width: 400, height: 400, cropMode: "extract" }]}
              />
            </div>
          </div>
          
          <button 
            onClick={() => setUploadedImage(null)}
            style={{ 
              marginTop: "20px", 
              padding: "10px 15px", 
              cursor: "pointer", 
              background: "#000", 
              color: "#fff", 
              border: "none", 
              borderRadius: "5px" 
            }}
          >
            Test Another Upload
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "20px", border: "1px solid red", padding: "20px", borderRadius: "8px", background: "#fff5f5" }}>
          <h3>❌ Upload Failed</h3>
          <p>Please check the error details below:</p>
          <pre style={{ overflowX: "auto", background: "#fff", padding: "10px", marginTop: "10px" }}>
            {JSON.stringify(error, null, 2)}
          </pre>
          <p style={{ marginTop: "15px" }}>
            <strong>Troubleshooting:</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
              <li>Did you add your actual keys to the <code>.env</code> file?</li>
              <li>Did you restart the Next.js development server after updating <code>.env</code>?</li>
              <li>Is your API route at <code>/api/imagekit/auth</code> returning valid credentials?</li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
}
