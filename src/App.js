import React, { useState } from 'react';
import {
  Code, Smartphone, Cloud, Shield, BarChart2,
  Menu, X, ChevronRight, Mail, Phone, MapPin,
  Github, Linkedin, Twitter, ArrowRight, CheckCircle,
  Star, Users, Award, Zap
} from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }) => {
  const navLinks = ['home', 'about', 'services', 'portfolio', 'team', 'blog', 'contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">McTechy</span>
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => setCurrentPage(link)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  currentPage === link
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage('contact')}
            className="hidden md:block px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => { setCurrentPage(link); setIsMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium capitalize ${
                  currentPage === link ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Home = ({ setCurrentPage }) => {
  const services = [
    { icon: <Code className="w-6 h-6" />, title: 'Web Development', desc: 'Custom web applications built with modern technologies.' },
    { icon: <Smartphone className="w-6 h-6" />, title: 'Mobile Apps', desc: 'Cross-platform mobile solutions for iOS and Android.' },
    { icon: <Cloud className="w-6 h-6" />, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Cybersecurity', desc: 'Protect your business with enterprise-grade security.' },
    { icon: <BarChart2 className="w-6 h-6" />, title: 'Data Analytics', desc: 'Turn your data into actionable business insights.' },
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '200+', label: 'Happy Clients' },
    { value: '50+', label: 'Team Members' },
    { value: '10+', label: 'Years Experience' },
  ];

  return (
    <div className="pt-16">
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-purple-200 mb-6 border border-white/20">
            Technology Solutions for the Modern World
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building the Future<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              One Line at a Time
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-10">
            McTechy delivers innovative technology solutions that transform businesses and drive growth in the digital era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('services')}
              className="px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
            >
              Our Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Comprehensive technology solutions tailored to your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('services')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-purple-100 mb-8">Let's discuss how McTechy can help you achieve your technology goals.</p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
          >
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
};

const About = ({ setCurrentPage }) => {
  const values = [
    { icon: <Star className="w-5 h-5" />, title: 'Excellence', desc: 'We deliver nothing short of the best in every project.' },
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'We work as an extension of your team.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Innovation', desc: 'We embrace the latest technologies and methodologies.' },
    { icon: <Award className="w-5 h-5" />, title: 'Integrity', desc: 'Transparency and honesty in everything we do.' },
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About McTechy</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Empowering businesses with cutting-edge technology since 2014</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              McTechy is a leading technology solutions company dedicated to helping businesses thrive in the digital landscape. Founded in 2014, we've grown from a small startup to a trusted technology partner for companies across industries.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of passionate engineers, designers, and strategists work together to deliver innovative solutions that solve real business problems and create lasting value.
            </p>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Work With Us <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[{v:'500+', l:'Projects'},{v:'200+', l:'Clients'},{v:'50+', l:'Experts'},{v:'10+', l:'Years'}].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">{s.v}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Services = ({ setCurrentPage }) => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      desc: 'From landing pages to enterprise web applications, we build scalable, performant web solutions using React, Vue, Angular, and other modern frameworks.',
      features: ['Custom Web Apps', 'E-commerce Solutions', 'Progressive Web Apps', 'API Development'],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Apps',
      desc: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices.',
      features: ['iOS Development', 'Android Development', 'React Native', 'Flutter Apps'],
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud Solutions',
      desc: 'Cloud architecture, migration, and managed services on AWS, Azure, and Google Cloud to optimize your infrastructure.',
      features: ['Cloud Migration', 'DevOps & CI/CD', 'Serverless Architecture', 'Infrastructure as Code'],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Cybersecurity',
      desc: 'Comprehensive security assessments, implementation, and monitoring to protect your business from threats.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance (SOC2, GDPR)', 'Security Monitoring'],
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: 'Data Analytics',
      desc: 'Transform raw data into strategic insights with our advanced analytics and business intelligence solutions.',
      features: ['Business Intelligence', 'Data Visualization', 'Machine Learning', 'Data Engineering'],
    },
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Comprehensive technology solutions to drive your business forward</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {services.map((service, i) => (
          <div key={i} className={`flex flex-col lg:flex-row gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <div className="space-y-2">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-7xl font-bold text-gray-100">0{i + 1}</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-6">
                Our {service.title.toLowerCase()} services are designed to give you a competitive edge. We combine technical expertise with deep industry knowledge to deliver solutions that make a real difference.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Portfolio = () => {
  const projects = [
    { title: 'FinTech Platform', category: 'Web Development', desc: 'A comprehensive financial management platform serving 50K+ users.' },
    { title: 'HealthTrack App', category: 'Mobile Apps', desc: 'iOS/Android health tracking app with 200K+ downloads.' },
    { title: 'CloudMigrate Pro', category: 'Cloud Solutions', desc: 'Enterprise cloud migration for a Fortune 500 retailer.' },
    { title: 'SecureVault', category: 'Cybersecurity', desc: 'Zero-trust security implementation for a banking client.' },
    { title: 'DataPulse Dashboard', category: 'Data Analytics', desc: 'Real-time analytics dashboard processing 1M+ events daily.' },
    { title: 'EduConnect LMS', category: 'Web Development', desc: 'Learning management system serving 10K+ students.' },
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Showcasing our best work across industries and technologies</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-5xl font-bold opacity-20">{project.title[0]}</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{project.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Team = () => {
  const members = [
    { name: 'Alex Chen', role: 'CEO & Founder', desc: '15+ years in enterprise tech. Previously at Google and Microsoft.' },
    { name: 'Sarah Johnson', role: 'CTO', desc: 'Full-stack architect with deep expertise in cloud infrastructure.' },
    { name: 'Marcus Williams', role: 'Head of Design', desc: 'Award-winning UX designer with a passion for human-centered design.' },
    { name: 'Priya Patel', role: 'Head of Mobile', desc: 'Led mobile development teams at top fintech companies.' },
    { name: 'David Kim', role: 'Cloud Architect', desc: 'AWS certified solutions architect with 10+ years of experience.' },
    { name: 'Lisa Rodriguez', role: 'Security Lead', desc: 'Cybersecurity expert and former ethical hacker.' },
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Meet the talented people behind McTechy's success</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{member.name[0]}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-purple-600 text-sm font-medium mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.desc}</p>
              <div className="flex justify-center gap-3 mt-4">
                {[<Linkedin key="li" />, <Twitter key="tw" />].map((icon, j) => (
                  <div key={j} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-purple-600 cursor-pointer transition-colors">
                    {React.cloneElement(icon, { className: 'w-4 h-4' })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Blog = () => {
  const posts = [
    { title: 'The Future of AI in Enterprise Software', date: 'Nov 15, 2024', category: 'AI & ML', excerpt: 'Explore how artificial intelligence is reshaping enterprise software development and what it means for businesses.' },
    { title: 'Building Scalable Microservices with Kubernetes', date: 'Nov 8, 2024', category: 'Cloud', excerpt: 'A practical guide to designing and deploying microservices architectures using Kubernetes.' },
    { title: 'Zero Trust Security: A Modern Approach', date: 'Oct 30, 2024', category: 'Security', excerpt: 'Why traditional perimeter-based security is no longer enough and how to implement zero trust.' },
    { title: "React 18: What's New and How to Use It", date: 'Oct 22, 2024', category: 'Web Dev', excerpt: "Deep dive into React 18's new features including concurrent rendering and server components." },
    { title: 'Data-Driven Decision Making for SMBs', date: 'Oct 15, 2024', category: 'Analytics', excerpt: 'How small and medium businesses can leverage data analytics to compete with enterprise players.' },
    { title: 'Mobile-First Design in 2024', date: 'Oct 8, 2024', category: 'Design', excerpt: 'Best practices for designing mobile-first experiences that delight users across all devices.' },
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Insights, tutorials, and news from the McTechy team</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-40 bg-gradient-to-br from-purple-200 to-pink-200" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-purple-600 text-sm font-medium mt-4">
                  Read More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-purple-200 max-w-xl mx-auto">Let's start a conversation about your technology needs</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-4 mb-8">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@mctechy.com' },
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: <MapPin className="w-5 h-5" />, label: 'Office', value: '123 Tech Boulevard, San Francisco, CA 94102' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const PageShell = ({ title, children }) => (
  <div className="pt-16">
    <div className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-20 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {children}
    </section>
  </div>
);

const Privacy = () => (
  <PageShell title="Privacy Policy">
    <div className="text-gray-600 space-y-6">
      <p className="text-sm text-gray-400">Last updated: November 1, 2024</p>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
        <p>McTechy collects information you provide directly to us, such as when you fill out a contact form or request a service. This may include your name, email address, phone number, and message content.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
        <p>We use collected information to respond to your inquiries, provide our services, send service-related communications, and improve our website and offerings.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Security</h2>
        <p>We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">4. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@mctechy.com.</p>
      </div>
    </div>
  </PageShell>
);

const Terms = () => (
  <PageShell title="Terms & Conditions">
    <div className="text-gray-600 space-y-6">
      <p className="text-sm text-gray-400">Last updated: November 1, 2024</p>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
        <p>By accessing and using McTechy's services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">2. Services</h2>
        <p>McTechy provides technology consulting, development, and support services. The specific terms of any engagement are governed by a separate Service Agreement.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">3. Intellectual Property</h2>
        <p>Unless otherwise agreed in writing, all intellectual property created by McTechy shall remain the property of McTechy until full payment is received.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
        <p>McTechy shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services.</p>
      </div>
    </div>
  </PageShell>
);

const FAQ = () => {
  const faqs = [
    { q: 'What types of businesses do you work with?', a: 'We work with businesses of all sizes, from startups to Fortune 500 enterprises, across industries including finance, healthcare, retail, and technology.' },
    { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. Simple websites may take 4–6 weeks, while complex enterprise applications can take 6–12 months. We provide detailed timelines during our initial consultation.' },
    { q: 'Do you provide ongoing support after project completion?', a: 'Yes, we offer flexible maintenance and support packages to ensure your solution continues to perform optimally after launch.' },
    { q: 'How do you handle project pricing?', a: 'We offer both fixed-price and time-and-materials pricing models depending on project requirements. We provide transparent quotes after understanding your specific needs.' },
    { q: 'What technologies do you specialize in?', a: 'We specialize in React, Node.js, Python, AWS, Azure, Google Cloud, React Native, Flutter, and many other modern technologies. We choose the right tool for each job.' },
    { q: 'How do we get started?', a: "Simply reach out via our contact form or email. We'll schedule a free discovery call to understand your needs and discuss how we can help." },
  ];

  return (
    <PageShell title="Frequently Asked Questions">
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">McTechy</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Building the future, one line of code at a time.</p>
          <div className="flex gap-3">
            {[<Github key="gh" />, <Linkedin key="li" />, <Twitter key="tw" />].map((icon, i) => (
              <div key={i} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 cursor-pointer transition-colors">
                {React.cloneElement(icon, { className: 'w-4 h-4' })}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            {['home', 'about', 'services', 'portfolio', 'team', 'blog'].map(link => (
              <li key={link}>
                <button onClick={() => setCurrentPage(link)} className="hover:text-white transition-colors capitalize text-sm">
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'Cybersecurity', 'Data Analytics'].map(service => (
              <li key={service}>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-sm">
                  {service}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            {[
              { name: 'Privacy Policy', page: 'privacy' },
              { name: 'Terms & Conditions', page: 'terms' },
              { name: 'FAQs', page: 'faq' },
              { name: 'Contact', page: 'contact' },
            ].map(link => (
              <li key={link.page}>
                <button onClick={() => setCurrentPage(link.page)} className="hover:text-white transition-colors text-sm">
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">© 2024 McTechy. All rights reserved.</p>
        <p className="text-gray-500 text-sm">Made with love by the McTechy Team</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':      return <Home setCurrentPage={setCurrentPage} />;
      case 'about':     return <About setCurrentPage={setCurrentPage} />;
      case 'services':  return <Services setCurrentPage={setCurrentPage} />;
      case 'portfolio': return <Portfolio />;
      case 'team':      return <Team />;
      case 'blog':      return <Blog />;
      case 'contact':   return <Contact />;
      case 'privacy':   return <Privacy />;
      case 'terms':     return <Terms />;
      case 'faq':       return <FAQ />;
      default:          return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
