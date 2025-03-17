import Messages from '@/components/messages';

export default async function MessagesPage() {
  
  // const response = await fetch('http://localhost:8080/messages',{
    //  default value of cach property is set to force-cache in next.js v14 but for the v15 or above its been set to no-store
      // cache: 'no-store',
      // or you can use the below code to set the cache property to revlidate the cache data after 7 seconds
      // next:{
      //   revalidate:7
      // }
    // });
  const response = await fetch('http://localhost:8080/messages');
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
