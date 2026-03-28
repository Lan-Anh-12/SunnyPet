const doctors = [
  { name: "BS. Nguyễn Thị Lan", major: "Nội khoa & Ngoại khoa", exp: "8 năm", img: "/doc1.png" },
  { name: "BS. Trần Minh Khoa", major: "Phẫu thuật & Chỉnh hình", exp: "12 năm", img: "/doc2.jpg" },
  { name: "BS. Phạm Hồng Nhung", major: "Da liễu & Dinh dưỡng", exp: "6 năm", img: "/doc3.png" },
];

export function Doctors() {
  return (
    <section className="py-24 bg-gray-50" id="bac-si">
      <div className="container mx-auto px-6 text-center">
        <span className="text-teal-500 text-sm font-bold uppercase tracking-widest">Đội ngũ chuyên gia</span>
        <h2 className="text-4xl font-bold mt-4 mb-16">Bác Sĩ Tận Tâm</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={doc.img} alt={doc.name} className="w-full h-72 object-cover" />
              <div className="p-8 text-left">
                <h3 className="text-xl font-bold">{doc.name}</h3>
                <p className="text-[#E5484D] text-sm font-medium mt-1">{doc.major}</p>
                <p className="text-gray-400 text-sm mt-2">📍 Kinh nghiệm: {doc.exp}</p>
                <button className="w-full mt-6 py-3 rounded-xl border border-[#E5484D] text-[#E5484D] font-bold hover:bg-[#E5484D] hover:text-white transition">
                  Đặt lịch với bác sĩ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}