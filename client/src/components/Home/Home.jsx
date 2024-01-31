"use client";

import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, Filter, Menu, Moon, Star, X, Zap } from "lucide-react";
import DoctorImg from "../../images/doctor.jpg";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Blogs",
    href: "#",
  },
];

function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
            <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              Revolutionizing Healthcare: Your Wellness Starts Here
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-gray-700">
              vitalCare360 is a comprehensive healthcare platform that revolutionizes
              the way people access and experience healthcare services. we
              offer a range of solutions designed to streamline healthcare
              processes, improve patient outcomes, and enhance overall
              healthcare experiences.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="w-full md:w-[350px] rounded-md border bg-gray-200">
                <img
                  src={DoctorImg}
                  alt="doctor"
                  className="h-[175px] md:h-[250px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-2xl font-semibold">Book Appointment</h1>
                  <p className="mt-3 text-sm text-gray-600">
                    Secure your preferred time and meet your doctor hassle-free
                    by booking your appointment slot now!
                  </p>
                  <button
                    to="/diagnosislist"
                    className="mt-4 rounded-md bg-blue-400 px-2.5 py-1 text-lg font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Link to="/diagnosislist">Secure Slot</Link>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[350px] rounded-md border bg-gray-200">
                <img
                  src="https://www.gigadocs.com/blog/wp-content/uploads/2020/05/close-up-business-man-sit-home-having-online-consultation-with-doctor-tablet-reduce-social-distance-healthcare-concept_43157-1034.jpg"
                  alt="Laptop"
                  className="h-[175px] md:h-[250px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-2xl font-semibold">
                    Instant Video Consult
                  </h1>
                  <p className="mt-3 text-sm text-gray-600">
                    No more waiting rooms, just waiting moments. With our
                    Instant Video Consult
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-md bg-blue-400 px-2.5 py-1 text-lg font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 md:my-24 lg:my-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              100+ Tailwind Components
            </p>
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            DevUI helps you build beautiful website
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Secured Payments
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Zap className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Fast & Easy to Load
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Moon className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Light & Dark Version
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Filter className="h-9 w-9 text-gray-700" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Filter Blocks
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
        </div>
      </div>
      {/* FAQs */}
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
              assumenda
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <h2 className="text-xl font-semibold text-black">
                  How do I get started?
                </h2>
                <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat aliquam adipisci iusto aperiam? Sint asperiores sequi
                  nobis inventore ratione deleniti?
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-600">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="#"
              title=""
              className="black font-semibold hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
