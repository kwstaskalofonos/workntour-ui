import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isEmail } from "@src/utilities/ui";
import { ForgotPassword } from "@src/state/stores/user/models";
import { useParams } from "react-router-dom";


const ResetPassword: React.FunctionComponent= () => {
  let { token } = useParams();
  console.log(token)
  const { register, handleSubmit, getValues } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     

//   }, [])
  

  return (
    <>
      <section className="section">
        hello it's me
      </section>
    </>
  );
};

export default ResetPassword;
