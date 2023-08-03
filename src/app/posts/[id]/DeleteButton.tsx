"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const { mutate: deleteComment, isLoading: deleting } = useMutation({
    // @ts-ignore
    mutationFn: async (id: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/comments/${id}`,
        {
          withCredentials: true,
        }
      );
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast({
          description: `${error.response?.data.message}`,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: "Comment deleted successfully",
      });
      router.refresh();
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="cursor-pointer hover:text-red-800" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>So you want to uncomment now?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone!!. Always think before you speak (or
            comment)
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="p-0">
            <Button
              isLoading={deleting}
              variant={"destructive"}
              onClick={() => deleteComment(id)}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
