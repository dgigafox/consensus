import Image from "next/image";

interface iProps {
  src: string | null
}

export default function CandidateAvatar({ src }: iProps) {
  if (!src) {
    return (
      <div className="h-12 w-12 rounded-full border overflow-hidden text-2xl flex items-center justify-center">?</div>
    )
  }

  return (
    <div className="h-12 w-12 rounded-full border overflow-hidden">
      <Image
        src={src}
        width={48}
        height={48}
        layout="intrinsic"
      />
    </div>
  )
}