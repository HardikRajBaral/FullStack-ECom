"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserFormSchema } from "@repo/types";


const AddUser = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues:{
      firstName:"",
      lastName:"",
      userName:"",
      emailAdderss:[],
      password:""
    }
  });

  const {getToken} = useAuth()
  
  const mutation = useMutation({
      mutationFn: async(data:z.infer<typeof UserFormSchema>) => {
        const token = await getToken()
        const res=await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify(data)
        })
        if(!res.ok){
          throw new Error("Failed to add category")
        }
  
      },
      onSuccess:()=>{
        toast.success("Category added successfully")
      },
      onError:()=>{
        toast.error("Failed to add category")
      }
    })
  
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add User</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter user first name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter user Last name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter user name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAdderss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Adderess </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="email1@gmail.com, email2@gmail.com"
                      onChange={(e)=>{
                        const emails= e.target.value.split(",").map(email=>email.trim()).filter(email=>email)
                        field.onChange(emails)
                      }}/>
                    </FormControl>
                    <FormDescription>
                      Only admin can see your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter user password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">{mutation.isPending?"Submitting...":"Submit"}</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddUser;
