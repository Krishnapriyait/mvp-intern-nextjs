import Head from "next/head";
import Link from 'next/link';
export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
  };

  return (
    <>
      <Head>
        <title>Contact - DonAid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #fefae0;
          color: #333;
        }
      `}</style>

      <style jsx>{`
        header {
          background-color: #6a994e;
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          flex-wrap: wrap;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo img {
          height: 50px;
          margin-right: 10px;
        }
        .logo h1 {
          font-size: 22px;
          margin: 0;
        }
        nav {
          display: flex;
          gap: 15px;
        }
        nav a {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
        }
        .main {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .left-contact {
          flex: 1;
          min-width: 300px;
        }
        .left-contact h2 {
          color: #1e293b;
          margin-bottom: 20px;
        }
        .flag-label {
          display: inline-flex;
          align-items: center;
          background-color: black;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .flag-label img {
          height: 16px;
          margin-right: 6px;
        }
        .info {
          margin-bottom: 20px;
        }
        .info p {
          margin: 5px 0;
        }
        iframe {
          width: 100%;
          height: 250px;
          border: none;
          border-radius: 12px;
          margin-top: 15px;
        }
        .right-form {
          flex: 1;
          min-width: 340px;
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(33, 150, 243, 0.3);
          border: 2px solid rgba(33, 150, 243, 0.4);
          animation: pulse 2s infinite alternate;
        }
        @keyframes pulse {
          from {
            box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
          }
          to {
            box-shadow: 0 0 25px rgba(33, 150, 243, 0.7);
          }
        }
        .right-form h3 {
          text-align: center;
          margin-bottom: 20px;
          color: #111;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        input,
        textarea {
          width: calc(50% - 10px);
          padding: 10px;
          border-radius: 8px;
          border: 2px solid #6a994e;
          font-size: 14px;
        }
        textarea {
          width: 100%;
          resize: vertical;
          min-height: 100px;
        }
        .form-row {
          width: 100%;
        }
        .submit-btn {
          width: 100%;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
        .submit-btn:hover {
          background-color: #0062cc;
        }
        footer {
          text-align: center;
          padding: 20px;
          background-color: #d4d4d4;
          color: #333;
          font-size: 14px;
          margin-top: 40px;
        }
      `}</style>

      <header>
        <div className="logo">
          <img src="/logo.jpg" alt="DonAid Logo" />
          <h1>DonAid</h1>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/#about">About Us</a>
          <Link href="/hunger">Hungers</Link>
  	  <Link href="/donor">Donors</Link>
  	  <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="main">
        <div className="left-contact">
          <h2>Need Assistance? Reach Out to Our Support Team</h2>
          <p>
            <strong>Home</strong> &gt; Contact
          </p>

          <h2>Our Contacts</h2>
          <div className="flag-label">
            <img src="https://flagcdn.com/in.svg" alt="India Flag" />
            India
          </div>
          <div className="info">
            <p>No.6, Dhanammal street, Spurtank road, Chetpet</p>
            <p>Chennai 600-031</p>
            <p>
              <strong>Call Us:</strong> +91 8069196991
            </p>
            <p>
              <strong>Email Us:</strong> office@donaid.org
            </p>
          </div>

          <h3>Our Location</h3>
          <iframe
            src="https://www.google.com/maps?q=No.6,+Dhanammal+Street,+Spurtank+Road,+Chetpet,+Chennai,+600031,+India&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="right-form">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name*" required />
            <input type="email" placeholder="Email*" required />
            <input type="tel" placeholder="Phone*" required />
            <input type="text" placeholder="Address*" required />
            <textarea className="form-row" placeholder="Case Description*" required></textarea>
            <div
              className="g-recaptcha form-row"
              data-sitekey="your_site_key_here"
            ></div>
            <button type="submit" className="submit-btn">
              Submit Now
            </button>
          </form>
        </div>
      </section>

      <footer>&copy; 2025 DonAid. All rights reserved.</footer>
    </>
  );
}
