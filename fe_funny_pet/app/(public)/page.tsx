"use client";
import {Hero} from "@/components/web/home/Hero";
import {Services} from "@/components/web/home/Services";
import {Doctors} from "@/components/web/home/Doctors";
import { Testimonials } from "@/components/web/home/Testimonials";

function Home(){
    return(
        <div className="min-h-screen ">
            <Hero />
            <Services />
            <Testimonials />
            <Doctors />
        </div>
    )
}
export default Home;