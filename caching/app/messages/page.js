import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";
import { unstable_noStore } from "next/cache";

// Based on the below approach you can change cach setting for all the fetch requests in this file and you dont need to change the cach setting in each fetch request by yourself

// export const revalidate=7 //its equivalent to next:{revalidate:7} in the fetch function
// export const dynamic="force-dynamic" // is equivalent to cahce:"no-store" in the fetch function

export default async function MessagesPage() {
  //unstable_noStore(); // this will set the cache property to no-store for all the fetch requests in component , you can use it when you have multiple component in a file and you wanna set cach:"no-store" for only one component and never cach for all the fetch function in that component

  // const response = await fetch('http://localhost:8080/messages',{
  //  default value of cach property is set to force-cache in next.js v14 but for the v15 or above its been set to no-store
  // cache: 'no-store',
  // or you can use the below code to set the cache property to revlidate the cache data after 7 seconds
  // next:{
  //   revalidate:7
  // }
  // });
  // const response = await fetch("http://localhost:8080/messages", {
  //   next: {
  //     tags: ["messagesList"],
  //   },
  // });
  // const messages = await response.json();

  const messages=getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
