"use client";

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
import { issueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/Components/ErrorMessage";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = async (data: IssueFormData) => {
    const toastId = toast.loading("Loading data...");
    try {
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        toast.remove(toastId);
        toast.success("Issue updated successfully!");
      } else {
        await axios.post("/api/issues", data);
        toast.remove(toastId);
        toast.success("Issue created successfully!");
      }

      router.push("/issues");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.remove(toastId);
      toast.error("An error occurred");
    }
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        defaultValue={issue?.title}
        placeholder="Enter title..."
        {...register("title")}
      />

      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Enter description..." {...field} />
        )}
      />

      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isSubmitting}>
        {issue ? "Update Issue" : "Submit Issue"}
      </Button>
    </form>
  );
};

export default IssueForm;
