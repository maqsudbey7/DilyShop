import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
    let { t } = useTranslation();

  useEffect(() => {
    fetch('https://dummyjson.com/comments?limit=5')
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const fakeNewComment = {
      id: comments.length + 1,
      body: newComment,
      user: { username: 'Siz' },
    };

    setComments([fakeNewComment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">💬 {t("CommentsSection")}</h2>

      <div className="flex flex-col gap-4 mb-6">
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          rows={4}
          placeholder={t("Writeacomment")}
          className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow"
        ></textarea>

        <button
          onClick={handleAddComment}
          className="self-end bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-full transition transform hover:scale-105 shadow-md"
        >
          {t("Send")}
        </button>
      </div>

      <div className="space-y-5">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ duration: 0.3 }}
              className="p-5 bg-white border rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-800 text-base">{comment.body}</p>
              <p className="text-sm text-gray-500 mt-2">👤 {comment.user?.username}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentSection;
