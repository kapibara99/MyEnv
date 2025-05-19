export default function Base({ children }: { children: React.ReactNode }) {
	return <div className="w-full min-h-screen bg-base text-base-font-color relative overflow-hidden font-main">{children}</div>;
}
