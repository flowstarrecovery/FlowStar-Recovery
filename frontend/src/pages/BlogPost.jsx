import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setPost(null);
    setNotFound(false);
    axios
      .get(`${API}/blog/posts/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="pt-40 pb-32 text-center" data-testid="blog-post-not-found">
        <h1 className="font-serif text-4xl text-[#0C2340]">Article not found.</h1>
        <Link to="/resources" className="mt-6 inline-flex items-center gap-2 text-[#D4AF37]">
          <ArrowLeft size={16} /> Back to all resources
        </Link>
      </div>
    );
  }

  if (!post) {
    return <div className="pt-40 pb-32 text-center text-[#526477]" data-testid="blog-post-loading">Loading…</div>;
  }

  return (
    <article data-testid="blog-post-page" className="bg-[#F8FBFC] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-[#526477] hover:text-[#0C2340] mb-10">
          <ArrowLeft size={14} /> All resources
        </Link>
        <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-4">{post.category}</div>
        <h1 className="font-serif text-4xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">{post.title}</h1>
        <div className="mt-6 text-sm text-[#526477]">{post.author} · {post.published_at} · {post.read_minutes} min read</div>

        <img src={post.cover_image} alt={post.title} className="mt-10 rounded-2xl w-full h-[420px] object-cover shadow-xl" />

        <div className="mt-12 space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-[#0C2340] text-lg leading-[1.85] font-serif">{para}</p>
          ))}
        </div>

        <div className="mt-16 p-8 bg-[#0C2340] rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-2">Free Eligibility Check</div>
            <h3 className="font-serif text-2xl">Think this might apply to you?</h3>
          </div>
          <Link
            to="/#checker"
            data-testid="blog-post-cta"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold"
          >
            Check Eligibility <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
