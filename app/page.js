import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with login options */}
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
      {/* <main className="flex-grow container mx-auto p-8">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to WebGuruz</h2>
            <p className="text-xl text-gray-600">Your Digital Solutions Partner</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6">Our Tasks & Services</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Web Development</h4>
                <p className="text-gray-600">Custom website development using the latest technologies and frameworks.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Mobile Applications</h4>
                <p className="text-gray-600">Native and cross-platform mobile app development for iOS and Android.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-xl font-medium mb-2">UI/UX Design</h4>
                <p className="text-gray-600">User-centered design solutions that enhance user experience and engagement.</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-xl font-medium mb-2">Digital Marketing</h4>
                <p className="text-gray-600">Comprehensive digital marketing strategies to boost your online presence.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Why Choose WebGuruz?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Expert team with years of industry experience</li>
              <li>Customized solutions tailored to your business needs</li>
              <li>Timely delivery and excellent support</li>
              <li>Competitive pricing with no compromise on quality</li>
              <li>Long-term partnership approach</li>
            </ul>
          </div>
        </section>
      </main> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} WebGuruz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}