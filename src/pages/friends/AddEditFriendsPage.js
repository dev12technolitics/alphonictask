import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { postRegisterUser } from "../../redux/slices/loginRegister";
import { RHFTextField } from "../components/hook-form";
import FormProvider from "../components/hook-form/FormProvider";

AddEditFriendsPage.propTypes = {
  isEdit: PropTypes.bool,
};

export default function AddEditFriendsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FriendsUsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email_id: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    contact_no: Yup.string().required("Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    c_pass: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const defaultValues = useMemo(() => ({
    name: "",
    email_id: "",
    password: "",
    contact_no: "",
  }));

  const methods = useForm({
    resolver: yupResolver(FriendsUsSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("data", data);
    let formData = new FormData();
    formData.set("name", data.name);
    formData.set("contact_no", data.contact_no);
    formData.set("email_id", data.email_id);
    formData.set("password", data.password);
    dispatch(postRegisterUser(formData, toast, reset, navigate));
  };

  return (
    <>
      <ToastContainer />
      <div className="my-4">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{ p: 4, mb: 6 }}
            className="rounded-xl shadow-lg bg-[#ffff]"
          >
            <h2 className="font-bold text-[18px] mb-4">Basic Info</h2>
            <Stack spacing={3}>
              <RHFTextField name="name" label="User Name" />

              <RHFTextField name="email_id" label="Email Id" />

              <RHFTextField name="contact_no" label="Contact No" />

              <RHFTextField name="password" label="Password" type="password" />

              <RHFTextField
                name="c_pass"
                label="Confirm New Password"
                type="password"
              />
            </Stack>
          </Stack>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained">
              Post Now
            </LoadingButton>
          </Stack>
        </FormProvider>
      </div>
    </>
  );
}
