import { useEffect, useState } from "react";

const Base64Image = ({ base64String }: any) => {
  const [imageSrc, setImageSrc] = useState<any>(null);

  useEffect(() => {
    if (base64String) {
      const decodedString = atob(base64String);
      const bytes = new Uint8Array(decodedString.length);

      for (let i = 0; i < decodedString.length; i++) {
        bytes[i] = decodedString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "image/png" });
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
    }
  }, [base64String]);

  return imageSrc && imageSrc;
};

export default Base64Image;
