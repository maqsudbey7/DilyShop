import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid loggedUser in localStorage:", err);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
        <p className="text-lg font-medium text-gray-600 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full transition hover:shadow-xl duration-300">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Your Profile</h2>
        <div className="flex items-center gap-6">
          {/* Avatar */}
          {user.image ? (
            <img
              src={user.image}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-2xl font-semibold text-white shadow-md">
              {user.firstName?.[0] || ''}{user.lastName?.[0] || ''}
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <div className="text-xl font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500 mt-1">📞 {user.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
