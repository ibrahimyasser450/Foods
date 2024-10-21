import { useEffect, useRef, useState } from "react";
import classes from "./newFoodForm.module.css";
import ImagePicker from "@/components/image/imagePicker";

// when the user want to add a new food or update an existing one, it will open this page and send the data that wanted to add to /api/new-food to store at database [Mongodb] or update specific food to /api/edit-food/[foodId] at database [Mongodb]
export default function NewFoodFormPage(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const titleInputRef = useRef();
  const summaryInputRef = useRef();
  const instructionsInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  // when the page be loaded the useEffect will run, when there is a props.food meaning the user click on edit button and tha data  of this food will be prefill the form. just in case the user want to update the food.
  useEffect(() => {
    if (props.food) {
      nameInputRef.current.value = props.food.name;
      emailInputRef.current.value = props.food.email;
      titleInputRef.current.value = props.food.title;
      summaryInputRef.current.value = props.food.summary;
      instructionsInputRef.current.value = props.food.instructions;
      setSelectedImage(props.food.image);
    }
  }, [props.food]); // Update dependency to props.food

  function submitHandler(event) {
    event.preventDefault();
    // when the user click on submit button, it will send the entered data to addFoodHandler function /new-food/index.js to send to database or editFoodHandler function /edit-food/[foodId].js to send to database.
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredSummary = summaryInputRef.current.value;
    const enteredInstructions = instructionsInputRef.current.value;

    const foodData = {
      name: enteredName,
      email: enteredEmail,
      title: enteredTitle,
      summary: enteredSummary,
      instructions: enteredInstructions,
      image: selectedImage, // Pass the selected image here
    };

    props.onAddFood(foodData); // Changed the function name to onAddFood
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameInputRef}
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailInputRef}
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              ref={titleInputRef}
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              ref={summaryInputRef}
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              ref={instructionsInputRef}
              required
            ></textarea>
          </p>
          <ImagePicker
            label="Image"
            name="image"
            onImageSelected={setSelectedImage}
            initialImage={selectedImage} // when the user clicked on edit button, the image will be prefill the form
          />

          <p className={classes.actions}>
            <button>{props.food ? "Edit Food" : "Add Food"}</button>
          </p>
        </form>
      </main>
    </>
  );
}
