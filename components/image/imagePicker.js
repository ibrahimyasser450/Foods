import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import classes from "./imagePicker.module.css";

export default function ImagePicker({
  label,
  name,
  onImageSelected,
  initialImage,
}) {
  const [addedImage, setAddedImage] = useState(initialImage || null); // Use initialImage if available
  const imageInput = useRef();

  // when the page be loaded when the user clicked on edit button the useEffect will run and the image will be prefill the form.
  useEffect(() => {
    if (initialImage) {
      setAddedImage(initialImage);
    }
  }, [initialImage]);

  function handleAddImage() {
    imageInput.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0]; // Get the first file[image]
    if (!file) {
      setAddedImage(null);
      onImageSelected(null); // Clear the image in the parent form
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // When the file is loaded or the user choose a new file [image]
      setAddedImage(fileReader.result);
      onImageSelected(fileReader.result); // Pass the image data to parent
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        {/* to show the image selected by the user */}
        <div className={classes.preview}>
          {!addedImage && <p>No image added yet.</p>}
          {addedImage && (
            <Image
              src={addedImage} // The image selected by the user.
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required={!initialImage} // Only required if no initial image is provided
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleAddImage}
        >
          Add Image
        </button>
      </div>
    </div>
  );
}
