"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(previousState, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  let errors = [];
  if (!title || title.trim().length < 0) {
    errors.push("Title is required");
  }
  if (!content || content.trim().length < 0) {
    errors.push("Content is required");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.log(error);
    throw new Error("Image uploading failed, please try again later.");
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath("/","layout")
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed")
}
