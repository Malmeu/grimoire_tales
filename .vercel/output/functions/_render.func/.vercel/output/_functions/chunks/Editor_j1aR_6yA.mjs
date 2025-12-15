import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';

function Editor({ initialContent = "", onSave, placeholder = "Commencez à écrire votre histoire..." }) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const insertMarkdown = useCallback((prefix, suffix = "") => {
    const textarea = document.getElementById("editor-textarea");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  }, [content]);
  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };
  const toolbarButtons = [
    { icon: "B", action: () => insertMarkdown("**", "**"), title: "Gras" },
    { icon: "I", action: () => insertMarkdown("*", "*"), title: "Italique" },
    { icon: "H1", action: () => insertMarkdown("# "), title: "Titre 1" },
    { icon: "H2", action: () => insertMarkdown("## "), title: "Titre 2" },
    { icon: "H3", action: () => insertMarkdown("### "), title: "Titre 3" },
    { icon: "❝", action: () => insertMarkdown("> "), title: "Citation" },
    { icon: "•", action: () => insertMarkdown("- "), title: "Liste" },
    { icon: "1.", action: () => insertMarkdown("1. "), title: "Liste numérotée" },
    { icon: "🔗", action: () => insertMarkdown("[", "](url)"), title: "Lien" },
    { icon: "📷", action: () => insertMarkdown("![alt](", ")"), title: "Image" },
    { icon: "`", action: () => insertMarkdown("`", "`"), title: "Code inline" },
    { icon: "```", action: () => insertMarkdown("```\n", "\n```"), title: "Bloc de code" },
    { icon: "—", action: () => insertMarkdown("\n---\n"), title: "Séparateur" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "parchment-card rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 border-b border-gold-old/20 bg-dark-void/30", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 flex-wrap", children: toolbarButtons.map((btn, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: btn.action,
          title: btn.title,
          className: "px-3 py-1.5 text-sm text-parchment hover:text-gold-old hover:bg-gold-old/10 rounded transition-colors",
          children: btn.icon
        },
        idx
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsPreview(!isPreview),
          className: `px-4 py-1.5 text-sm rounded transition-colors ${isPreview ? "bg-gold-old/20 text-gold-old" : "text-parchment hover:text-gold-old hover:bg-gold-old/10"}`,
          children: isPreview ? "Éditer" : "Aperçu"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-[400px]", children: isPreview ? /* @__PURE__ */ jsx("div", { className: "p-6 markdown-content prose prose-invert max-w-none", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: parseMarkdown(content) } }) }) : /* @__PURE__ */ jsx(
      "textarea",
      {
        id: "editor-textarea",
        value: content,
        onChange: (e) => setContent(e.target.value),
        placeholder,
        className: "w-full h-[400px] p-6 bg-transparent text-parchment-light placeholder-parchment/30 resize-none focus:outline-none font-mono text-sm leading-relaxed"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 border-t border-gold-old/20 bg-dark-void/30", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-parchment/50", children: [
        content.length,
        " caractères • ",
        content.split(/\s+/).filter(Boolean).length,
        " mots"
      ] }),
      onSave && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving,
          className: "glow-button px-6 py-2 text-sm disabled:opacity-50",
          children: isSaving ? "Sauvegarde..." : "Sauvegarder"
        }
      )
    ] })
  ] });
}
function parseMarkdown(text) {
  let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/^### (.+)$/gm, '<h3 class="font-gothic text-xl text-gold-old mt-6 mb-3">$1</h3>').replace(/^## (.+)$/gm, '<h2 class="font-gothic text-2xl text-gold-old mt-8 mb-4">$1</h2>').replace(/^# (.+)$/gm, '<h1 class="font-gothic text-3xl text-gold-old mt-10 mb-5">$1</h1>').replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-parchment-light">$1</strong>').replace(/\*(.+?)\*/g, '<em class="italic">$1</em>').replace(/^> (.+)$/gm, '<blockquote class="border-l-3 border-gold-old pl-4 italic text-parchment/80 my-4">$1</blockquote>').replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>').replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>').replace(/`([^`]+)`/g, '<code class="bg-dark-purple/50 px-1.5 py-0.5 rounded text-gold-old font-mono text-sm">$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-old hover:text-gold-bright underline">$1</a>').replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />').replace(/^---$/gm, '<hr class="border-gold-old/20 my-8" />').replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">').replace(/\n/g, "<br />");
  return `<p class="mb-4 leading-relaxed">${html}</p>`;
}

export { Editor as E };
