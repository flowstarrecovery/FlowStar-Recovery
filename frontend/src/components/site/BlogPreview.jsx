import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  axios.get(`${API}/blog/posts`)
    .then((r) => {
      console.log("API Response:", r.data);
      console.log("Is Array?", Array.isArray(r.data));

      if (Array.isArray(r.data)) {
        setPosts(r.data.slice(0, 3));
      } else if (Array.isArray(r.data.posts)) {
        setPosts(r.data.posts.slice(0, 3));
      } else {
        console.error("Unexpected response:", r.data);
        setPosts([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setPosts([]);
    });
}, []);

  return (
    <section data-testid="blog-preview" className="relative py-24 lg:py-32 bg-[#F8FBFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">From the Library</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">
              Education, <em className="font-medium">not a sales pitch</em>.
            </h2>
          </div>
          <Link
            to="/resources"
            data-testid="blog-preview-all"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0C2340] hover:text-[#D4AF37] transition-colors"
          >
            Browse all resources <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              to={`/resources/${p.slug}`}
              data-testid={`blog-card-${p.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#0C2340]">{p.category}</div>
              </div>
              <div className="p-7">
                <div className="text-xs text-[#526477] mb-3">{p.published_at} · {p.read_minutes} min read</div>
                <h3 className="font-serif text-2xl text-[#0C2340] group-hover:text-[#D4AF37] transition-colors mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-[#526477] leading-relaxed line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
