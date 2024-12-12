import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import UsersContext, { UsersContextTypes } from "../../../contexts/UsersContext";

const LoginForm = () => {
  const { logUserIn } = useContext(UsersContext) as UsersContextTypes;
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must be at least 5 symbols length")
        .max(20, "Username can be up to 20 symbols length")
        .required("Field must be filled")
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          "Password must be at least: one lower case, one upper case, one number, one special symbol and length between 8 and 25"
        )
        .required("Field must be filled")
        .trim(),
    }),
   onSubmit: async (values) => {
      try {
        // console.log(values)
        const loginResponse = await logUserIn(values);
        if("error" in loginResponse) {
          setLoginMessage(loginResponse.error);
        } else {
          setLoginMessage(loginResponse.success);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } 
      } catch(err) {
        console.error(err);
      }
    }
  });

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div>
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

        <input type="submit" value="Login" />
      </form>
      {loginMessage && <p>Error: {loginMessage}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default  LoginForm;
