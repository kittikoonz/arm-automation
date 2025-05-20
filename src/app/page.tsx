import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Farm Automation</h1>
        <p className="subtitle">Automate your farming tasks with ease</p>
        
        <div className="button-group">
          <Link href="/login" className="button button-primary">
            Login
          </Link>
          <Link href="/register" className="button button-secondary">
            Register
          </Link>
        </div>
        
        <p className="footer-text">
          Powered by advanced automation technology
        </p>
      </div>
    </div>
  );
}
