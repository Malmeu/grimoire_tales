import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ooevpxkcftpemofjantd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXZweGtjZnRwZW1vZmphbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Njg3ODYsImV4cCI6MjA4MTM0NDc4Nn0.rbUanSpOKtwqcSs71eCLw_K2ywpuWSfG9Ae88hBmu6M";
const supabase = createClient(supabaseUrl, supabaseKey);
function CommentFeed({ storyId, chapterId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    checkUser();
    loadComments();
  }, [storyId, chapterId]);
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };
  const loadComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("comments").select(`
          id,
          content,
          likes_count,
          created_at,
          users!comments_user_id_fkey (username, avatar_url)
        `).eq("story_id", storyId).order("created_at", { ascending: false });
      if (error) {
        console.error("Error loading comments:", error);
        setComments([]);
      } else {
        setComments((data || []).map((c) => ({
          id: c.id,
          user: {
            username: c.users?.username || "Anonyme",
            avatar_url: c.users?.avatar_url
          },
          content: c.content,
          likes_count: c.likes_count || 0,
          created_at: c.created_at
        })));
      }
    } catch (err) {
      console.error("Error:", err);
      setComments([]);
    }
    setIsLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!currentUser) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("comments").insert({
        story_id: storyId,
        chapter_id: chapterId || null,
        user_id: currentUser.id,
        content: newComment.trim()
      }).select(`
          id,
          content,
          likes_count,
          created_at,
          users!comments_user_id_fkey (username, avatar_url)
        `).single();
      if (error) {
        console.error("Error posting comment:", error);
        alert("Erreur lors de la publication du commentaire.");
      } else if (data) {
        const newCommentObj = {
          id: data.id,
          user: {
            username: data.users?.username || "Vous",
            avatar_url: data.users?.avatar_url
          },
          content: data.content,
          likes_count: 0,
          created_at: data.created_at
        };
        setComments([newCommentObj, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setIsSubmitting(false);
  };
  const handleLike = async (commentId) => {
    setComments(comments.map(
      (c) => c.id === commentId ? { ...c, likes_count: c.likes_count + 1 } : c
    ));
    await supabase.from("comments").update({ likes_count: comments.find((c) => c.id === commentId).likes_count + 1 }).eq("id", commentId);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    const days = Math.floor(diff / 864e5);
    if (minutes < 60) return `il y a ${minutes}min`;
    if (hours < 24) return `il y a ${hours}h`;
    if (days < 7) return `il y a ${days}j`;
    return date.toLocaleDateString("fr-FR");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("h3", { className: "font-gothic text-2xl text-gold-old flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
      "Commentaires (",
      comments.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "parchment-card p-4 rounded-lg", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: newComment,
          onChange: (e) => setNewComment(e.target.value),
          placeholder: "Partagez votre avis sur cette histoire...",
          className: "w-full p-3 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light placeholder-parchment/40 resize-none focus:outline-none focus:border-gold-old/50 transition-colors",
          rows: 3
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting || !newComment.trim(),
          className: "glow-button px-6 py-2 text-sm disabled:opacity-50",
          children: isSubmitting ? "Envoi..." : "Publier"
        }
      ) })
    ] }),
    isLoading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsx("div", { className: "incantation-loader" }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: comments.map((comment) => /* @__PURE__ */ jsx("div", { className: "parchment-card p-4 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-gold-old font-gothic", children: comment.user.avatar_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: comment.user.avatar_url,
          alt: comment.user.username,
          className: "w-full h-full rounded-full object-cover"
        }
      ) : comment.user.username.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-parchment-light", children: comment.user.username }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-parchment/50", children: formatDate(comment.created_at) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-parchment/80 text-sm leading-relaxed", children: comment.content }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleLike(comment.id),
              className: "flex items-center gap-1 text-sm text-parchment/50 hover:text-gold-old transition-colors",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }),
                comment.likes_count
              ]
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "text-sm text-parchment/50 hover:text-gold-old transition-colors", children: "Répondre" })
        ] })
      ] })
    ] }) }, comment.id)) })
  ] });
}

export { CommentFeed as C };
