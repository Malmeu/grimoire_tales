import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Comment {
  id: string;
  user: {
    username: string;
    avatar_url?: string;
  };
  content: string;
  likes_count: number;
  created_at: string;
}

interface CommentFeedProps {
  storyId: string;
  chapterId?: string;
}

export default function CommentFeed({ storyId, chapterId }: CommentFeedProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

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
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          likes_count,
          created_at,
          users!comments_user_id_fkey (username, avatar_url)
        `)
        .eq('story_id', storyId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading comments:', error);
        setComments([]);
      } else {
        setComments((data || []).map((c: any) => ({
          id: c.id,
          user: {
            username: c.users?.username || 'Anonyme',
            avatar_url: c.users?.avatar_url
          },
          content: c.content,
          likes_count: c.likes_count || 0,
          created_at: c.created_at
        })));
      }
    } catch (err) {
      console.error('Error:', err);
      setComments([]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      alert('Vous devez être connecté pour commenter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          story_id: storyId,
          chapter_id: chapterId || null,
          user_id: currentUser.id,
          content: newComment.trim()
        })
        .select(`
          id,
          content,
          likes_count,
          created_at,
          users!comments_user_id_fkey (username, avatar_url)
        `)
        .single();
      
      if (error) {
        console.error('Error posting comment:', error);
        alert('Erreur lors de la publication du commentaire.');
      } else if (data) {
        const newCommentObj: Comment = {
          id: data.id,
          user: {
            username: data.users?.username || 'Vous',
            avatar_url: data.users?.avatar_url
          },
          content: data.content,
          likes_count: 0,
          created_at: data.created_at
        };
        setComments([newCommentObj, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error:', err);
    }
    setIsSubmitting(false);
  };

  const handleLike = async (commentId: string) => {
    // Optimistic update
    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, likes_count: c.likes_count + 1 }
        : c
    ));
    
    // Update in database
    await supabase
      .from('comments')
      .update({ likes_count: comments.find(c => c.id === commentId)!.likes_count + 1 })
      .eq('id', commentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `il y a ${minutes}min`;
    if (hours < 24) return `il y a ${hours}h`;
    if (days < 7) return `il y a ${days}j`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <h3 className="font-gothic text-2xl text-gold-old flex items-center gap-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Commentaires ({comments.length})
      </h3>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="parchment-card p-4 rounded-lg">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Partagez votre avis sur cette histoire..."
          className="w-full p-3 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light placeholder-parchment/40 resize-none focus:outline-none focus:border-gold-old/50 transition-colors"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="glow-button px-6 py-2 text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Envoi...' : 'Publier'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="incantation-loader"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="parchment-card p-4 rounded-lg">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-gold-old font-gothic">
                  {comment.user.avatar_url ? (
                    <img 
                      src={comment.user.avatar_url} 
                      alt={comment.user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    comment.user.username.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-parchment-light">{comment.user.username}</span>
                    <span className="text-xs text-parchment/50">{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="text-parchment/80 text-sm leading-relaxed">{comment.content}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-sm text-parchment/50 hover:text-gold-old transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {comment.likes_count}
                    </button>
                    <button className="text-sm text-parchment/50 hover:text-gold-old transition-colors">
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
