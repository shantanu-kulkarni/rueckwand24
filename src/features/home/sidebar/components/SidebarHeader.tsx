type Props = {
  title: string;
  description: string;
};

export default function SidebarHeader({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-left">
        {title}
      </h2>
      <p className="text-lg text-neutral-500 font-light text-left">
        {description}
      </p>
    </div>
  );
}
