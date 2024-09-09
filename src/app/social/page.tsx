import Chat from "@/components/Chat";

export default function Page() {
  return (
    <div className="container md:flex md:justify-center items-center gap-5">
        <div className="hidden w-1/4 md:flex md:flex-col">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
        </div>
        <div className="flex w-4/4 md:w-2/4 flex-col gap-3">
            <div>Create Post</div>
            <div className="flex flex-col">
                <div>Post</div>
                <div>Post</div>
                <div>Post</div>
                <div>Post</div>
            </div>
        </div>
        <div className="hidden w-1/4 md:flex md:flex-col gap-1">
            <div>Friends</div>
            <div>Friends</div>
            <div>Friends</div>
            <div>Friends</div>
        </div>
        <div className="hidden md:flex gap-1">
            <Chat />
        </div>
    </div>
  )
}