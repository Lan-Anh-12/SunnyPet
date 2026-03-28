"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    content: "Sunny Pet là phòng khám tôi tin tưởng nhất. Bác sĩ Lan rất nhẹ nhàng, tận tình giải thích từng vấn đề sức khỏe của Milo. Không gian sạch sẽ, nhân viên thân thiện. Tôi đã đưa Milo tới đây hơn 2 năm và chưa bao giờ thất vọng!",
    author: "Chị Nguyễn Minh Tâm",
    role: "Chủ nhân của Milo",
    image: "/comment1.png", 
  },
  {
    id: 2,
    content: "Dịch vụ Spa ở đây rất tuyệt vời. Bé mèo nhà mình thường rất sợ nước nhưng các bạn nhân viên ở đây có kỹ thuật rất tốt, bé về nhà rất thơm tho và thoải mái. Rất đáng đồng tiền bát gạo!",
    author: "Anh Trần Hoàng Nam",
    role: "Chủ nhân của Lu",
    image: "/comment2.png",
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="danh-gia" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* CỘT TRÁI: ẢNH (Có bo góc lớn như mẫu) */}
          <div className="w-full md:w-1/2">
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square  w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100"
            >
              <Image
                src={reviews[index].image}
                alt="Client feedback"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </motion.div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG ĐÁNH GIÁ */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-2">
              <span className="text-gray-400 text-sm font-medium">Khách hàng nói gì về chúng tôi</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Hơn <span className="text-[#E5484D]">2,500 gia đình</span> <br /> tin tưởng chúng tôi
              </h2>
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="size-5" />
              ))}
            </div>

            {/* Nội dung Review với Animation */}
            <div >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl text-gray-600 italic leading-relaxed font-light">
                    "{reviews[index].content}"
                  </p>
                  <div className="mt-8">
                    <h4 className="text-lg font-bold text-gray-900">{reviews[index].author}</h4>
                    <p className="text-gray-500 text-sm">{reviews[index].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nút điều hướng (Giống mẫu hình tròn đen-trắng) */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={prevReview}
                className="p-4 rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white transition-all group"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button 
                onClick={nextReview}
                className="p-4 rounded-full bg-gray-900 text-white hover:bg-[#E5484D] transition-all shadow-lg"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}