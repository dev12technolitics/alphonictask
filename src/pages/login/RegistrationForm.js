import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { postRegisterUser } from "../../redux/slices/loginRegister";
import FormProvider, { RHFTextField } from "../components/hook-form";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegistrationFormSchema = Yup.object().shape({
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
    resolver: yupResolver(RegistrationFormSchema),
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
      <div className="bg-[#F8F8F9] flex justify-center item-center">
        <div className="w-[30%] mt-[40px] mb-[40px] p-12 shadow rounded-lg bg-[#ffff]">
          <div className="pb-6 text-center md:mb-0 lg:text-left flex justify-between ">
            <h1 className="text-[#0000FF] font-bold">Creat a Account</h1>
          </div>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <section>
                <div className="h-full w-full text-gray-800">
                  <div className="mb-6">
                    <Stack spacing={3}>
                      <RHFTextField name="name" label="User Name" />

                      <RHFTextField name="email_id" label="Email Id" />

                      <RHFTextField name="contact_no" label="Contact No" />

                      <RHFTextField
                        name="password"
                        label="Password"
                        type="password"
                      />

                      <RHFTextField
                        name="c_pass"
                        label="Confirm New Password"
                        type="password"
                      />
                    </Stack>
                  </div>
                  <div className="mb-24 text-center md:mb-0 lg:text-left">
                    <div className="btn font-inter flex justify-start rounded-md  my-4">
                      <button
                        type="submit"
                        className="btn_about bg-[#0000FF] text-[#ffff] p-2 shadow rounded-xl "
                      >
                        <span className="all">Register now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </Stack>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
