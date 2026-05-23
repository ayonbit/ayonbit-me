export function resizeImage(
  base64Str: string,
  maxWidth: number = 500,
  maxHeight: number = 500,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();

    img.src = base64Str;

    img.onload = () => {
      const canvas = document.createElement("canvas");

      let width: number = img.width;
      let height: number = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not found"));

        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL());
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}
