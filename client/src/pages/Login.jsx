import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/users";
import { setCredentials } from "@/redux/features/auth/authSlice";
import Loader from "@/shared-components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

// Define the form schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Define the Login component
const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  // console.log(sp);
  // console.log(redirect);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Initialize the form with the schema and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const res = await login(values).unwrap();
      //console.log(res);
      if (res.success) {
        dispatch(setCredentials(res.user));
        navigate(redirect);
        toast.success(res.message);
      }
    } catch (error) {
      toast.success(error.data.error);
    }
  };

  return (
    <div className="container  flex flex-col justify-center items-center h-screen">
      <h4 className="text-3xl my-3">Login User</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-1/2"
        >
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          {isLoading ? <Loader /> : <Button type="submit">Login</Button>}

          <p>
            Do not have an account{" "}
            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
