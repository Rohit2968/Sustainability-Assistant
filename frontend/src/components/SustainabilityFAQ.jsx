import React, { useEffect, useRef } from "react";

const faqs = [
  {
    question: "What are the UN Sustainable Development Goals (SDGs)?",
    answer:
      "The Sustainable Development Goals (SDGs) are a universal set of 17 interlinked goals created by the United Nations in 2015 to guide countries toward sustainable development by 2030. These goals address global challenges such as poverty, hunger, health, education, gender equality, clean water, clean energy, climate action, sustainable cities, and responsible production. The SDGs encourage all countries—developed and developing—to work together for economic growth, environmental protection, and social well-being. They serve as a blueprint for governments, organizations, and individuals to build a more peaceful, prosperous, and sustainable planet for current and future generations.",
  },
  {
    question: "What is India's National Solar Mission?",
    answer:
      "The National Solar Mission, launched under India's National Action Plan on Climate Change (NAPCC), aims to make India a global leader in solar energy production. It focuses on large-scale deployment of solar power plants, promoting rooftop solar adoption, creating solar parks, and reducing the cost of solar technologies. The mission seeks to generate tens of gigawatts of solar energy, encourage manufacturing of solar panels in India, expand solar-powered irrigation systems for farmers, and reduce dependence on fossil fuels. It also aims to create jobs, improve energy security, and contribute significantly to India's climate change goals.",
  },
  {
    question: "What is the Swachh Bharat Mission?",
    answer:
      "Swachh Bharat Mission (SBM), launched in 2014, is one of India's largest cleanliness and sanitation campaigns. It aims to eliminate open defecation through widespread construction of household and community toilets, improve waste management, and promote behavioural change among citizens. SBM also focuses on solid waste segregation, recycling, waste-to-energy programs, and creating cleaner public spaces. The mission has significantly improved sanitation coverage and empowered rural and urban communities to maintain hygienic surroundings, leading to better health outcomes and reduced waterborne diseases.",
  },
  {
    question: "What is the National Clean Air Programme (NCAP)?",
    answer:
      "The National Clean Air Programme (NCAP) is a comprehensive long-term strategy launched in 2019 to tackle air pollution in over 122 Indian cities. NCAP aims to reduce PM10 and PM2.5 levels by up to 40% through measures such as better air quality monitoring, controlling industrial emissions, promoting cleaner fuels, regulating road dust, restricting open waste burning, and supporting public transportation. It also encourages citizens to adopt eco-friendly practices like carpooling and using public transport. NCAP is a crucial step toward improving public health, as air pollution is one of India’s leading causes of respiratory and cardiovascular diseases.",
  },
  {
    question: "What is the Jal Jeevan Mission?",
    answer:
      "Jal Jeevan Mission is a flagship water supply program launched in 2019 to provide tap water connections to every rural household in India. The mission focuses on ensuring safe, adequate, and regular drinking water through infrastructure development, community participation, water quality testing, and sustainable source management. It promotes water conservation techniques such as rainwater harvesting and groundwater recharge. Jal Jeevan Mission empowers local communities, especially women, by reducing the time spent collecting water and improving health by providing clean, contamination-free drinking water.",
  },
  {
    question: "What is the National Green Hydrogen Mission?",
    answer:
      "The National Green Hydrogen Mission aims to make India a leading global producer and exporter of green hydrogen—fuel generated using renewable energy sources like solar and wind. The mission focuses on establishing hydrogen production hubs, reducing fossil fuel imports, promoting clean industrial processes, and supporting hydrogen-based transportation and shipping. Green hydrogen can decarbonize sectors such as steel, fertilizers, and heavy industries, making it essential for India’s transition to a low-carbon economy. The mission is expected to create new jobs, boost clean energy manufacturing, and strengthen India's position in the global clean-tech market.",
  },
  {
    question: "What is the National Mission for Sustainable Agriculture?",
    answer:
      "The National Mission for Sustainable Agriculture (NMSA) promotes climate-resilient and sustainable farming practices. It supports soil health management, efficient irrigation systems like drip and sprinkler technologies, improved crop varieties, and integrated nutrient management. The mission also helps farmers adapt to climate change by reducing the impacts of droughts, floods, and extreme weather. NMSA encourages water-efficient agriculture, organic farming, agroforestry, and use of technology to increase productivity while minimizing environmental harm.",
  },
  {
    question: "What is the AMRUT Mission?",
    answer:
      "The AMRUT Mission (Atal Mission for Rejuvenation and Urban Transformation) focuses on improving the quality of life in urban areas by providing essential infrastructure such as clean drinking water supply, sewage treatment systems, stormwater drainage, green open spaces, and non-motorized urban transportation. The mission encourages sustainable urban development, reduces pollution, and supports climate-friendly city planning. AMRUT also promotes smart city features, including efficient resource use and improved public health outcomes.",
  },
  {
    question: "What is PM-KUSUM Scheme?",
    answer:
      "PM-KUSUM is a major clean energy initiative aimed at helping farmers transition from diesel-powered pumps to solar-powered irrigation systems. The scheme provides financial assistance for installing solar pumps, solarizing existing grid-connected pumps, and setting up decentralized solar power plants on barren land. This reduces farmers' electricity costs, increases income, minimizes carbon emissions, and enhances India’s renewable energy capacity. PM-KUSUM also supports rural electrification and helps build a sustainable agricultural ecosystem.",
  },
  {
    question: "What is Waste Segregation?",
    answer:
      "Waste segregation involves dividing waste into different categories such as biodegradable, non-biodegradable, recyclable, e-waste, and hazardous waste at the point of disposal. It helps improve recycling efficiency, reduce landfill usage, prevent pollution, and support composting of organic materials. Proper segregation reduces the burden on municipal systems, enhances public health, and promotes a circular economy where materials are reused instead of discarded. It is one of the most effective and essential practices for sustainable waste management.",
  },
];

export default function SustainabilityFAQ() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    let direction = 1;
    let autoScroll = true;
    let resumeTimeout = null;

    const startAutoScroll = () => {
      autoScroll = true;
    };

    const stopAutoScroll = () => {
      autoScroll = false;
      clearTimeout(resumeTimeout);

      resumeTimeout = setTimeout(() => {
        autoScroll = true;
      }, 1500); // Resume after user stops interacting
    };

    // Listen for manual scroll
    slider.addEventListener("wheel", stopAutoScroll);
    slider.addEventListener("touchstart", stopAutoScroll);
    slider.addEventListener("touchmove", stopAutoScroll);
    slider.addEventListener("mousedown", stopAutoScroll);

    const interval = setInterval(() => {
      if (!slider || !autoScroll) return;

      slider.scrollLeft += 2 * direction;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        direction = -1;
      }
      if (slider.scrollLeft <= 0) {
        direction = 1;
      }
    }, 15);

    return () => {
      clearInterval(interval);
      slider.removeEventListener("wheel", stopAutoScroll);
      slider.removeEventListener("touchstart", stopAutoScroll);
      slider.removeEventListener("touchmove", stopAutoScroll);
      slider.removeEventListener("mousedown", stopAutoScroll);
    };
  }, []);

  return (
    <div className="w-full px-4 py-10">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-teal-600 relative inline-block">
          Sustainability Knowledge Hub
          <span className="absolute left-0 bottom-0 h-[3px] bg-teal-600 animate-underline"></span>
        </h1>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* SCROLLABLE CONTENT */}
        <div
          ref={scrollRef}
          id="scrollRow"
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar py-4"
        >
          {faqs.map((item, index) => (
            <div
              key={index}
              className="min-w-[500px] p-8 shadow-lg rounded-3xl bg-white 
                         hover:shadow-2xl transition transform hover:scale-105 cursor-pointer 
                         border border-green-100"
            >
              <h2
                className="text-2xl font-bold text-blue-600 mb-4 leading-snug"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {item.question}
              </h2>
              <p
                className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
