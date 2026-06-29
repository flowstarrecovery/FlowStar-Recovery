import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  axios
    .get(`${API}/blog/posts`)
    .then((r) => {
      console.log("Blog API response:", r.data);
      console.log("Is array?", Array.isArray(r.data));

      if (Array.isArray(r.data)) {
        setPosts(r.data);
      } else if (Array.isArray(r.data.posts)) {
        setPosts(r.data.posts);
      } else if (Array.isArray(r.data.data)) {
        setPosts(r.data.data);
      } else {
        console.error("Unexpected response:", r.data);
        setPosts([]);
      }
    })
    .catch((err) => {
      console.error("API error:", err);
      setPosts([]);
    });
}, []);

  return (
    <div data-testid="blog-index-page" className="bg-[#F8FBFC] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">Resources & Library</div>
          <h1 className="font-serif text-5xl lg:text-7xl text-[#0C2340] font-light leading-[1.02]">
            Learn the rules <em className="font-medium">before</em> you claim.
          </h1>
          <p className="mt-6 text-lg text-[#526477] leading-relaxed">
            Plain-English guides on surplus funds, foreclosure overages, tax sale claims, and the recovery
            process — written by our research desk for former owners and heirs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to={`/resources/${p.slug}`}
              data-testid={`blog-index-card-${p.slug}`}
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
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0C2340]">
                  Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
