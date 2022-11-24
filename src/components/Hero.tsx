import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__hero-content">
        <p>Everyone have something to say...</p>
        <p>Start writing blog articles with us</p>
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
