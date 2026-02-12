import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">ERP Landing</h1>
        <p className="text-muted-foreground">CRUD Management System</p>
        <Link 
          href="/crud" 
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-8 hover:bg-primary/90"
        >
          Go to CRUD Management
        </Link>
      </div>
    </div>
  );
}
