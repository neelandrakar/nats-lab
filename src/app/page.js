"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.error("Error fetching session on home:", err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryError("");
    setEnquiryLoading(true);

    try {
      const payload = {
        phone: enquiryPhone,
        message: enquiryMessage
      };

      if (!currentUser) {
        payload.name = enquiryName;
        payload.email = enquiryEmail;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setEnquirySuccess(true);
      setEnquiryPhone("");
      setEnquiryMessage("");
      setEnquiryName("");
      setEnquiryEmail("");
    } catch (err) {
      setEnquiryError(err.message);
    } finally {
      setEnquiryLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <div className="eyebrow">Software • Web • Automation</div>
            <h1>Practical technology for growing businesses.</h1>
            <p>
              NATS Lab builds websites, business software, mobile apps and
              automation systems that make everyday work simpler, faster and
              easier to manage.
            </p>
            <div className="actions">
              <Link href="#contact" className="btn btn-dark">
                Discuss a Project
              </Link>
              <Link href="#services" className="btn btn-light">
                View Services
              </Link>
            </div>
          </div>
          <div className="hero-note reveal">
            From a simple company website to a custom CRM or internal business
            tool, every solution is built around the actual business need.
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-grid">
            <div className="reveal">
              <div className="kicker">Services</div>
              <h2>Everything I can build for your business.</h2>
            </div>
            <div className="reveal">
              <p className="intro">
                A compact mix of development, automation, integration and support
                services—without the usual agency jargon.
              </p>
              <div className="services">
                <div className="service">
                  <h3>Website Development</h3>
                  <p>
                    Business websites, landing pages, portfolio sites, real-estate
                    sites, responsive redesigns and maintenance.
                  </p>
                  <div className="tags">
                    <span className="tag">Business Sites</span>
                    <span className="tag">Landing Pages</span>
                    <span className="tag">Redesign</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Web Applications</h3>
                  <p>
                    Custom dashboards, portals, internal tools and full web
                    applications designed around your workflow.
                  </p>
                  <div className="tags">
                    <span className="tag">Dashboards</span>
                    <span className="tag">Portals</span>
                    <span className="tag">Admin Panels</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Custom Business Software</h3>
                  <p>
                    CRM, lead management, dealer management, inventory, sales,
                    employee and order management systems.
                  </p>
                  <div className="tags">
                    <span className="tag">CRM</span>
                    <span className="tag">Inventory</span>
                    <span className="tag">Operations</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Mobile App Development</h3>
                  <p>
                    Cross-platform business and customer applications for Android
                    and iOS using Flutter.
                  </p>
                  <div className="tags">
                    <span className="tag">Flutter</span>
                    <span className="tag">Business Apps</span>
                    <span className="tag">Customer Apps</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Backend & API Development</h3>
                  <p>
                    Node.js and PHP backends, REST APIs, authentication,
                    role-based access and server-side business logic.
                  </p>
                  <div className="tags">
                    <span className="tag">Node.js</span>
                    <span className="tag">PHP</span>
                    <span className="tag">REST API</span>
                  </div>
                </div>

                <div className="service">
                  <h3>AI Agents & Chatbots</h3>
                  <p>
                    Customer support bots, lead assistants, internal knowledge
                    assistants and AI-powered business tools.
                  </p>
                  <div className="tags">
                    <span className="tag">AI Agents</span>
                    <span className="tag">Chatbots</span>
                    <span className="tag">Lead Assistants</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Business Automation</h3>
                  <p>
                    Lead capture, follow-ups, notifications, reporting, document
                    processing and repetitive workflow automation.
                  </p>
                  <div className="tags">
                    <span className="tag">Workflows</span>
                    <span className="tag">Lead Automation</span>
                    <span className="tag">Reports</span>
                  </div>
                </div>

                <div className="service">
                  <h3>API & Third-Party Integrations</h3>
                  <p>
                    Payment gateways, WhatsApp, email, CRM, maps, AI services,
                    databases and external platform integrations.
                  </p>
                  <div className="tags">
                    <span className="tag">Payments</span>
                    <span className="tag">WhatsApp</span>
                    <span className="tag">Integrations</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Database Development</h3>
                  <p>
                    MongoDB and MySQL database design, schema planning, query
                    optimization, migration and reporting.
                  </p>
                  <div className="tags">
                    <span className="tag">MongoDB</span>
                    <span className="tag">MySQL</span>
                    <span className="tag">Optimization</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Software Testing & QA</h3>
                  <p>
                    Manual testing, API testing, regression testing, test cases,
                    bug reporting and release validation.
                  </p>
                  <div className="tags">
                    <span className="tag">Manual QA</span>
                    <span className="tag">API Testing</span>
                    <span className="tag">Regression</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Bug Fixing & Maintenance</h3>
                  <p>
                    Fix broken websites, APIs, backend issues, database problems,
                    app bugs and improve existing software.
                  </p>
                  <div className="tags">
                    <span className="tag">Bug Fixes</span>
                    <span className="tag">Maintenance</span>
                    <span className="tag">Upgrades</span>
                  </div>
                </div>

                <div className="service">
                  <h3>Deployment & Technical Setup</h3>
                  <p>
                    Application deployment, domain and SSL setup, environment
                    configuration, database hosting and production setup.
                  </p>
                  <div className="tags">
                    <span className="tag">Deployment</span>
                    <span className="tag">SSL</span>
                    <span className="tag">Production Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer / Packages Section */}
      <section>
        <div className="container">
          <div className="offer reveal">
            <div>
              <div className="kicker">Simple packages</div>
              <h2>Start small. Add more when you need it.</h2>
              <p>
                You do not need a massive software project on day one. NATS Lab
                can start with one problem and build from there.
              </p>
            </div>
            <div className="offer-list">
              <div className="offer-item">
                <strong>Business Website</strong>
                <span>Website + enquiry flow + basic integrations</span>
              </div>
              <div className="offer-item">
                <strong>Website + Automation</strong>
                <span>Website + lead capture + follow-up workflows</span>
              </div>
              <div className="offer-item">
                <strong>Custom Business System</strong>
                <span>CRM, dashboard or workflow built for your process</span>
              </div>
              <div className="offer-item">
                <strong>Ongoing Support</strong>
                <span>Maintenance, fixes and improvements every month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach">
        <div className="container">
          <div className="section-grid">
            <div className="reveal">
              <div className="kicker">Approach</div>
              <h2>Simple process. Clear communication.</h2>
            </div>
            <div>
              <div className="process">
                <div className="step reveal">
                  <div className="num">01</div>
                  <h3>Understand</h3>
                  <p>
                    We identify the actual business problem and what needs to
                    improve.
                  </p>
                </div>
                <div className="step reveal">
                  <div className="num">02</div>
                  <h3>Plan</h3>
                  <p>
                    The solution, scope and priorities are defined before
                    development begins.
                  </p>
                </div>
                <div className="step reveal">
                  <div className="num">03</div>
                  <h3>Build</h3>
                  <p>
                    The product is developed, tested and refined in practical
                    stages.
                  </p>
                </div>
                <div className="step reveal">
                  <div className="num">04</div>
                  <h3>Support</h3>
                  <p>
                    After launch, the system can be maintained and expanded as
                    your business grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="contact-box reveal">
            <div>
              <div className="kicker">Contact</div>
              <h2>Have something you want to build or improve?</h2>
              <p>
                Tell me what your business needs. I can help you decide whether
                you need a website, an automation, custom software—or something
                much simpler.
              </p>
              {showEnquiry ? (
                enquirySuccess ? (
                  <div className="space-y-4 py-2">
                    <p className="font-bold text-sm text-emerald-800">Thanks for reaching out!</p>
                    <p className="text-xs text-[#6d6d68] leading-relaxed">Your enquiry message has been received. I&apos;ll get back to you soon.</p>
                    <button 
                      type="button"
                      className="text-xs font-bold text-[#234b3a] hover:underline cursor-pointer"
                      onClick={() => setEnquirySuccess(false)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3 mt-4 w-full text-left">
                    {enquiryError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg font-medium">
                        {enquiryError}
                      </div>
                    )}
                    
                    {!currentUser && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6d6d68] mb-1.5">Name *</label>
                          <input
                            type="text"
                            required
                            value={enquiryName}
                            onChange={(e) => setEnquiryName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6d6d68] mb-1.5">Email *</label>
                          <input
                            type="email"
                            required
                            value={enquiryEmail}
                            onChange={(e) => setEnquiryEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6d6d68] mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        placeholder="+91 99999 99999"
                        className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6d6d68] mb-1.5">Your Message / Query *</label>
                      <textarea
                        required
                        rows={3}
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        placeholder="How can we help your business?"
                        className="w-full rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={enquiryLoading}
                        className="btn btn-dark text-xs py-2 px-4 cursor-pointer"
                      >
                        {enquiryLoading ? "Sending..." : "Submit Enquiry"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEnquiry(false);
                          setEnquiryError("");
                        }}
                        className="btn btn-light text-xs py-2 px-4 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-dark cursor-pointer"
                    onClick={() => setShowEnquiry(true)}
                  >
                    Send an Enquiry
                  </button>
                  <a
                    className="btn btn-light"
                    href="https://wa.me/910000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="contact-details">
              <div>
                <strong>NATS Lab</strong>Software, Web & Automation
              </div>
              <div>
                <strong>Founder</strong>Neelandra Kar
              </div>
              <div>
                <strong>Work With</strong>Businesses, startups, agencies & local
                companies
              </div>
              <div>
                <strong>Available For</strong>One-time projects & ongoing
                support
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
