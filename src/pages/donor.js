import Head from 'next/head';
import Image from 'next/image';

export default function Donor() {
  const donationItems = [
    { img: '/cooked.jpg', alt: 'Cooked Food', href: '/donation' },
    { img: '/packaged.jpg', alt: 'Packaged Food', href: '/donation' },
    { img: '/fruits.jpg', alt: 'Fruits & Vegetables', href: '/dnation' }, // typo preserved as per original
    { img: '/ration.jpg', alt: 'Dry Ration', href: '/donation' },
    { img: '/beverages.jpg', alt: 'Beverages & Water', href: '/donation' },
    { img: '/essential.jpg', alt: 'Essentials', href: '/donation' },
  ];

  return (
    <>
      <Head>
        <title>DonAid - Donors</title>
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
          flex-wrap: wrap;
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
          display: flex;
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          gap: 30px;
          flex-wrap: wrap;
        }
        aside {
          flex: 1;
          background-color: #f0fdf4;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }
        aside h2 {
          color: #6a994e;
          font-size: 24px;
          margin-bottom: 15px;
        }
        aside p {
          font-size: 16px;
          line-height: 1.6;
        }
        section {
          flex: 3;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }
        .card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s;
        }
        .card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .card:hover {
          transform: scale(1.03);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: opacity 0.4s ease;
          border-radius: 12px;
        }
        .card:hover .overlay {
          opacity: 1;
        }
        .overlay button {
          padding: 12px 20px;
          background-color: #f9c74f;
          color: #333;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
        .overlay button:hover {
          transform: scale(1.1);
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
          <a href="/hunger">Hungers</a>
          <a href="/donor">Donors</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <aside>
          <h2>Become a Donor</h2>
          <p>
            Join our mission to end hunger by donating your surplus food. Your contribution can help feed
            families, support NGOs, and reduce food waste.
          </p>
          <p>Click on any option to get started with donating. Every small act makes a big difference!</p>
        </aside>

        <section>
          {donationItems.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.img} alt={item.alt} />
              <div className="overlay">
                <button onClick={() => (window.location.href = item.href)}>Donate Now</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer>&copy; 2025 DonAid. All rights reserved.</footer>
    </>
  );
}
