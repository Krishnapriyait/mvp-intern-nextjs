import Image from 'next/image';
import Head from 'next/head';
import { useEffect } from 'react';
import Link from 'next/link';
export default function Hunger() {
  useEffect(() => {
    const form = document.getElementById('hungerRequestForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(
        'Thank you for submitting your request. Our team will get in touch with you shortly.'
      );
      form.reset();
    });
  }, []);

  return (
    <>
      <Head>
        <title>DonAid - Hungers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(to bottom right, #fffef7, #fefae0);
          color: #333;
        }
      `}</style>

      <style jsx>{`
        header {
          background-color: #6a994e;
          padding: 10px 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo img {
          height: 60px;
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
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
        }

        main {
          max-width: 900px;
          margin: 40px auto;
          background: white;
          border-radius: 12px;
          padding: 30px 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        main h2 {
          color: #6a994e;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
        }
        main p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 25px;
          text-align: center;
        }

        .form-container {
          animation: zoomDropFade 1.5s ease;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 30px;
          margin: 30px auto;
          max-width: 600px;
          box-shadow: 0 0 25px rgba(33, 150, 243, 0.4);
          border: 2px solid rgba(33, 150, 243, 0.3);
        }

        @keyframes zoomDropFade {
          0% {
            opacity: 0;
            transform: scale(1.2) translateY(-40px);
            box-shadow: 0 0 60px rgba(33, 150, 243, 0.7);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            box-shadow: 0 0 25px rgba(33, 150, 243, 0.4);
          }
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
        }
        label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        input[type='text'],
        input[type='email'],
        input[type='tel'],
        textarea {
          padding: 10px;
          border: 2px solid #6a994e;
          border-radius: 6px;
          font-size: 16px;
          resize: vertical;
        }
        textarea {
          min-height: 100px;
        }
        button {
          background-color: #6a994e;
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #386641;
        }

        footer {
          text-align: center;
          padding: 20px;
          background-color: #d4d4d4;
          color: #333;
          font-size: 14px;
          margin-top: 50px;
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

      <main>
        <h2>Request Food Assistance</h2>
        <p>
          If you or someone you know is in need of food assistance, please fill out the form below. We
          will connect you with nearby donors and NGOs to provide timely help.
        </p>

        <div className="form-container">
          <form id="hungerRequestForm">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" required placeholder="Your full name" />

            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="Your email address" />

            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Your phone number"
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
            />

            <label htmlFor="location">Location *</label>
            <input type="text" id="location" name="location" required placeholder="Your area or city" />

            <label htmlFor="details">Additional Details</label>
            <textarea id="details" name="details" placeholder="Describe your needs or situation"></textarea>

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </main>

      <footer>&copy; 2025 DonAid. All rights reserved.</footer>
    </>
  );
}
