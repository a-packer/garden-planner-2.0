import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header> 
        <ul>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/plants">Plants</Link></li>
          <li><Link href="/gardenPlanner">Garden Planner</Link></li>
        </ul>
      </header>
      <main>
        <h1>Home</h1>
        {/* Registration Form */}
      </main>      
    </div>
  );
}
