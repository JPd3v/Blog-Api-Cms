import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__hero-content">
        <h1>Everyone have something to say...</h1>
        <h1>Start writing blog articles with us</h1>
        <div className="hero__hero-content-buttons hero-content-buttons">
          <Link className="hero-content-buttons__sign-in" to="/sign-up">
            Sign up
          </Link>
          <Link className="hero-content-buttons__log-in" to="/log-in">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
