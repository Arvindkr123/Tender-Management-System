import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { parse } from "date-fns";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/redux/features/auth/authSlice";
import Loader from "@/shared-components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import Cookies from "js-cookie";
import axios from "axios";
import { useAddTenderMutation } from "@/redux/api/adminApiSlice";

// Define the form schema
const tenderFormSchema = z.object({
  tenderName: z
    .string()
    .min(3, { message: "Tender Name must be at least 3 characters" }),
  tenderDescription: z
    .string()
    .min(20, { message: "Tender Description must be at least 20 characters" }),
  tenderStartTime: z.string(),
  tenderEndTime: z.string(),
  bufferTime: z
    .string()
    .min(0, { message: "Buffer Time must be a non-negative number" }),
});

// Define the Login component
const TenderForm = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  const form = useForm({
    resolver: zodResolver(tenderFormSchema),
    defaultValues: {
      tenderName: "",
      tenderDescription: "",
      tenderStartTime: new Date(),
      tenderEndTime: new Date(),
      bufferTime: 0,
    },
  });

  const [addTender] = useAddTenderMutation();

  const onSubmit = async (values) => {
    try {
      const headers = {
        Authorization: `Bearer ${userInfo.token}`,
      };
      const res = await addTender(values, { headers }).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen">
      <h4>Create Tender</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-1/2"
        >
          {/* Tender Name field */}
          <FormField
            control={form.control}
            name="tenderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tender Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Tender Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tender Description field */}
          <FormField
            control={form.control}
            name="tenderDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tender Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Tender Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tender Start Time field */}
          <FormField
            control={form.control}
            name="tenderStartTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tender Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Tender Start Time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tender End Time field */}
          <FormField
            control={form.control}
            name="tenderEndTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tender End Time</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Tender End Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buffer Time field */}
          <FormField
            control={form.control}
            name="bufferTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buffer Time</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Buffer Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type="submit">Create Tender</Button>
        </form>
      </Form>
    </div>
  );
};

export default TenderForm;
