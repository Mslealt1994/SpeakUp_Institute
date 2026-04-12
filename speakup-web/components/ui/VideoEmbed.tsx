interface VideoEmbedProps {
  url: string;
  title?: string;
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl my-10 not-prose">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}