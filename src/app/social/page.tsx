import Chat from "@/components/Chat";

export default function Page() {
  return (
    <div className="md:flex md:justify-between gap-3">
        <div className="hidden md:flex md:flex-col">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
        </div>
        <div className="flex flex-col gap-3">
            <div>Create Post</div>
            <div className="flex flex-col">
                <div>Post</div>
                <div>Post</div>
                <div>Post</div>
                <div>Post</div>
            </div>
        </div>
        <div className="hidden md:flex md:flex-col gap-1">
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