"use client";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import DoctorImg from "../../images/doctor.jpg";
import AS from "../../images/AS.png";
import HRM from "../../images/HRM.png";
import DC from "../../images/DC.png";
import AH from "../../images/AH.png";

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

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
              vitalCare360 is a comprehensive healthcare platform that
              revolutionizes the way people access and experience healthcare
              services. we offer a range of solutions designed to streamline
              healthcare processes, improve patient outcomes, and enhance
              overall healthcare experiences.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div
                className="w-full md:w-[350px] rounded-md border bg-gray-200"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease"
              >
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
                    type="button"
                    className="mt-4 rounded-md bg-blue-400 px-2.5 py-1 text-lg font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Link to="/patient/diagnosislist">Secure Slot</Link>
                  </button>
                </div>
              </div>

              <div
                className="w-full md:w-[350px] rounded-md border bg-gray-200"
                data-aos="fade-left"
                data-aos-offset="300"
                data-aos-easing="ease"
              >
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
                    <Link to="/patient/diagnosislist?videoConsult=true">
                      Connect Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 md:my-8 lg:my-8 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              vitalCare360
            </p>
          </div>
          <h2 className="mt-6 text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
            Why <span className="text-blue-400">vitalCare360</span> is the
            Secure and Ideal Choice for Your Healthcare Scheduling Needs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            vitalCare360 offers a secure and user-friendly platform tailored to
            meet all your healthcare scheduling needs with precision and peace
            of mind.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img className="h-12 w-12 text-gray-700" src={AS} />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Appointment Scheduling
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Allow patients to schedule appointments with healthcare providers
              online.
            </p>
          </div>
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img className="h-12 w-12 text-gray-700" src={HRM} />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Health Records Management
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Provide a platform for patients to securely store and access their
              medical records and history.
            </p>
          </div>
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img className="h-12 w-12 text-gray-700" src={DC} />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Healthcare Provider Profiles
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Create detailed profiles for healthcare providers, including their
              credentials, specialties, and experience.
            </p>
          </div>
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img className="h-12 w-12 text-gray-700" src={AH} />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Appointment History
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Maintain a record of past appointments and medical history for
              patients and healthcare providers to reference.
            </p>
          </div>
        </div>
      </div>
      {/* FAQs */}
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
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
