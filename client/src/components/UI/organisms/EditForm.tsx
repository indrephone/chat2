import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useContext } from "react";
import UsersContext, { UsersContextTypes } from "../../../contexts/UsersContext";
import InputField from "../molecules/InputField";
import Input from "../atoms/Input";

const EditForm = () => {
  const { loggedInUser, setLoggedInUser} = useContext(UsersContext) as UsersContextTypes;
  const [message, setMessage] = useState<string | null>(null); // For success messages
  const [error, setError] = useState<string | null>(null); // For error messages

  const formik = useFormik({
    initialValues: {
      username: loggedInUser?.username || "",
      profileImage: loggedInUser?.profileImage || "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must be at least 5 symbols length")
        .max(20, "Username can be up to 20 symbols length")
        .trim(),
      profileImage: Yup.string().url("Must be a valid URL").trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          "Password must be at least: one lowercase, one uppercase, one number, one special symbol, and length between 8 and 25"
        )
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .trim(),
    }),
    onSubmit: async (values) => {
      setError(null); // Clear previous errors
      setMessage(null); // Clear previous messages

      // Update username if provided and changed
      if (values.username && values.username !== loggedInUser?.username) {
        const response = await updateField("username", values.username);
        if (!response) return;
      }

      // Update profileImage if provided and changed
      if (values.profileImage !== loggedInUser?.profileImage) {
        const response = await updateField("profileImage", values.profileImage || ""); // Ensure empty string is passed
        if (!response) return;
      }
      

      // Update password if provided and valid
      if (values.password && values.password === values.passwordRepeat) {
        const response = await updateField("password", values.password);
        if (!response) return;
      }

      setMessage("Your information has been successfully updated!");
    },
  });

  const updateField = async (field: string, value: string) => {
    console.log(`Updating profileImage with value: "${value}"`);

    try {
      const response = await fetch(
        `http://localhost:5500/users/${loggedInUser?._id}/${field}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [field]: value }), // Send empty string if profileImage is cleared
        }
      );
  
      if (response.status === 409) {
        const errorData = await response.json();
        setError(errorData.errorMessage);
        return null;
      }
  
      const updatedUser = await response.json();
  
      // Update the loggedInUser context
      setLoggedInUser((prevUser) => {
        if (!prevUser) return null;
  
        return {
          ...prevUser,
          [field]: value, // Update the profileImage field even if it's an empty string
        };
      });
  
      console.log("Updated user:", updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError("An error occurred while updating your information.");
      return null;
    }
  };
    
   

  return (
    <section>
      <h3>Edit your info</h3>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
  <InputField
    labelText="Username:"
    type="text"
    name="username"
    id="username"
    placeholderText="Enter your username"
    value={formik.values.username}
    onChangeF={formik.handleChange}
    onBlurF={formik.handleBlur} // Pass Formik's handleBlur
  />
  {formik.touched.username && formik.errors.username && (
    <p style={{ color: "red" }}>{formik.errors.username}</p>
  )}

  <InputField
    labelText="Profile Image:"
    type="text"
    name="profileImage"
    id="profileImage"
    placeholderText="Enter image URL"
    value={formik.values.profileImage}
    onChangeF={formik.handleChange}
    onBlurF={formik.handleBlur}
  />
  {formik.touched.profileImage && formik.errors.profileImage && (
    <p style={{ color: "red" }}>{formik.errors.profileImage}</p>
  )}

  <InputField
    labelText="Password:"
    type="password"
    name="password"
    id="password"
    placeholderText="Enter new password"
    value={formik.values.password}
    onChangeF={formik.handleChange}
    onBlurF={formik.handleBlur}
  />
  {formik.touched.password && formik.errors.password && (
    <p style={{ color: "red" }}>{formik.errors.password}</p>
  )}

  <InputField
    labelText="Password Repeat:"
    type="password"
    name="passwordRepeat"
    id="passwordRepeat"
    placeholderText="Repeat new password"
    value={formik.values.passwordRepeat}
    onChangeF={formik.handleChange}
    onBlurF={formik.handleBlur}
  />
  {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
    <p style={{ color: "red" }}>{formik.errors.passwordRepeat}</p>
  )}

  <Input type="submit" value="Update" />
</form>

    </section>
  );
};

export default EditForm;
