import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with social links */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">WebGuruz</h1>
          <div className="flex gap-4">
            <Link 
              href="/admin/login" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Admin Login
            </Link>
            <Link 
              href="/user/login" 
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
            >
              User Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-8">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Full Stack Developer (MERN)</h2>
            <p className="text-xl text-gray-600">nsinghrajputx@gmail.com | 9752661779 | Gwalior, India</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6">Professional Experience</h3>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Full-Stack Developer | Team Lead - Anthem Infotech Pvt. Ltd.</h4>
                <p className="text-gray-600 mb-2">11/2024 – present | Zirakpur, India</p>
                <ul className="list-disc pl-5">
                  <li>Led development of scalable full-stack apps using React, Next.js (App Router), Node.js, and MongoDB</li>
                  <li>Implemented secure JWT authentication, bcrypt encryption, REST APIs</li>
                  <li>Optimized CI/CD pipelines with Azure DevOps</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Web Developer | Team Lead - TinyScript Soft Tech</h4>
                <p className="text-gray-600 mb-2">01/2024 – 11/2024 | Ahmedabad, India</p>
                <ul className="list-disc pl-5">
                  <li>Developed full-stack web and mobile applications using React.js, Next.js, Node.js, and React Native</li>
                  <li>Delivered IELTS learning platform, corporate portal, and Android TV app</li>
                  <li>Implemented Redux Toolkit and optimized API performance</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Web Developer (Junior + Internship) - Webreate</h4>
                <p className="text-gray-600 mb-2">01/2023 – 12/2023 | Dehradun, India</p>
                <ul className="list-disc pl-5">
                  <li>Developed web applications with JWT authentication and Node.js/Express backend</li>
                  <li>Managed state with Redux Toolkit and implemented React Router DOM</li>
                  <li>Optimized frontend performance through lazy loading</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Frontend</h4>
                <p className="text-gray-600">React.js, Next.js, React Native, HTML5, CSS3, JavaScript, Tailwind CSS, Redux Toolkit</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Backend</h4>
                <p className="text-gray-600">Node.js, Express.js, RESTful APIs, JWT, MongoDB, SQL</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cloud Services</h4>
                <p className="text-gray-600">Azure DevOps, GitHub Actions, AWS EC2, AWS S3</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Integration</h4>
                <p className="text-gray-600">Stripe, PayPal, PhonePe, Acquired, Razorpay</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>Portfolio: <a href="https://www.nsrgfx.in/" className="underline">www.nsrgfx.in</a></p>
        </div>
      </footer>
    </div>
  );
}
