"use client";
import { IKContext, IKUpload } from "@imagekit/next";

export default function ImageUpload({ onSuccess, onError, folder, fileName }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <div className="imagekit-upload-wrapper">
      <IKContext 
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY} 
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT} 
        authenticator={authenticator} 
      >
        <IKUpload
          fileName={fileName || "upload-image.jpg"}
          folder={folder || "/user-uploads"}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
        />
      </IKContext>
    </div>
  );
}
