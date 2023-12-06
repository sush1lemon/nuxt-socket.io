export default function (thread: string, message: string) {

  const { user } = useUser();
  if (user.value) {
    const { id, name } = user.value;
    return useFetch('/api/new-message', {
      body: { thread, message, from_id: id, from_name: name},
      method: "post",
    })
  }
}
