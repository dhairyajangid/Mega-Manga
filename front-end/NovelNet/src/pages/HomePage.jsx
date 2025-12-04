// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import novelsAtom from "../atoms/novelsAtom";

import Carousel from "../components/Home/Carousel";
import FeaturedSection from "../components/Home/FeaturedSection";
import NovelGrid from "../components/Home/NovelGrid";
import TrendingSidebar from "../components/Home/TrendingSidebar";
import TopSeries from "../components/Home/TopSeries";
import Footer from "../components/Home/Footer";

const API_BASE = "http://localhost:3000/api/v1/upload"; // <= set to your backend

const HomePage = () => {
  const [, setNovels] = useRecoilState(novelsAtom);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    loadNovels();
    loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNovels = async () => {
    try {
      const res = await fetch(`${API_BASE}/novelDt`);
      const data = await res.json();
      // if your API wraps the array, adjust accordingly
      // e.g. if res = { data: [...] } then use data.data
      setNovels(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      console.error("Error loading novels:", e);
    }
  };

  const loadTrending = async () => {
    try {
      const res = await fetch(`${API_BASE}/novel/trending`);
      const data = await res.json();
      // trending endpoint returns { msg, data }
      setTrending(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      console.error("Error loading trending:", e);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Carousel />
      <FeaturedSection />
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
        <NovelGrid />
        <TrendingSidebar trending={trending} />
      </div>
      <TopSeries trending={trending} />
      <Footer />
    </div>
  );
};

export default HomePage;
