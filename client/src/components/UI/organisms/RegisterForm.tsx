import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UsersContext, { ContextTypes, NewUserType  } from "../../../contexts/UsersContext";
import * as Yup from "yup";


const RegisterForm = () => {
  const { users, addNewUser, setLoggedInUser } = useContext(UsersContext) as ContextTypes;
  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      profileImage: "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must be at least 5 symbols length")
        .max(20, "Username can be up to 20 symbols length")
        .required("Field must be filled")
        .trim(),
      profileImage: Yup.string().url("Must be a valid URL"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          "Password must be at least: one lower case, one upper case, one number, one special symbol, and length between 8 and 25"
        )
        .required("Field must be filled")
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Field must be filled"),
    }),
    onSubmit: async (values) => {
  console.log(values)
      const newUser: NewUserType = {
        username: values.username,
        profileImage: values.profileImage || null,
        password: values.password,
      };

      if (users.some((user) => user.username === newUser.username)) {
        setRegisterError("User with this username already exists.");
        return;
      }

      const createdUser = await addNewUser(newUser);
      setLoggedInUser(createdUser);

      navigate("/");
    },
  });

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username && (
            <p>{formik.errors.username}</p>
          )}
        </div>
        <div>
          <input
            type="url"
            name="profileImage"
            id="profileImage"
            placeholder="profileImage"
            value={formik.values.profileImage}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.profileImage && formik.errors.profileImage && (
            <p>{formik.errors.profileImage}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            placeholder="password repeat"
            value={formik.values.passwordRepeat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
            <p>{formik.errors.passwordRepeat}</p>
          )}
        </div>
        <input type="submit" value="Register" />
      </form>
      {registerError && <p>Error: {registerError}</p>}
      <p>
        Already have an account? Go <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterForm;
