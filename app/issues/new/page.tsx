'use client'

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/Components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: IssueForm) => {
    const toastId = toast.loading("Loading data...");
    try {
      await axios.post("/api/issues", data);
      toast.remove(toastId);
      toast.success("Issue created successfully!");

      router.push("/issues");
    } catch (error) {
      console.error(error);
      toast.remove(toastId);
      toast.error("An error occurred");
    }
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Enter title..." {...register("title")} />

      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Enter description..." {...field} />
        )}
      />

      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isSubmitting}>Submit Issue</Button>
    </form>
  );
};

export default NewIssuePage;
