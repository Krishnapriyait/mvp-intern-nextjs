import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import FoodDonationForm from "../components/fooddonationform";
import DonationList from "../components/donationlist";
import { useEffect, useState } from "react";

export default function Home() {
  const [donations, setDonations] = useState([]);
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const defaultDonations = [
    { id: 1, type: "Cooked Food", quantity: 10 },
    { id: 2, type: "Packaged Food", quantity: 15 },
    { id: 3, type: "Fruits & Vegetables", quantity: 8 },
    { id: 4, type: "Dry Ration", quantity: 20 },
    { id: 5, type: "Beverages & Water", quantity: 5 },
    { id: 6, type: "Essentials", quantity: 12 },
  ];

  useEffect(() => {
    setDonations(defaultDonations);
  }, []);

  const addDonation = (newDonation) => {
    setDonations((prev) => {
      const index = prev.findIndex(
        (item) => item.type.toLowerCase() === newDonation.type.toLowerCase()
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += newDonation.quantity;
        return updated;
      } else {
        return [...prev, { ...newDonation, id: prev.length + 1 }];
      }
    });
  };

  const handleAI = async (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (!msg) return;

    setAiReply("Thinking...");
    setAiLoading(true);

    try {
      const res = await fetch("/api/backendchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: msg }] }),
      });
      const data = await res.json();
      setAiReply(data.choices?.[0]?.message?.content || "No reply");
    } catch (err) {
      setAiReply("❌ Error: Failed to connect with AI.");
    }

    setAiLoading(false);
  };

  return (
    <>
      <Head>
        <title>DonAid - Food Donation Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Global styles */}
      <style jsx global>{`html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(to bottom right, #fffef7, #fefae0);
          color: #333;
        }
        header {
          background-color: #6a994e;
          padding: 10px 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        header .logo {
          display: flex;
          align-items: center;
        }
        header .logo img {
          height: 60px;
          margin-right: 10px;
        }
        header .logo h1 {
          font-size: 22px;
          margin: 0;
        }
        nav a {
          color: white;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 600;
          font-size: 15px;
        }
        nav {
          display: flex;
          gap: 15px;
        }
        .video video {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          display: block;
        }
        .hero {
          text-align: center;
          padding: 60px 20px;
        }
        .hero h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #386641;
        }
        .hero p {
          font-size: 18px;
          max-width: 600px;
          margin: auto;
        }
        .section-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          padding: 30px;
          margin: 40px auto;
          max-width: 750px;
          line-height: 1.7;
        }
        .section-card h2 {
          text-align: center;
          font-size: 28px;
          color: #6a994e;
          margin-bottom: 15px;
        }
        .component-note {
          font-size: 13px;
          text-align: right;
          color: #888;
          margin-bottom: 10px;
        }
        .about {
          background-color: #fff;
          padding: 50px 20px;
          max-width: 1000px;
          margin: auto;
        }
        .about h2 {
          color: #6a994e;
          font-size: 32px;
          text-align: center;
          margin-bottom: 20px;
        }
        .about p {
          font-size: 17px;
          line-height: 1.6;
          margin-bottom: 20px;
          text-align: justify;
        }
        .about ul {
          list-style-type: none;
          padding: 0;
        }
        .about ul li::before {
          content: "✔️ ";
          color: #6a994e;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 40px 20px;
          max-width: 1200px;
          margin: auto;
        }
        .feature {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .feature h3 {
          margin-top: 0;
          color: #6a994e;
        }
        footer {
          text-align: center;
          padding: 20px;
          background-color: #d4d4d4;
          color: #333;
          font-size: 14px;
        }
      `}</style>

      <header>
        <div className="logo">
          <img src="/logo.jpg" alt="DonAid Logo" />
          <h1>DonAid</h1>
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="#about">About Us</a>
          <Link href="/hunger">Hungers</Link>
          <Link href="/donor">Donors</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      {/* Hero & sections */}
      <section className="video">
        <video controls autoPlay muted loop>
          <source src="/foodvideo.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="hero">
        <h2>Make a Difference with Every Meal</h2>
        <p>
          DonAid connects food donors and NGOs through smart location services
          and automated workflows to fight food waste and hunger effectively.
        </p>
      </section>

      <section className="donation-form-section">
        <div className="section-card">
          <div className="component-note">🌀 useState + useEffect used</div>
          <h2>Donate Food Now</h2>
          <FoodDonationForm onAddDonation={addDonation} />
        </div>
      </section>

      <section className="donation-list-section">
        <div className="section-card">
          <div className="component-note">🌀 useState + useEffect used</div>
          <h2>Recent Donations</h2>
          <DonationList donations={donations} />
        </div>
      </section>

      {/* About section */}
      <section className="about" id="about"> 
	<h2>About Us</h2>
        <p>
          At <strong>DonAid</strong>, we believe that no one should go to bed
          hungry. We are a community-driven platform committed to reducing food
          wastage and bridging the gap between surplus and need. Through our
          digital portal, we connect individuals, restaurants, event organizers,
          and other donors with NGOs, shelters, and people in need — making food
          donation faster, smarter, and more impactful.
        </p>
        <p>
          Founded with compassion and powered by technology, DonAid aims to make
          the act of giving as seamless as possible. Whether it’s a home-cooked
          meal, surplus from a function, or daily leftovers from a restaurant —
          every contribution matters.
        </p>
        <h3 style={{ color: "#6a994e" }}>Our Mission</h3>
        <p>
          To eliminate food waste and fight hunger by building a connected,
          efficient, and trustworthy network of donors and receivers.
        </p>
        <h3 style={{ color: "#6a994e" }}>What We Do</h3>
        <ul>
          <li>Connect Donors & Receivers: Match surplus food with those in need.</li>
          <li>Enable Safe Transfers: Ensure hygienic food handling via trained volunteers and partners.</li>
          <li>Track Donations: Maintain transparency with donation history and status.</li>
          <li>Provide User-Friendly Access: Let anyone donate or request food with ease.</li>
        </ul>
        <p>
          <strong>Join us and be a part of the change. Your small act can feed someone’s day.</strong>
        </p>	
    </section>

      {/* Features section */}
      <section className="features" id="features">
        <div className="feature">
          <h3>Real-Time Donations</h3>
          <p>
            Donors can submit food details instantly and get matched with nearby
            NGOs based on availability and need.
          </p>
        </div>
        <div className="feature">
          <h3>Smart Matching</h3>
          <p>
            Our intelligent system uses geolocation and capacity data to connect
            the right donor with the right NGO.
          </p>
        </div>
        <div className="feature">
          <h3>Track Donations</h3>
          <p>
            Both donors and NGOs can view donation history, track statuses, and
            generate reports for transparency.
          </p>
        </div>
        <div className="feature">
          <h3>Admin Panel</h3>
          <p>
            Admins can manage users, oversee donation statistics, and ensure
            timely pickups and deliveries.
          </p>
        </div>
      </section>



      {/* ✅ AI Assistant Section */}
      <section className="section-card" id="ai-assistant">
        <div className="component-note">🤖 AI Assistant</div>
        <h2>Ask Our AI</h2>
        <form onSubmit={handleAI}>
          <textarea
            name="message"
            placeholder="Ask something like 'How to donate safely?'"
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
              fontSize: "16px",
              resize: "vertical",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#6a994e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Ask AI
          </button>
        </form>
        {aiReply && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f0f8f4",
              borderRadius: "8px",
              border: "1px solid #b7e4c7",
              color: "#1a4d2e",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>AI:</strong> {aiReply}
          </div>
        )}
      </section>

      <footer>&copy; 2025 DonAid. All rights reserved.</footer>
    </>
  );
}
